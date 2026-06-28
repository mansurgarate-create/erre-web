import FadeIn from './ui/FadeIn'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <FadeIn>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium text-black leading-[1.05] tracking-tight max-w-4xl">
          El mismo vaso,
          <br />
          otro café.
        </h1>
      </FadeIn>

      <FadeIn delay={200}>
        <p className="mt-6 md:mt-8 text-muted text-base md:text-lg max-w-lg leading-relaxed">
          Una red de vasos reutilizables que conecta cafeterías y personas en todo México.
        </p>
      </FadeIn>

      <FadeIn delay={400}>
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
          <a
            href="#cafeterias"
            className="inline-block px-8 py-3.5 bg-black text-white text-sm font-medium tracking-wide no-underline hover:bg-black/85 transition-colors duration-300"
          >
            Encuentra un café
          </a>
          <a
            href="#como-funciona"
            className="inline-block px-8 py-3.5 border border-black text-black text-sm font-medium tracking-wide no-underline hover:bg-black hover:text-white transition-colors duration-300"
          >
            Cómo funciona
          </a>
        </div>
      </FadeIn>
    </section>
  )
}
