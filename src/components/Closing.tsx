import FadeIn from './ui/FadeIn'

export default function Closing() {
  return (
    <section className="relative px-6 py-32 md:py-44 overflow-hidden">
      <img
        src="/photos/hand-cup.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[center_60%]"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="font-heading text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight">
            de mano en mano.
          </p>
          <a
            href="https://instagram.com/erreparallevar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 text-white/80 text-sm md:text-base tracking-wide no-underline hover:text-white transition-colors duration-300"
          >
            @erreparallevar
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
