import FadeIn from './ui/FadeIn'

export default function Hero() {
  return (
    <section className="px-4 sm:px-6 pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
        <div className="flex-1 min-w-0 flex flex-col gap-7">
          <FadeIn>
            <h1 className="font-heading text-[44px] sm:text-6xl lg:text-[88px] font-medium text-black leading-[1.02] tracking-[-0.03em]">
              ¿para llevar? pídelo en vaso erre.
            </h1>
          </FadeIn>

          <FadeIn delay={150}>
            <p className="text-lg md:text-xl leading-relaxed text-black max-w-[30ch]">
              un vaso reutilizable que viaja entre cafés de Monterrey.
            </p>
          </FadeIn>

          <FadeIn delay={250}>
            <div className="flex items-baseline gap-5 py-5 border-t border-black border-b border-b-border max-w-md">
              <span className="font-heading text-[44px] font-medium tracking-tight leading-none">$30</span>
              <span className="text-base leading-snug">
                de depósito.
                <br />
                te lo regresamos completo.
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={350}>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
              <a href="#cafeterias" className="erre-cta">encuentra un café erre</a>
              <a href="#para-cafes" className="erre-cta-outline">tengo un café</a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={200} className="flex-1 min-w-0">
          <figure className="m-0 flex flex-col gap-3">
            <img
              src="/images/landing/hero-vaso.webp"
              alt="Bebida fría en un vaso erre esmerilado sobre la barra de Fiato y Cafeto"
              width={786}
              height={1400}
              fetchPriority="high"
              className="w-full h-[420px] md:h-[600px] object-cover object-[50%_40%] block"
            />
            <figcaption className="text-[13px] text-muted">en Fiato y Cafeto, Col. Roma.</figcaption>
          </figure>
        </FadeIn>
      </div>
    </section>
  )
}
