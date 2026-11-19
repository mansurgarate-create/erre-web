import FadeIn from './ui/FadeIn'
import { rentSteps } from '../lib/rentSteps'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="border-t border-border px-4 sm:px-6 py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="erre-eyebrow mb-4">cómo funciona</p>
          <h2 className="font-heading text-[32px] md:text-[52px] font-medium text-black leading-[1.1] tracking-[-0.02em] mb-12">
            tres pasos. sin prisa.
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <ol className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-3 md:gap-10">
            {rentSteps.map((step) => (
              <li
                key={step.number}
                className="flex md:flex-col gap-6 md:gap-4 items-baseline py-6 border-t border-black md:pb-0"
              >
                <span className="text-xl text-muted font-normal min-w-8">{step.number}</span>
                <div>
                  <p className="text-xl font-medium mb-1.5">{step.title}</p>
                  <p className="text-base leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>
      </div>
    </section>
  )
}
