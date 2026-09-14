export function slugFromNfcTag(nfcTagId: string | null | undefined): string | null {
  if (!nfcTagId?.startsWith('erre:')) return null
  const slug = nfcTagId.slice('erre:'.length).trim()
  return slug || null
}
