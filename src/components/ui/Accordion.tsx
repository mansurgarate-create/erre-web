import { useState, type ReactNode } from 'react'

interface AccordionItemProps {
  question: string
  answer: ReactNode
}

function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-6 text-left cursor-pointer bg-transparent border-none"
      >
        <span className="font-sans text-base md:text-lg font-medium text-black pr-4">
          {question}
        </span>
        <span
          className="text-2xl text-muted transition-transform duration-300 shrink-0"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out print:grid-rows-[1fr] print:opacity-100 ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-muted text-sm md:text-base leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

interface AccordionProps {
  items: { question: string; answer: ReactNode }[]
}

export default function Accordion({ items }: AccordionProps) {
  return (
    <div className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}
