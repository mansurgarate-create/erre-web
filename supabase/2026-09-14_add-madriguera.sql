-- erre — Add Madriguera
-- Run in Supabase SQL Editor (once)
-- Do not insert an entry_codes row with slug madriguera. Assign spare p02.

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
  'Madriguera',
  'Monterrey',
  'Antiguo camino a Villa de Santiago, Plaza Villa, Almendros 100-L-14B, Laderas, Monterrey, N.L.',
  25.550971,
  -100.224505,
  'https://maps.app.goo.gl/b39eP2n3qF6CaqcP6',
  'Lun–Vie 7:00–20:30 · Sáb–Dom 10:00–18:00',
  'erre:madriguera',
  0,
  'madriguera.panycafe',
  'https://xqhveefwucsiuqppnrrw.supabase.co/storage/v1/object/public/cafe-media/madriguera:logo.webp'
);

update public.entry_codes
set cafe_id = (select id from public.cafes where nfc_tag_id = 'erre:madriguera')
where code = 'p02'
  and cafe_id is null;
