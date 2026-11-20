-- Allow printed codes without a cafe yet, and seed 10 spare stickers.
-- Run AFTER 2026-08-29_entry-codes.sql
-- Revert: 2026-08-27_entry-codes-unassigned-revert.sql
--
-- Assign a sticker later: see 2026-08-29_assign-entry-code.sql (p01 → p10, no new slugs).

alter table public.entry_codes
  alter column cafe_id drop not null;

insert into public.entry_codes (code, cafe_id)
select 'p' || lpad(n::text, 2, '0'), null
from generate_series(1, 10) as n
on conflict (code) do nothing;
