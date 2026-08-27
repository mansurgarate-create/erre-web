export function rpcMessage(error: { message?: string } | null | undefined): string {
  const raw = error?.message ?? ''
  if (raw.includes('No cups to return')) return 'No tienes vasos para devolver.'
  if (raw.includes('Cafe not found')) return 'No encontramos esta cafetería.'
  if (raw.includes('Not authenticated')) return 'Inicia sesión para registrar.'
  if (raw.includes('Google identity')) return 'Entra con Google para continuar.'
  if (raw.includes('Failed to fetch') || raw.includes('NetworkError')) {
    return 'Sin conexión. Revisa tu internet e intenta de nuevo.'
  }
  return 'No se pudo completar. Intenta de nuevo.'
}
