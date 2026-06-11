import { useState } from 'react'

interface AccordionItemProps {
  question: string
  answer: string
}

function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
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
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? '200px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="pb-6 text-muted text-sm md:text-base leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

interface AccordionProps {
  items: { question: string; answer: string }[]
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
