import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/ui/FadeIn'
import Accordion from '../components/ui/Accordion'
import SiteHeader from '../components/SiteHeader'
import Footer from '../components/Footer'

const APP_STORE_URL = 'https://apps.apple.com/mx/app/erre/id6800519444'
const EMAIL = 'hola@holaerre.com'

function MailLink() {
  return (
    <a
      href={`mailto:${EMAIL}`}
      className="text-black underline hover:text-muted transition-colors duration-300"
    >
      {EMAIL}
    </a>
  )
}

const flowSteps = [
  {
    number: '01',
    title: 'El cliente pide su bebida en vaso erre',
    description: 'Deja un depósito de $30. Se lo puede llevar sin prisa y sin fecha límite.',
  },
  {
    number: '02',
    title: 'Devuelve el vaso en cualquier cafetería de la red',
    description: 'No tiene que ser la misma cafetería donde lo pidió. Puede ser cualquier punto erre.',
  },
  {
    number: '03',
    title: 'La cafetería le regresa los $30',
    description: 'Siempre. No importa quién lo trajo, ni de qué cafetería salió. Los $30 se regresan completos.',
  },
]

const faqItems: { question: string; answer: ReactNode }[] = [
  {
    question: '¿Qué pasa si llega un vaso sin tapa, rayado o roto?',
    answer: (
      <>
        Recíbelo y da los $30. No importa la condición. Aparta el vaso o la tapa dañados — no los vuelvas a llenar. Escríbenos a <MailLink /> y erre los repone. Lo que queremos es que el cliente siempre tenga una buena experiencia al devolver.
      </>
    ),
  },
  {
    question: '¿Qué pasa si un cliente no regresa el vaso?',
    answer:
      'No pasa nada. Ya pagó los $30 por él. Lo más probable es que lo regrese eventualmente en otra cafetería de la red. Y si no, pues se quedó con un buen vaso.',
  },
  {
    question: '¿Qué hago si me quedo sin vasos?',
    answer: (
      <>
        Escríbenos a <MailLink />. erre te lleva más sin costo.
      </>
    ),
  },
  {
    question: '¿Qué hago si se me acumulan muchos vasos?',
    answer: (
      <>
        Escríbenos a <MailLink />. erre pasa a recoger los que te sobren y los redistribuye a otras cafeterías que los necesiten.
      </>
    ),
  },
  {
    question: '¿Cuánto dura un vaso?',
    answer:
      'Si se cuida bien, más de 1,000 usos. Es importante lavarlo correctamente y no usar fibras abrasivas ni cloro.',
  },
  {
    question: '¿Los vasos son diferentes por cafetería?',
    answer:
      'No. Todos los vasos de la red son iguales. Un cliente puede llevar el vaso a cualquier cafetería y devolverlo sin problema.',
  },
]

const benefits = [
  'erre provee los vasos y la app. No pagas nada por unirte.',
  'Tu cafetería aparece en holaerre.com y en la app con mapa, horarios, dirección e Instagram.',
  'Cada vaso que circula lleva gente nueva a tu puerta.',
  'Compromiso ambiental real que tus clientes ven y valoran.',
]

const usefulLinks: { label: string; to?: string; href?: string }[] = [
  { label: 'Guía de cuidado del vaso', to: '/cuidado' },
  { label: 'Mapa de la red erre', to: '/#cafeterias' },
  { label: 'holaerre.com', to: '/' },
  { label: '@erreparallevar', href: 'https://instagram.com/erreparallevar' },
  { label: 'App para iOS', href: APP_STORE_URL },
  { label: EMAIL, href: `mailto:${EMAIL}` },
]

export default function CafeOpsGuide() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'erre — guía para cafeterías'
    return () => {
      document.title = 'erre — vasos reutilizables en Monterrey'
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="print-hide">
        <SiteHeader />
      </div>

      <main className="px-6 pb-24 md:pb-32 flex-1">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-muted text-xs md:text-sm mb-4">
              guía para cafeterías
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6 md:mb-8">
              Todo lo que necesitas saber para operar con vasos erre.
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-16 md:mb-20">
              erre es una red de vasos reutilizables que conecta cafeterías en Monterrey. Tus clientes piden su bebida en vaso erre, lo llevan, y lo devuelven en cualquier cafetería de la red. Todos los vasos son iguales para toda la red.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-12 md:mb-16">
              Cómo funciona
            </h2>
          </FadeIn>

          <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
            {flowSteps.map((step, i) => (
              <FadeIn key={step.number} delay={150 + i * 100}>
                <div className="rounded-2xl bg-wash p-8 md:p-10">
                  <span className="font-heading text-3xl md:text-4xl text-muted/40 block mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-8 md:mb-10">
              Operación del depósito
            </h2>
          </FadeIn>

          <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
            <FadeIn delay={220}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Si el cliente paga con tarjeta
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  Suma los $30 del depósito al total de la cuenta. Cuando alguien devuelva un vaso, regrésale los $30 en efectivo.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={260}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Si el cliente paga en efectivo
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  Cobra los $30 junto con la bebida. Ese dinero queda como caja chica para devolver depósitos cuando otros clientes regresen vasos.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Devoluciones
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed mb-4">
                  Es posible que lleguen personas solo a devolver un vaso y recibir sus $30. No necesitan comprar nada. Hay que darles su depósito.
                </p>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  El vaso no tiene que venir de tu cafetería. Puede venir de cualquier punto erre.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={200}>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-4 md:mb-6">
              El vaso
            </h2>
            <img
              src="/images/info/vaso-erre.jpg"
              alt="Vaso erre reutilizable"
              className="max-w-[220px] max-h-[180px] rounded-2xl object-cover mx-auto block mb-8 md:mb-10"
            />
            <p className="text-muted text-sm md:text-base leading-relaxed mb-8 md:mb-10">
              Material: polipropileno (PP), impresión por serigrafía UV. Todos los vasos de la red son iguales. Si se cuida bien, cada vaso puede usarse más de 1,000 veces.
            </p>
          </FadeIn>

          <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
            <FadeIn delay={240}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Bebidas calientes y frías
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  El vaso funciona para ambas. Con bebidas calientes, el material traspasa algo de calor. Se recomienda agarrar de la parte de arriba o con una manga reusable si se necesita.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={280}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Lavado
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  Lavar bien cada vaso antes de volver a usarlo. Agua tibia con jabón de trastes, esponja suave, enjuagar y secar al aire. También es apto para lavavajillas: charola superior, ciclo estándar — no el de sanitizado.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <Link
                to="/cuidado"
                className="block rounded-2xl bg-impact-wash p-8 md:p-10 no-underline hover:opacity-90 transition-opacity duration-300"
              >
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Guía de cuidado del vaso
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  Paso a paso de lavado, zonas de atención y qué evitar.
                </p>
              </Link>
            </FadeIn>
            <FadeIn delay={320}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Vasos dañados
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  Si llega un vaso o tapa con grietas, decoloración u olor residual: da los $30 y apártalo. No lo vuelvas a llenar. Escríbenos a <MailLink /> para reponerlo.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={200}>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-4 md:mb-6">
              El stand erre
            </h2>
            <img
              src="/images/info/stand-qr.jpg"
              alt="Stand erre con código QR y NFC"
              className="max-w-[220px] max-h-[180px] rounded-2xl object-cover mx-auto block mb-8 md:mb-10"
            />
            <p className="text-muted text-sm md:text-base leading-relaxed mb-8 md:mb-10">
              Cada cafetería de la red tiene un stand con un código QR y un chip NFC. Los clientes pueden escanear el QR o acercar su celular al NFC para llegar a la página de punto erre de tu cafetería. El chip y el QR son de ese stand: no los muevas ni los reemplaces.
            </p>
          </FadeIn>

          <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
            <FadeIn delay={240}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  ¿Qué encuentran ahí?
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed mb-4">
                  La página de punto erre de tu cafetería muestra tu Instagram, horarios, dirección, fotos, un link a tu menú y recomendaciones de bebidas que tú eliges.
                </p>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  Para actualizar horarios, Instagram, menú o recomendaciones, escríbenos a <MailLink />.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={280}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Registro de rentas con la app
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed mb-4">
                  El NFC del stand también sirve para registrar rentas y devoluciones desde la app de erre. Si el cliente acerca su celular al stand desde la sección de escanear, puede registrar que rentó o devolvió un vaso.
                </p>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  Esto no mueve nada del depósito — el depósito se sigue manejando como siempre en la caja. El registro en la app es para que el cliente pueda ver cuántos vasos ha rentado, cuántos tiene sin devolver y cuántos desechables ha evitado.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={200}>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-8 md:mb-10">
              Preguntas frecuentes
            </h2>
          </FadeIn>

          <FadeIn delay={240}>
            <div className="mb-16 md:mb-20">
              <Accordion items={faqItems} />
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-8 md:mb-10">
              Links útiles
            </h2>
            <div className="mb-16 md:mb-20">
              {usefulLinks.map((item) => {
                const className =
                  'flex justify-between items-center py-4 border-b border-border text-sm md:text-base font-medium text-black no-underline hover:text-muted transition-colors duration-300 first:border-t'
                const arrow = <span className="text-muted text-sm">&rarr;</span>
                if (item.to) {
                  return (
                    <Link key={item.label} to={item.to} className={className}>
                      {item.label}
                      {arrow}
                    </Link>
                  )
                }
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={className}
                    {...(item.href?.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.label}
                    {arrow}
                  </a>
                )
              })}
            </div>
          </FadeIn>

          <FadeIn delay={220}>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-8 md:mb-10">
              Beneficios para tu cafetería
            </h2>
            <ul className="space-y-4">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="text-muted text-sm md:text-base leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-border"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </main>

      <div className="print-hide">
        <Footer />
      </div>
    </div>
  )
}
