-- Public feedback about a punto erre. View rows in Table Editor (service role).
-- Paste once in Supabase SQL Editor.
-- Revert: drop table if exists public.cafe_feedback;

create table if not exists public.cafe_feedback (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null references public.cafes(id),
  cafe_name text not null,
  topic text not null,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists idx_cafe_feedback_cafe on public.cafe_feedback(cafe_id);
create index if not exists idx_cafe_feedback_created on public.cafe_feedback(created_at desc);

alter table public.cafe_feedback enable row level security;

drop policy if exists "Anyone can submit cafe feedback" on public.cafe_feedback;
create policy "Anyone can submit cafe feedback"
  on public.cafe_feedback
  for insert
  to anon, authenticated
  with check (true);

revoke all on public.cafe_feedback from anon, authenticated;
grant insert on public.cafe_feedback to anon, authenticated;
