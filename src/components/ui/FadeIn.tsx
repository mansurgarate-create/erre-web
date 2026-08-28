import { useEffect, useRef, type ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  appear?: boolean
  opacity?: boolean
}

export default function FadeIn({
  children,
  className = '',
  delay = 0,
  appear = false,
  opacity = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (appear) {
      const id = window.setTimeout(() => el.classList.add('visible'), delay)
      return () => window.clearTimeout(id)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, appear])

  return (
    <div ref={ref} className={`fade-in${opacity ? ' fade-in-opacity' : ''} ${className}`}>
      {children}
    </div>
  )
}
