import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import FadeIn from '../components/ui/FadeIn'

const washSteps = [
  {
    number: '01',
    title: 'Enjuaga',
    description: 'Enjuagar vaso y tapa con agua tibia inmediatamente después de recibir. No dejar que los residuos se sequen.',
  },
  {
    number: '02',
    title: 'Lava',
    description: 'Agua caliente (máx. 80 °C, no hirviendo) con jabón líquido neutro. Esponja suave, sin fibra metálica. Lavar interior, exterior y tapa.',
  },
  {
    number: '03',
    title: 'Desinfecta',
    description: 'Sumergir 2 minutos en solución desinfectante apta para alimentos, o en agua con vinagre blanco al 10 %. No usar cloro concentrado.',
  },
  {
    number: '04',
    title: 'Seca',
    description: 'Escurrir boca abajo sobre superficie limpia. Dejar secar al aire. No apilar húmedos.',
  },
  {
    number: '05',
    title: 'Almacena',
    description: 'Guardar secos, boca abajo, en área limpia. Tapa separada del vaso.',
  },
]

const avoidItems = [
  'Lavavajillas industrial — la temperatura excesiva deforma el polipropileno.',
  'Fibras metálicas o estropajos abrasivos — rayan la superficie.',
  'Cloro puro, blanqueador o solventes.',
  'Microondas.',
]

const inspectItems = [
  'Revisar cada vaso antes de reusar: sin grietas, sin decoloración, sin olor residual.',
  'Si un vaso o tapa está dañado, retirarlo de circulación.',
]

const careItems = [
  'No exponer a temperaturas mayores a 100 °C por periodos prolongados.',
  'No dejar el vaso al sol directo por horas — puede decolorar el material.',
  'Evitar llenar con bebidas extremadamente ácidas por más de 24 horas.',
  'Almacenar lejos de fuentes de calor directo (hornos, planchas).',
]

export default function CareGuide() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 pt-10 pb-6 md:pt-14 md:pb-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="font-heading text-xl md:text-2xl font-medium text-black no-underline hover:text-muted transition-colors duration-300"
          >
            erre
          </Link>
        </div>
      </header>

      <main className="px-6 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-muted text-xs md:text-sm tracking-widest uppercase mb-4">
              Guía para cafeterías
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6 md:mb-8">
              Cuidado del vaso
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-16 md:mb-20">
              Instrucciones para mantener los vasos erre en las mejores condiciones. Material: polipropileno (PP).
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
                <div className="border border-border p-8 md:p-10 hover:border-black transition-colors duration-500">
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

          {/* Evitar */}
          <FadeIn delay={300}>
            <div className="border-2 border-black p-8 md:p-10 mb-8 md:mb-10">
              <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-6">
                Evitar
              </h2>
              <ul className="space-y-3">
                {avoidItems.map((item, i) => (
                  <li key={i} className="text-muted text-sm md:text-base leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-black">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Inspección */}
          <FadeIn delay={350}>
            <div className="border-2 border-black p-8 md:p-10 mb-16 md:mb-20">
              <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-6">
                Inspección antes de reusar
              </h2>
              <ul className="space-y-3">
                {inspectItems.map((item, i) => (
                  <li key={i} className="text-muted text-sm md:text-base leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-black">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Pie */}
          <FadeIn delay={400}>
            <div className="border-t border-border pt-10 text-center">
              <p className="font-heading text-lg md:text-xl font-medium text-black mb-2">
                erre
              </p>
              <p className="text-muted text-sm italic">
                de mano en mano.
              </p>
              <a
                href="https://holaerre.com"
                className="inline-block mt-4 text-muted text-xs tracking-widest uppercase hover:text-black transition-colors duration-300 no-underline"
              >
                holaerre.com
              </a>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  )
}
