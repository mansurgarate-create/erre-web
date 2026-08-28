export function rpcMessage(error: { message?: string } | null | undefined): string {
  const raw = error?.message ?? ''
  if (raw.includes('Failed to fetch') || raw.includes('NetworkError')) {
    return 'Sin conexión. Revisa tu internet e intenta de nuevo.'
  }
  return 'No se pudo completar. Intenta de nuevo.'
}
