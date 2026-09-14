import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/ui/FadeIn'
import SiteHeader from '../components/SiteHeader'
import Footer from '../components/Footer'

const washSteps = [
  {
    number: '01',
    title: 'Lava',
    description: 'Agua tibia con jabón líquido suave — el jabón de trastes de uso diario está perfecto. Usar esponja suave o fibra no abrasiva. Lavar interior, exterior y tapa.',
  },
  {
    number: '02',
    title: 'Enjuaga',
    description: 'Enjuagar bien para retirar cualquier residuo de jabón.',
  },
  {
    number: '03',
    title: 'Seca',
    description: 'Dejar secar al aire. No apilar húmedos.',
  },
]

const avoidItems = [
  'Fibras metálicas, estropajos verdes abrasivos o polvos tipo Ajax — rayan la superficie y opacan el diseño.',
  'Cloro o blanqueadores concentrados.',
  'Solventes fuertes: thinner, acetona, alcohol industrial.',
  'Dejarlo remojando por horas en agua muy caliente.',
]

const inspectItems = [
  'Revisar cada vaso antes de reusar: sin grietas, sin decoloración, sin olor residual.',
  'Si un vaso o tapa está dañado, retirarlo de circulación.',
]

const careItems = [
  'Lavar a mano conserva mejor el color y brillo de la impresión.',
  'No dejar remojando por horas en agua muy caliente.',
  'No exponer al sol directo por tiempos prolongados — puede opacar los colores.',
  'Almacenar secos, boca abajo, en área limpia. Tapa separada del vaso.',
]

const attentionZones: {
  title: string
  description: string
  image?: string
  imageAlt?: string
}[] = [
  {
    title: 'Fondo del vaso',
    description:
      'El fondo interior es donde más fácil se quedan manchas. Asegúrate de tallarlo bien con la esponja hasta que quede completamente limpio.',
  },
  {
    title: 'Anillo superior del vaso',
    description:
      'El borde donde se monta la tapa suele quedarse manchado. Ese anillo tiene que estar bien limpio para que la tapa selle correctamente y no queden residuos visibles.',
    image: '/images/care/orilla-vaso.jpg',
    imageAlt: 'Orilla del vaso, donde se ensambla la tapa',
  },
  {
    title: 'Borde interior de la tapa',
    description:
      'La tapa tiene una hendidura interior en todo su diámetro donde se pueden quedar restos de bebida. Es importante buscar una herramienta (como un cepillo pequeño o un limpiador de popotes) que permita limpiar esa hendidura en todo el contorno de la tapa.',
    image: '/images/care/orilla-tapa.jpg',
    imageAlt: 'Orilla de la tapa, donde se ensambla en el vaso',
  },
  {
    title: 'Boquilla y orificio de ventilación',
    description:
      'La boquilla hay que lavarla por dentro y por fuera; por dentro tiene unos dobleces difíciles de limpiar. El orificio de ventilación también acumula residuos, por dentro y por fuera. Si se puede, pasar un limpiador de popotes por ambos, con cuidado de no rayar el material.',
    image: '/images/care/boquilla-orificio.jpg',
    imageAlt: 'Boquilla y orificio de venteo de la tapa',
  },
]

function ZoneBlock({
  title,
  description,
  image,
  imageAlt,
}: {
  title: string
  description: string
  image?: string
  imageAlt?: string
}) {
  return (
    <div
      className={`rounded-2xl bg-wash p-8 md:p-10 ${
        image ? 'md:grid md:grid-cols-2 md:gap-8 md:items-center' : ''
      }`}
    >
      {image ? (
        <img
          src={image}
          alt={imageAlt ?? title}
          className="w-full max-h-[28rem] object-contain rounded-xl mb-6 md:mb-0"
        />
      ) : null}
      <div>
        <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
          {title}
        </h3>
        <p className="text-muted text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default function CareGuide() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />

      <main className="px-6 pb-24 md:pb-32 flex-1">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-muted text-xs md:text-sm mb-4">
              guía para cafeterías
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6 md:mb-8">
              Cuidado del vaso
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-16 md:mb-20">
              Instrucciones para mantener los vasos erre en las mejores condiciones. Material: polipropileno (PP). Impresión por serigrafía UV — resistente al uso y lavado normal.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-12 md:mb-16">
              Lavado
            </h2>
          </FadeIn>

          <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
            {washSteps.map((step, i) => (
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
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-4 md:mb-6">
              Zonas de atención
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed mb-8 md:mb-10">
              Toda la superficie del vaso y de la tapa debe lavarse bien por dentro y por fuera. Hay zonas donde se acumulan residuos con más facilidad. Presta especial atención a las siguientes:
            </p>
          </FadeIn>

          <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
            {attentionZones.map((zone, i) => (
              <FadeIn key={zone.title} delay={250 + i * 80}>
                <ZoneBlock {...zone} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-8 md:mb-10">
              Cuidados generales
            </h2>
          </FadeIn>

          <FadeIn delay={250}>
            <ul className="space-y-4 mb-16 md:mb-20">
              {careItems.map((item, i) => (
                <li key={i} className="text-muted text-sm md:text-base leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-border">
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={275}>
            <div className="rounded-2xl bg-wash p-8 md:p-10 mb-16 md:mb-20">
              <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-4">
                ¿Se puede meter al lavavajillas?
              </h2>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                Sí, es apto para lavavajillas. De preferencia en la charola superior con ciclo estándar — no el de sanitizado con temperaturas muy altas. El lavado a mano conserva mejor los colores a largo plazo; el uso intensivo con temperaturas altas de forma repetida puede ir opacando los tonos con el tiempo.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="rounded-2xl bg-wash p-8 md:p-10 mb-8 md:mb-10">
              <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-6">
                Evitar
              </h2>
              <ul className="space-y-3">
                {avoidItems.map((item, i) => (
                  <li key={i} className="text-muted text-sm md:text-base leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-border">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={350}>
            <div className="rounded-2xl bg-wash p-8 md:p-10 mb-16 md:mb-20">
              <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-6">
                Inspección antes de reusar
              </h2>
              <ul className="space-y-3">
                {inspectItems.map((item, i) => (
                  <li key={i} className="text-muted text-sm md:text-base leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-border">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              La guía de operación de la red está en{' '}
              <Link
                to="/info"
                className="text-black underline hover:text-muted transition-colors duration-300"
              >
                holaerre.com/info
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  )
}
