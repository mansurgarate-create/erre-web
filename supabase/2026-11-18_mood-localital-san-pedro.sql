-- Mood Coffee Localital está en San Pedro Garza García, no en Monterrey.
-- Con esto el mapa de la landing muestra los filtros por zona (todos · Monterrey · San Pedro).
update public.cafes
set city = 'San Pedro'
where name ilike 'Mood Coffee%Localital%';

-- Verificación: debe regresar 1 fila con city = San Pedro
select name, city from public.cafes where name ilike 'Mood Coffee%';
