-- Toggle whether a cafe appears on the map / search.
-- Scan and NFC landing keep working if this is false.
-- Paste once in Supabase SQL Editor.
-- Revert: alter table public.cafes drop column if exists visible_on_map;
-- Hide: update public.cafes set visible_on_map = false where nfc_tag_id = 'erre:SLUG';

alter table public.cafes
  add column if not exists visible_on_map boolean not null default true;
