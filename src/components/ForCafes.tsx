import { Link } from 'react-router-dom'
import FadeIn from './ui/FadeIn'

const CONTACT_EMAIL = 'hola@holaerre.com'
const MAIL_SUBJECT = encodeURIComponent('Quiero sumar mi café a erre')

export default function ForCafes() {
  return (
    <section id="para-cafes" className="px-4 sm:px-6 py-20 md:py-32 scroll-mt-16">
      <FadeIn>
        <div className="max-w-6xl mx-auto border border-black flex flex-col md:flex-row">
          <img
            src="/images/landing/mala-kaffe-barista.webp"
            alt="Barista de Mala Kaffe sirviendo un matcha en un vaso erre"
            width={786}
            height={1400}
            loading="lazy"
            className="md:flex-1 min-w-0 w-full h-[280px] md:h-auto md:min-h-[480px] object-cover object-[50%_65%] block"
          />
          <div className="md:flex-1 min-w-0 p-6 sm:p-8 md:p-14 flex flex-col gap-5">
            <p className="erre-eyebrow">para cafés</p>
            <h2 className="font-heading text-[32px] md:text-[52px] font-medium leading-[1.06] tracking-[-0.02em]">
              ¿tienes un café? súmate a la red.
            </h2>
            <p className="text-lg leading-relaxed max-w-[44ch]">
              te llevamos los vasos, el stand y el cartel. apareces en el mapa de la red, y cada vaso que alguien
              devuelve es una visita más a tu café.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-2">
              <a href={`mailto:${CONTACT_EMAIL}?subject=${MAIL_SUBJECT}`} className="erre-cta">
                escríbenos
              </a>
              <Link to="/info" className="erre-cta-outline">
                cómo opera un café erre
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
