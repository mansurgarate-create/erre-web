import FadeIn from './ui/FadeIn'

export default function About() {
  return (
    <section id="nosotros" className="px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-black mb-12 md:mb-16">
            Sobre erre
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <blockquote className="font-heading text-xl md:text-2xl text-black/80 leading-relaxed">
            <p className="mb-6">
              erre existe porque la sustentabilidad debería ser algo sin esfuerzo.
            </p>
            <p className="mb-6">
              Cada vaso reutilizable representa un pequeño acto de responsabilidad colectiva.
            </p>
            <p>
              Juntos, cafeterías y personas podemos crear una cultura donde reutilizar sea lo normal.
            </p>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  )
}
