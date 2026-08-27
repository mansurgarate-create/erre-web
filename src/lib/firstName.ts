export function firstName(name: string | null | undefined, email: string | null | undefined) {
  const word = name?.trim().split(/\s+/)[0]
  if (word) return word
  const local = email?.split('@')[0]
  if (local) return local
  return 'Cuenta'
}
