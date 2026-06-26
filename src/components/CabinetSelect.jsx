import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'

export default function CabinetSelect({
  id,
  value,
  onChange,
  placeholder,
  options,
  name,
}) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const rootRef = useRef(null)
  const listId = useId()
  const selected = options.find((option) => option.value === value)

  useEffect(() => {
    const close = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
        setHighlight(-1)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const pick = (nextValue) => {
    onChange(nextValue)
    setOpen(false)
    setHighlight(-1)
  }

  const handleKeyDown = (event) => {
    if (!open && (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      setOpen(true)
      setHighlight(value ? options.findIndex((o) => o.value === value) : 0)
      return
    }

    if (!open) return

    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      setHighlight(-1)
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlight((prev) => (prev + 1) % options.length)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((prev) => (prev <= 0 ? options.length - 1 : prev - 1))
    }

    if (event.key === 'Enter' && highlight >= 0) {
      event.preventDefault()
      pick(options[highlight].value)
    }
  }

  return (
    <div ref={rootRef} className="relative">
      {name && <input type="hidden" name={name} value={value} readOnly />}

      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`group flex h-11 w-full items-center justify-between gap-3 border-0 border-b bg-transparent px-0 text-left text-sm transition-colors duration-300 outline-none ${
          open ? 'border-gold' : 'border-border focus:border-gold'
        }`}
      >
        <span className={`truncate ${selected ? 'font-medium text-navy' : 'text-slate'}`}>
          {selected?.label || placeholder}
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/15">
          <ChevronDown
            className={`h-4 w-4 text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+0.5rem)] z-30 w-full overflow-hidden border border-border bg-white shadow-[0_16px_40px_rgba(27,46,111,0.14)]"
          >
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gold rtl:right-0 rtl:left-auto" />
            <div className="border-b border-border/60 bg-background px-4 py-2.5">
              <span className="font-sora text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                {placeholder}
              </span>
            </div>

            <ul
              id={listId}
              role="listbox"
              aria-labelledby={id}
              className="max-h-56 overflow-y-auto py-1"
            >
              {options.map((option, index) => {
                const isSelected = value === option.value
                const isHighlighted = highlight === index

                return (
                  <li key={option.value} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setHighlight(index)}
                      onClick={() => pick(option.value)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors duration-200 ${
                        isSelected
                          ? 'bg-gold/8 text-navy'
                          : isHighlighted
                            ? 'bg-navy text-white'
                            : 'text-navy hover:bg-navy/5'
                      }`}
                    >
                      <span className={isSelected ? 'font-sora font-semibold' : ''}>{option.label}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
