-- Revert web login RPCs. Safe to run even if the frontend already went back to
-- backup/web-pre-rentals or main. Does not touch iOS/Android rent_cup / return_cup.

drop function if exists public.rent_cup_for_me(uuid);
drop function if exists public.return_cup_for_me(uuid);
drop function if exists public.my_web_account();
drop function if exists public.ensure_web_user();
