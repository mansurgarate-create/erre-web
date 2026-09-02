import FadeIn from './ui/FadeIn'

const APP_STORE_URL = 'https://apps.apple.com/mx/app/erre/id6800519444'

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
          <div className="mt-10">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block no-underline opacity-90 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src="/media/app-store-badge.svg"
                alt="Consíguelo en el App Store"
                width={120}
                height={40}
                className="app-store-badge h-10 w-auto mx-auto"
              />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
