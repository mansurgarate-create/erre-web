-- erre — Add Mood Coffee Localital + Mood Coffee Nuevo Sur Pico Norte
-- Run in Supabase SQL Editor (once)

-- Mood Coffee Localital
insert into public.cafes (name, city, address, lat, lng, maps_url, hours, nfc_tag_id, cups_available, instagram)
values (
  'Mood Coffee Localital',
  'San Pedro',
  'Av. José Vasconcelos 404, Localital, San Pedro Garza García, N.L.',
  25.661372,
  -100.400773,
  'https://maps.app.goo.gl/pBgC1V7cYfPVbVPZA',
  'Lun–Dom 8:00–21:00',
  'erre:mood-localital',
  0,
  'moodcoffeemx'
);

-- Mood Coffee Nuevo Sur Pico Norte
insert into public.cafes (name, city, address, lat, lng, maps_url, hours, nfc_tag_id, cups_available, instagram)
values (
  'Mood Coffee Nuevo Sur Pico Norte',
  'Monterrey',
  'Av. Revolución 2703, Pico Norte, Nuevo Sur, Monterrey, N.L.',
  25.652958,
  -100.274724,
  'https://maps.app.goo.gl/ciF9CokVcR3RMwgt9',
  'Lun–Vie 7:30–20:00 · Sáb–Dom 10:30–19:30',
  'erre:mood-nuevo-sur',
  0,
  'moodcoffeemx'
);

insert into public.entry_codes (code, cafe_id)
select replace(nfc_tag_id, 'erre:', ''), id
from public.cafes
where nfc_tag_id in ('erre:mood-localital', 'erre:mood-nuevo-sur')
on conflict (code) do update set cafe_id = excluded.cafe_id;
