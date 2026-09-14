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

const attentionZones = [
  { image: '/images/care/boquilla-tapa.jpg', caption: 'Boquilla y orificio de ventilación' },
  { image: '/images/care/orilla-vaso.jpg', caption: 'Orilla superior del vaso' },
  { image: '/images/care/orilla-tapa.jpg', caption: 'Orilla interior de la tapa' },
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

          {/* Lavado */}
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

          {/* Zonas de atención */}
          <FadeIn delay={200}>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-black mb-4 md:mb-6">
              Zonas de atención
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed mb-8 md:mb-10">
              Toda la superficie del vaso debe lavarse bien por dentro y por fuera, pero hay zonas donde se acumulan residuos con más facilidad. Presta especial atención a las siguientes:
            </p>
          </FadeIn>

          <div className="space-y-6 md:space-y-8 mb-8 md:mb-10">
            <FadeIn delay={250}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Fondo del vaso
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  El fondo interior es donde más fácil se quedan manchas. Asegúrate de tallarlo bien con la esponja hasta que quede completamente limpio.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Anillo superior del vaso
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  El borde donde se monta la tapa suele quedarse manchado. Ese anillo tiene que estar bien limpio para que la tapa selle correctamente y no queden residuos visibles.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={350}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Borde interior de la tapa
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  La tapa tiene una hendidura interior en todo su diámetro donde se pueden quedar restos de bebida. Es importante buscar una herramienta (como un cepillo pequeño o un limpiador de popotes) que permita limpiar esa hendidura en todo el contorno de la tapa.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Boquilla de la tapa
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  La boquilla tiene unos dobleces por dentro que son difíciles de limpiar. Hay que lavarla bien por dentro y por fuera. Si es posible, pasar un limpiador de popotes por la boquilla con cuidado de no rayar el material.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={450}>
              <div className="rounded-2xl bg-wash p-8 md:p-10">
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                  Orificio de ventilación
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  El orificio pequeño de ventilación también acumula residuos. Limpiar por dentro y por fuera, y si se puede, pasar un limpiador de popotes igual que con la boquilla.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={475}>
            <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-6">
              Referencia visual
            </h3>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
            {attentionZones.map((zone, i) => (
              <FadeIn key={zone.caption} delay={500 + i * 100}>
                <div>
                  <div className="aspect-video rounded-xl bg-wash overflow-hidden mb-3">
                    <img
                      src={zone.image}
                      alt={zone.caption}
                      className="w-full h-full object-cover hidden"
                      onLoad={(e) => {
                        (e.target as HTMLImageElement).classList.remove('hidden')
                      }}
                    />
                  </div>
                  <p className="text-muted text-xs md:text-sm">
                    {zone.caption}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Cuidados generales */}
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

          {/* Lavavajillas */}
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

          {/* Evitar */}
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

          {/* Inspección */}
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
