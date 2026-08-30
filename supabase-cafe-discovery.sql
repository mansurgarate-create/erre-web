-- Discovery fields on cafes: logo, banner, menu, recommended drinks/food.
-- Run once in Supabase SQL Editor.
-- Revert:
--   alter table public.cafes
--     drop column if exists logo_url,
--     drop column if exists banner_url,
--     drop column if exists menu_url,
--     drop column if exists recommended_items;
--
-- Images: create a public Storage bucket named cafe-media.
-- Paths: {slug}/logo.webp, {slug}/banner.webp
-- Then set logo_url / banner_url to the public object URLs.

alter table public.cafes
  add column if not exists logo_url text,
  add column if not exists banner_url text,
  add column if not exists menu_url text,
  add column if not exists recommended_items jsonb;

comment on column public.cafes.recommended_items is
  'Optional. { drinks: [{nombre, descripcion, imagen_url}], food: [...] }';

update public.cafes
set recommended_items = '{
  "drinks": [
    {"nombre": "Bee Tonic", "descripcion": "Miel de azahar, jugo de limón, agua tónica y cold brew.", "imagen_url": null},
    {"nombre": "Danish Latte", "descripcion": "Jarabe de frambuesa natural, leche, espresso y foam de queso crema con vainilla.", "imagen_url": null},
    {"nombre": "Matcha Tonic", "descripcion": "Jarabe de piña natural, agua tónica y matcha ceremonial.", "imagen_url": null}
  ],
  "food": []
}'::jsonb
where nfc_tag_id = 'erre:fiato-cafeto'
  and recommended_items is null;

update public.cafes
set recommended_items = '{
  "drinks": [
    {"nombre": "Latte de Caramelo", "descripcion": "Espresso con leche cremada y un toque de caramelo, suave y cremoso.", "imagen_url": null},
    {"nombre": "Matcha Coco Latte", "descripcion": "Matcha con coco y leche cremada, una combinación suave y fresca.", "imagen_url": null},
    {"nombre": "Frappe Nutella", "descripcion": "Frappe cremoso de Nutella, acompañado de crema batida y una galleta de Nutella.", "imagen_url": null}
  ],
  "food": []
}'::jsonb
where nfc_tag_id = 'erre:belum'
  and recommended_items is null;
