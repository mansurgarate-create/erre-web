-- erre — Add Fika Coffee Roaster House
-- Run in Supabase SQL Editor (once)
-- Do not insert an entry_codes row with slug fika. Assign spare p01.

insert into public.cafes (
  name,
  city,
  address,
  lat,
  lng,
  maps_url,
  hours,
  nfc_tag_id,
  cups_available,
  instagram,
  logo_url
)
values (
  'Fika Coffee Roaster House',
  'Monterrey',
  'Cam. al Diente 123, Lagos del Vergel, Monterrey, N.L.',
  25.587402,
  -100.275094,
  'https://maps.app.goo.gl/tLfUur4dDYXhiLaP9',
  'Lun–Vie 7:00–20:00 · Sáb 8:00–20:00 · Dom 8:00–15:00',
  'erre:fika',
  0,
  'fikacoffeeroasterhouse',
  'https://xqhveefwucsiuqppnrrw.supabase.co/storage/v1/object/public/cafe-media/fika:logo.webp'
);

update public.entry_codes
set cafe_id = (select id from public.cafes where nfc_tag_id = 'erre:fika')
where code = 'p01'
  and cafe_id is null;
