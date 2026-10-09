import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ExternalLink, X, ZoomIn } from 'lucide-react';
import type { Course } from '../../data/courses';
import { formatCurrency, formatDate } from '../../lib/utils';
import { EnrollButtons } from './EnrollButtons';
import { Lightbox } from './Lightbox';

export function hasSyllabus(course: Course) {
  return Boolean(course.contentModules?.length || course.schedule?.length || course.syllabusImage);
}

// "Título del módulo — Ponente" → { title, speaker }
function splitModule(text: string) {
  const i = text.lastIndexOf(' — ');
  return i === -1 ? { title: text, speaker: undefined } : { title: text.slice(0, i), speaker: text.slice(i + 3) };
}

interface SyllabusModalProps {
  course: Course | null;
  onClose: () => void;
}

export function SyllabusModal({ course, onClose }: SyllabusModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!course) return;
    // Con la imagen ampliada abierta, Escape lo maneja el visor y no esta ventana.
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !zoom && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [course, zoom, onClose]);

  useEffect(() => {
    if (course) closeRef.current?.focus();
    else setZoom(false);
  }, [course]);

  return (
    <>
      <AnimatePresence>
        {course && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/60" onClick={onClose} />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="syllabus-title"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-paper shadow-soft sm:max-w-2xl sm:rounded-3xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-ink/10 px-6 py-4 sm:px-8">
                <span className="inline-flex items-center rounded-full bg-navy/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy">
                  {course.isRecorded ? 'Clases grabadas' : `En vivo · inicia ${formatDate(course.startDate)}`}
                </span>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Cerrar"
                  data-cursor-hover
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto px-6 py-6 sm:px-8">
                <h2 id="syllabus-title" className="font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                  {course.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{course.description}</p>

                {course.contentModules && (
                  <section className="mt-6" aria-labelledby="syllabus-content">
                    <h3 id="syllabus-content" className="text-xs font-bold uppercase tracking-widest text-coral">
                      Temario
                    </h3>
                    <ol className="mt-3 space-y-3">
                      {course.contentModules.map((module, i) => {
                        const { title, speaker } = splitModule(module);
                        return (
                          <li key={module} className="flex gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral/10 text-xs font-bold text-coral">
                              {i + 1}
                            </span>
                            <span className="text-sm text-ink">
                              {title}
                              {speaker && <span className="block text-xs font-semibold text-navy">{speaker}</span>}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                )}

                {course.schedule && (
                  <section className="mt-6" aria-labelledby="syllabus-schedule">
                    <h3 id="syllabus-schedule" className="text-xs font-bold uppercase tracking-widest text-coral">
                      Sesiones
                    </h3>
                    <ol className="mt-3 space-y-4">
                      {course.schedule.map((session) => (
                        <li key={session.date} className="border-l-2 border-coral/40 pl-4">
                          <span className="text-xs font-semibold text-ink">
                            {session.date} · {session.time}
                          </span>
                          <span className="mt-1 block text-sm text-ink">{session.topic}</span>
                          <span className="mt-0.5 block text-xs font-semibold text-navy">{session.speaker}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {(course.syllabusImage || course.externalSyllabusUrl) && (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {course.syllabusImage && (
                      <button
                        type="button"
                        onClick={() => setZoom(true)}
                        data-cursor-hover
                        className="group relative h-24 w-[4.8rem] shrink-0 overflow-hidden rounded-xl ring-1 ring-ink/10"
                        aria-label="Ver imagen del temario ampliada"
                      >
                        <img src={course.syllabusImage} alt="" loading="lazy" className="h-full w-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center bg-ink/40 text-cream opacity-0 transition-opacity group-hover:opacity-100">
                          <ZoomIn size={18} />
                        </span>
                      </button>
                    )}
                    {course.externalSyllabusUrl && (
                      <a
                        href={course.externalSyllabusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline-offset-4 hover:underline"
                      >
                        Ver temario completo <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                )}

                {course.benefits.length > 0 && (
                  <section className="mt-6" aria-labelledby="syllabus-benefits">
                    <h3 id="syllabus-benefits" className="text-xs font-bold uppercase tracking-widest text-coral">
                      Incluye
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {course.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-ink">
                          <Check size={16} className="mt-0.5 shrink-0 text-coral" /> {benefit}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 bg-cream px-6 py-4 sm:px-8">
                <div className="leading-tight">
                  <span className="font-display text-2xl font-semibold text-ink">{formatCurrency(course.price)}</span>
                  {course.certificateAddOnPrice && (
                    <span className="ml-2 text-xs text-ink-muted">+ {formatCurrency(course.certificateAddOnPrice)} constancia</span>
                  )}
                </div>
                <EnrollButtons course={course} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox
        src={zoom && course?.syllabusImage ? course.syllabusImage : null}
        alt={course ? `Temario: ${course.name}` : ''}
        onClose={() => setZoom(false)}
      />
    </>
  );
}
