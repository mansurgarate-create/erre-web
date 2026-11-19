import FadeIn from './ui/FadeIn'
import { rentSteps, cafeSteps } from '../lib/rentSteps'

type Step = { number: string; title: string; description: string }

function StepList({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <div className="flex-1 min-w-0">
      <p className="text-lg font-medium mb-4">{title}</p>
      <ol className="list-none m-0 p-0 border-t border-black">
        {steps.map((step) => (
          <li key={step.number} className="flex gap-6 items-baseline py-6 border-b border-border">
            <span className="text-xl text-muted font-normal min-w-8">{step.number}</span>
            <div>
              <p className="text-xl font-medium mb-1.5">{step.title}</p>
              <p className="text-base leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="border-t border-border px-4 sm:px-6 py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="erre-eyebrow mb-4">cómo funciona</p>
          <h2 className="font-heading text-[32px] md:text-[52px] font-medium text-black leading-[1.1] tracking-[-0.02em] mb-12">
            tres pasos. sin app, sin prisa.
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            <StepList title="para ti" steps={rentSteps} />
            <StepList title="para tu café" steps={cafeSteps} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
