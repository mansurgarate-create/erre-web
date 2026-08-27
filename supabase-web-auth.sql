-- erre web login + rentals
-- Paste once in Supabase SQL Editor. Does not change rent_cup / return_cup (iOS / Android).
-- Revert: run supabase-web-auth-revert.sql

create or replace function public.ensure_web_user()
returns json
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_google_id text;
  v_name text;
  v_email text;
  v_user public.users;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select
    coalesce(nullif(i.provider_id, ''), i.identity_data->>'sub'),
    coalesce(i.identity_data->>'name', i.identity_data->>'full_name'),
    coalesce(i.identity_data->>'email', auth.jwt()->>'email')
  into v_google_id, v_name, v_email
  from auth.identities i
  where i.user_id = auth.uid()
    and i.provider = 'google'
  limit 1;

  if v_google_id is null then
    raise exception 'Google identity not found';
  end if;

  insert into public.users (google_id, name, email)
  values (v_google_id, nullif(v_name, ''), nullif(v_email, ''))
  on conflict on constraint users_google_id_unique do update
    set
      name = coalesce(nullif(excluded.name, ''), users.name),
      email = coalesce(nullif(excluded.email, ''), users.email)
  returning * into v_user;

  return json_build_object(
    'id', v_user.id,
    'google_id', v_user.google_id,
    'name', v_user.name,
    'email', v_user.email,
    'cups_in_hand', v_user.cups_in_hand
  );
end;
$$;

create or replace function public.rent_cup_for_me(p_cafe_id uuid)
returns json
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user_id uuid;
  v_profile json;
begin
  v_profile := public.ensure_web_user();
  v_user_id := (v_profile->>'id')::uuid;
  return public.rent_cup(v_user_id, p_cafe_id);
end;
$$;

create or replace function public.return_cup_for_me(p_cafe_id uuid)
returns json
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user_id uuid;
  v_profile json;
begin
  v_profile := public.ensure_web_user();
  v_user_id := (v_profile->>'id')::uuid;
  return public.return_cup(v_user_id, p_cafe_id);
end;
$$;

create or replace function public.my_web_account()
returns json
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_profile json;
  v_user_id uuid;
  v_history json;
begin
  v_profile := public.ensure_web_user();
  v_user_id := (v_profile->>'id')::uuid;

  select coalesce(json_agg(row_to_json(x)), '[]'::json)
  into v_history
  from (
    select
      t.id,
      t.type,
      t.created_at,
      c.name as cafe_name
    from public.transactions t
    join public.cafes c on c.id = t.cafe_id
    where t.user_id = v_user_id
    order by t.created_at desc
    limit 30
  ) x;

  return json_build_object(
    'user', v_profile,
    'transactions', v_history
  );
end;
$$;

revoke all on function public.ensure_web_user() from public, anon;
revoke all on function public.rent_cup_for_me(uuid) from public, anon;
revoke all on function public.return_cup_for_me(uuid) from public, anon;
revoke all on function public.my_web_account() from public, anon;

grant execute on function public.ensure_web_user() to authenticated;
grant execute on function public.rent_cup_for_me(uuid) to authenticated;
grant execute on function public.return_cup_for_me(uuid) to authenticated;
grant execute on function public.my_web_account() to authenticated;
