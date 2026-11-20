-- Assign the next spare QR (p01–p10) to a cafe already in public.cafes.
-- Do not insert a new entry_codes row with a slug.
-- Check holaerre.com/qr or cafe_id is null for the next free code (p01 → p10).
-- When p01–p10 are all assigned, generate a new batch (p11…). Do not do that here.

update public.entry_codes
set cafe_id = (select id from public.cafes where nfc_tag_id = 'erre:NUEVA')
where code = 'p0X'
  and cafe_id is null;
