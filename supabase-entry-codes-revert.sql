-- Revert entry_codes. Safe if the table was never created.
-- Does not touch cafes, NFC tags, or iOS/Android RPCs.

drop policy if exists "Entry codes are public" on public.entry_codes;
drop table if exists public.entry_codes;
