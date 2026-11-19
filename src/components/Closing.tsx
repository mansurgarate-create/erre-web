import FadeIn from './ui/FadeIn'

export default function Closing() {
  return (
    <section className="border-t border-border px-4 sm:px-6 py-28 md:py-40">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="font-heading text-[36px] sm:text-5xl md:text-6xl lg:text-[76px] text-balance font-medium text-black tracking-[-0.03em]">
            de mano en mano.
          </p>
          <a
            href="https://instagram.com/erreparallevar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 py-2 text-black text-base no-underline hover:text-muted transition-colors duration-300"
          >
            @erreparallevar
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
