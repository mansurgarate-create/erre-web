import FadeIn from './ui/FadeIn'

const stats = [
  { value: '150+', label: 'Vasos en circulación' },
  { value: '1,200+', label: 'Vasos desechables evitados' },
  { value: '6', label: 'Cafeterías participantes' },
]

export default function CommunityImpact() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-black text-center mb-16 md:mb-20">
            Impacto colectivo
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div>
                <span className="font-heading text-5xl md:text-7xl font-medium text-black block">
                  {stat.value}
                </span>
                <span className="text-muted text-sm md:text-base mt-3 block tracking-wide">
                  {stat.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
