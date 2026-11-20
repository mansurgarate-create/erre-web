-- Undo the unassigned batch. Does not drop entry_codes.
-- Assigned p01–p10 are left. Remaining null cafe_id rows must be gone
-- before NOT NULL can be restored.

delete from public.entry_codes
where code in (
  'p01', 'p02', 'p03', 'p04', 'p05',
  'p06', 'p07', 'p08', 'p09', 'p10'
)
and cafe_id is null;

alter table public.entry_codes
  alter column cafe_id set not null;
