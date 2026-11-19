const IG_PATH =
  'M7,2h10a5,5 0,0 1,5 5v10a5,5 0,0 1,-5 5H7a5,5 0,0 1,-5 -5V7a5,5 0,0 1,5 -5zM7,4a3,3 0,0 0,-3 3v10a3,3 0,0 0,3 3h10a3,3 0,0 0,3 -3V7a3,3 0,0 0,-3 -3H7zM12,7a5,5 0,1 1,0 10a5,5 0,0 1,0 -10zM12,9a3,3 0,1 0,0 6a3,3 0,0 0,0 -6zM17.5,6a1,1 0,1 1,0 2a1,1 0,0 1,0 -2z'

export function InstagramGlyph({ className = 'w-3.5 h-3.5 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={IG_PATH} />
    </svg>
  )
}

export default function InstagramHandle({
  handle,
  className = '',
}: {
  handle: string
  className?: string
}) {
  const user = handle.replace(/^@/, '').trim()
  if (!user) return null
  return (
    <a
      href={`https://instagram.com/${user}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 py-1 text-[15px] text-black no-underline underline-offset-4 hover:underline ${className}`}
    >
      <InstagramGlyph />
      @{user}
    </a>
  )
}
