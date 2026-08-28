-- Unify Google + Apple into one public.users row when the email matches.
-- Paste once in Supabase SQL Editor.
--
-- You also need, once, in dashboards (buttons do nothing until these exist):
-- 1) Supabase → Authentication → Providers → Apple: enable, paste Services ID,
--    Team ID, Key ID, .p8. Redirect: https://<project>.supabase.co/auth/v1/callback
--    Additional Redirect URLs: https://holaerre.com/auth/callback
--    and erre://auth-callback (Android Custom Tab).
-- 2) Apple Developer → Identifiers → Services ID for Sign in with Apple (web + Android).
-- 3) Google Cloud → OAuth client type iOS, bundle com.holaerre.erre → Info.plist GIDClientID.
--
-- Revert: restore ensure_web_user from supabase-web-auth.sql and
--         drop function public.link_or_create_user(text, text, text, text);

create or replace function public.link_or_create_user(
  p_provider text,
  p_provider_id text,
  p_name text default null,
  p_email text default null
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user public.users;
  v_email text;
  v_name text;
begin
  if p_provider not in ('google', 'apple') then
    raise exception 'Invalid provider';
  end if;
  if p_provider_id is null or length(trim(p_provider_id)) = 0 then
    raise exception 'Missing provider id';
  end if;

  v_email := nullif(lower(trim(p_email)), '');
  v_name := nullif(trim(p_name), '');

  if p_provider = 'google' then
    select * into v_user from public.users where google_id = p_provider_id;
  else
    select * into v_user from public.users where apple_id = p_provider_id;
  end if;

  if v_user.id is null and v_email is not null then
    select * into v_user
    from public.users
    where email is not null and lower(email) = v_email
    order by created_at asc
    limit 1;
  end if;

  if v_user.id is not null then
    if p_provider = 'google' and v_user.google_id is null then
      update public.users set google_id = p_provider_id where id = v_user.id;
    elsif p_provider = 'apple' and v_user.apple_id is null then
      update public.users set apple_id = p_provider_id where id = v_user.id;
    end if;

    update public.users
    set
      name = coalesce(v_name, name),
      email = coalesce(v_email, email)
    where id = v_user.id
    returning * into v_user;
  else
    if p_provider = 'google' then
      insert into public.users (google_id, name, email)
      values (p_provider_id, v_name, v_email)
      returning * into v_user;
    else
      insert into public.users (apple_id, name, email)
      values (p_provider_id, v_name, v_email)
      returning * into v_user;
    end if;
  end if;

  return json_build_object(
    'id', v_user.id,
    'google_id', v_user.google_id,
    'apple_id', v_user.apple_id,
    'name', v_user.name,
    'email', v_user.email,
    'cups_in_hand', v_user.cups_in_hand,
    'created_at', v_user.created_at
  );
end;
$$;

grant execute on function public.link_or_create_user(text, text, text, text) to anon, authenticated;

create or replace function public.upsert_google_user(
  p_google_id text,
  p_name text default null,
  p_email text default null
)
returns json
language plpgsql
security definer
set search_path = public
as $$
begin
  return public.link_or_create_user('google', p_google_id, p_name, p_email);
end;
$$;

create or replace function public.ensure_web_user()
returns json
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_ident record;
  v_user json;
  v_found boolean := false;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  for v_ident in
    select
      i.provider,
      coalesce(nullif(i.provider_id, ''), i.identity_data->>'sub') as provider_id,
      coalesce(i.identity_data->>'name', i.identity_data->>'full_name') as name,
      coalesce(i.identity_data->>'email', auth.jwt()->>'email') as email
    from auth.identities i
    where i.user_id = auth.uid()
      and i.provider in ('google', 'apple')
  loop
    if v_ident.provider_id is null then
      continue;
    end if;
    v_found := true;
    v_user := public.link_or_create_user(
      v_ident.provider,
      v_ident.provider_id,
      v_ident.name,
      v_ident.email
    );
  end loop;

  if not v_found or v_user is null then
    raise exception 'Google or Apple identity not found';
  end if;

  return v_user;
end;
$$;
