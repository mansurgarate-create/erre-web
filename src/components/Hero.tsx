import FadeIn from './ui/FadeIn'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <FadeIn>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium text-black leading-[1.05] tracking-tight max-w-4xl">
          el mismo vaso,
          <br />
          otro café.
        </h1>
      </FadeIn>

      <FadeIn delay={200}>
        <p className="mt-6 md:mt-8 text-muted text-base md:text-lg max-w-lg leading-relaxed">
          Una red de vasos reutilizables que conecta cafeterías y personas en Monterrey.
        </p>
      </FadeIn>

      <FadeIn delay={400}>
        <a href="#cafeterias" className="erre-btn mt-10 md:mt-12">
          Ver la red erre
        </a>
      </FadeIn>
    </section>
  )
}
