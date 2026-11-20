-- Cafe Instagram handles on the rent page.
-- Paste once in Supabase SQL Editor.
-- Revert: alter table public.cafes drop column if exists instagram;

alter table public.cafes
  add column if not exists instagram text;

update public.cafes set instagram = 'belumcoffee' where nfc_tag_id = 'erre:belum';
update public.cafes set instagram = 'mala.kaffe' where nfc_tag_id = 'erre:mala-kaffe';
update public.cafes set instagram = 'fiatoycafeto' where nfc_tag_id = 'erre:fiato-cafeto';
