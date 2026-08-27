# Cómo probar y cómo volver atrás

**No hagas `git push`.** holaerre.com sigue en `main` (commit `d62d215`) hasta que tú decidas.

## Probar en local

1. En Supabase → Authentication → Providers → **Google**: actívalo con el mismo Client ID / secret web que ya usas.
2. En Authentication → URL Configuration, agrega:
   - `http://localhost:5173/auth/callback`
   - (cuando publiques, también `https://holaerre.com/auth/callback`)
3. SQL Editor: pega **todo** [`supabase-web-auth.sql`](supabase-web-auth.sql) y corre.
4. En esta carpeta: `npm run dev` → abre `http://localhost:5173`.

Ramas:

- `web-login-rentals` — este cambio (login, rentar, elegir café).
- `backup/web-pre-rentals` y `main` — el sitio que está en producción hoy.

## Si algo sale mal (frontend)

Sin pushear, el sitio público no cambió. Para dejar el código local como ahora:

```bash
git checkout main
```

Si ya mezclaste o commiteaste en `main` por error:

```bash
git checkout backup/web-pre-rentals
```

o:

```bash
git reset --hard backup/web-pre-rentals
```

(`reset --hard` tira cambios sin commitear en esa rama.)

## Si corriste el SQL y quieres revertirlo

Pega [`supabase-web-auth-revert.sql`](supabase-web-auth-revert.sql) en el SQL Editor. iOS y Android siguen igual: no toca `rent_cup` / `return_cup`.
