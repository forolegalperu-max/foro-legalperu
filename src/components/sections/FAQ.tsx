import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqItems } from '../../data/faq';
import { Reveal } from '../ui/Reveal';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="relative bg-cream-dark/50 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-navy">Preguntas frecuentes</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-ink text-balance">Resolvemos tus dudas</h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <Reveal key={item.id} delay={0.03 * i}>
                <div className="rounded-2xl bg-paper border border-ink/8 overflow-hidden">
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    data-cursor-hover
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-ink">{item.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-ink-muted leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
