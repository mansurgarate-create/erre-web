import FadeIn from './ui/FadeIn'

export default function Closing() {
  return (
    <section className="px-6 py-32 md:py-44">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="font-heading text-3xl md:text-5xl lg:text-6xl font-medium text-black tracking-tight">
            de mano en mano.
          </p>
          <a
            href="https://instagram.com/erreparallevar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 text-black text-sm md:text-base tracking-wide no-underline hover:text-muted transition-colors duration-300"
          >
            @erreparallevar
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
