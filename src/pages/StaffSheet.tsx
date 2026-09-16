import { useEffect } from 'react'
import FadeIn from '../components/ui/FadeIn'
import SiteHeader from '../components/SiteHeader'

const sections: { title: string; items: string[] }[] = [
  {
    title: 'Depósito',
    items: [
      'Al pedir en vaso erre: cobra $30 extra. Sin fecha límite para devolver.',
      'Al devolver: siempre regresas los $30. Da igual de qué cafetería salió, si compran o no, o si llega rayado / sin tapa.',
      'Tarjeta: suma $30 a la cuenta; la devolución es en efectivo.',
      'Efectivo: cobra junto con la bebida; ese dinero es caja chica para devoluciones.',
    ],
  },
  {
    title: 'Antes de servir',
    items: [
      'Revisar vaso y tapa: limpios, sin olor, sin grietas ni decoloración.',
      'Si no pasa: no lo llenes. Apártalo y escribe a hola@holaerre.com.',
    ],
  },
  {
    title: 'Lavado',
    items: [
      'Agua tibia, jabón de trastes, esponja suave. Interior, exterior y tapa.',
      'Zonas que se olvidan: fondo del vaso, anillo donde sella la tapa, hendidura interior de la tapa, boquilla y orificio.',
      'Enjuagar bien. Secar al aire. No apilar húmedos. Tapa y vaso separados.',
      'No fibras abrasivas ni cloro.',
      'Lavavajillas: charola superior, ciclo estándar — no el de sanitizado.',
    ],
  },
  {
    title: 'Stand',
    items: ['El QR y el NFC son de este stand: no los muevas.'],
  },
]

export default function StaffSheet() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'erre — hoja para el staff'
    const style = document.createElement('style')
    style.setAttribute('data-staff-print', '')
    style.textContent = '@page { size: letter portrait; margin: 14mm; }'
    document.head.appendChild(style)
    return () => {
      document.title = 'erre — vasos reutilizables en Monterrey'
      style.remove()
    }
  }, [])

  return (
    <div className="staff-sheet-page min-h-screen bg-white flex flex-col">
      <div className="print-hide">
        <SiteHeader />
      </div>
      <main className="px-6 pb-24 md:pb-32 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="print-hide">
            <FadeIn>
              <button type="button" onClick={() => window.print()} className="erre-btn mb-14">
                Imprimir
              </button>
            </FadeIn>
          </div>

          <article className="staff-sheet">
            <h1 className="font-heading text-3xl md:text-4xl font-medium text-black tracking-tight mb-8 md:mb-10">
              erre en caja
            </h1>
            <div className="staff-sheet-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-sans text-base md:text-lg font-medium text-black mb-3">
                    {section.title}
                  </h2>
                  <ul className="space-y-2 list-none p-0 m-0">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="text-muted text-sm leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-border"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <p className="staff-sheet-foot text-muted text-xs md:text-sm mt-10 md:mt-12">
              hola@holaerre.com · holaerre.com/cuidado · holaerre.com/info
            </p>
          </article>
        </div>
      </main>
    </div>
  )
}
