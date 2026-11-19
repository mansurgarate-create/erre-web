import FadeIn from './ui/FadeIn'
import Accordion from './ui/Accordion'

const faqItems = [
  {
    question: '¿necesito una app?',
    answer:
      'no. pides en caja, dejas tus $30 y listo. si quieres llevar registro de tus vasos, puedes entrar desde esta página con Google o acercar tu teléfono al punto erre del café.',
  },
  {
    question: '¿lo tengo que devolver en el mismo café?',
    answer: 'no. cualquier café erre lo recibe y te regresa tus $30. en el mapa de arriba ves cuál te queda cerca.',
  },
  {
    question: '¿y si no lo devuelvo?',
    answer:
      'es tuyo, sigue reutilizándolo.',
  },
  {
    question: '¿cuesta más el café?',
    answer:
      'no. el café cuesta lo mismo. el depósito no es un cobro, es lo que mantiene al vaso circulando.',
  },
  {
    question: '¿cómo se lava el vaso?',
    answer: 'cada café lo lava antes de volver a servir en él, a mano o en lavavajillas, como cualquier taza.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="px-4 sm:px-6 pb-20 md:pb-32 scroll-mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16">
        <FadeIn className="md:w-1/3 shrink-0">
          <p className="erre-eyebrow mb-4">preguntas</p>
          <h2 className="font-heading text-[32px] md:text-[44px] font-medium text-black leading-[1.1] tracking-[-0.02em]">
            lo que más nos preguntan
          </h2>
        </FadeIn>

        <FadeIn delay={150} className="flex-1 min-w-0">
          <div className="border-t border-black">
            <Accordion items={faqItems} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
