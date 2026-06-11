import FadeIn from './ui/FadeIn'
import Accordion from './ui/Accordion'

const faqItems = [
  {
    question: '¿Cómo funciona erre?',
    answer:
      'Pides tu bebida en un vaso erre en cualquier cafetería participante. Cuando termines, lo devuelves en cualquier punto de la red. Nosotros nos encargamos de lavarlo y ponerlo de nuevo en circulación.',
  },
  {
    question: '¿Qué pasa si pierdo un vaso?',
    answer:
      'Sabemos que puede pasar. Por ahora, solo te pedimos que hagas tu mejor esfuerzo por devolverlo. Estamos construyendo una comunidad basada en la confianza.',
  },
  {
    question: '¿Dónde puedo devolver un vaso?',
    answer:
      'En cualquier cafetería participante de la red erre. Consulta el mapa en esta página para encontrar la más cercana.',
  },
  {
    question: '¿Tiene algún costo extra?',
    answer:
      'No. El sistema erre no tiene costo adicional para ti. El café que compras es el mismo, solo que en un vaso que puede usarse una y otra vez.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-black text-center mb-12 md:mb-16">
            Preguntas frecuentes
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <Accordion items={faqItems} />
        </FadeIn>
      </div>
    </section>
  )
}
