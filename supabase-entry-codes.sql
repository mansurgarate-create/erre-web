-- Printed NFC/QR codes → current cafe.
-- Paste once in Supabase SQL Editor. Does not change nfc_tag_id on cafes (iOS / Android).
-- Revert: run supabase-entry-codes-revert.sql
--
-- Remap a sticker without reprinting:
--   update public.entry_codes
--   set cafe_id = (select id from public.cafes where nfc_tag_id = 'erre:belum')
--   where code = 'fiato-cafeto';
--
-- New cafe: insert into cafes, then assign the next empty p01–p10 code.
-- Do not insert a new slug into entry_codes. See supabase-assign-entry-code.sql.

create table if not exists public.entry_codes (
  code text primary key,
  cafe_id uuid not null references public.cafes(id),
  created_at timestamptz default now()
);

create index if not exists idx_entry_codes_cafe on public.entry_codes(cafe_id);

alter table public.entry_codes enable row level security;

drop policy if exists "Entry codes are public" on public.entry_codes;
create policy "Entry codes are public" on public.entry_codes
  for select using (true);

grant select on public.entry_codes to anon, authenticated;

insert into public.entry_codes (code, cafe_id)
select replace(nfc_tag_id, 'erre:', ''), id
from public.cafes
where nfc_tag_id like 'erre:%'
on conflict (code) do nothing;
