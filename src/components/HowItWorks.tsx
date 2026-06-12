import FadeIn from './ui/FadeIn'

const steps = [
  {
    number: '01',
    title: 'Pide',
    description: 'Ordena tu bebida en un vaso erre. Dejas un pequeño depósito que recuperas al devolverlo.',
  },
  {
    number: '02',
    title: 'Disfruta',
    description: 'Llévalo contigo. Es tuyo mientras lo necesites.',
  },
  {
    number: '03',
    title: 'Devuelve',
    description: 'Regresa el vaso en cualquier cafetería de la red y recupera tu depósito.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="px-6 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-black text-center mb-16 md:mb-20">
            Cómo funciona
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 150}>
              <div className="border border-border p-8 md:p-10 text-left hover:border-black transition-colors duration-500 h-full">
                <span className="font-heading text-4xl md:text-5xl text-muted/40 block mb-6">
                  {step.number}
                </span>
                <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
