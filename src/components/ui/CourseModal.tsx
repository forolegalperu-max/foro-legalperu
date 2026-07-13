import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Check, Clock, ExternalLink, MapPin, Phone, Star, X } from 'lucide-react';
import type { Course } from '../../data/courses';
import { teachers } from '../../data/teachers';
import { brand } from '../../data/site';
import { formatCurrency, formatDate } from '../../lib/utils';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
}

export function CourseModal({ course, onClose }: CourseModalProps) {
  useEffect(() => {
    if (!course) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [course, onClose]);

  const teacher = course ? teachers.find((t) => t.id === course.teacherId) : null;
  const hasSpots = course ? course.spotsLeft != null && course.totalSpots != null : false;

  const whatsappHref = course
    ? `https://wa.me/${course.whatsappOverride ?? brand.whatsappNumber}?text=${encodeURIComponent(
        course.isRecorded
          ? `Hola, quiero inscribirme en el curso grabado "${course.name}".`
          : `Hola Foro Legal, quiero inscribirme en el curso "${course.name}" (inicio ${formatDate(course.startDate)}).`
      )}`
    : '#';

  return (
    <AnimatePresence>
      {course && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-paper shadow-soft"
          >
            <div className="sticky top-0 flex items-center justify-between bg-paper/95 backdrop-blur px-6 sm:px-8 py-5 border-b border-ink/8">
              <span className="inline-flex items-center rounded-full bg-navy/10 text-navy text-[11px] font-semibold uppercase tracking-wide px-3 py-1">
                {course.area}
              </span>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                data-cursor-hover
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 sm:px-8 py-6">
              <h2 id="course-modal-title" className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                {course.name}
              </h2>
              <p className="mt-3 text-ink-muted leading-relaxed">{course.description}</p>

              {course.presaleDeadline && (
                <p className="mt-4 inline-flex items-center rounded-full bg-coral/10 text-coral text-xs font-semibold px-3 py-1.5">
                  Preventa hasta el {formatDate(course.presaleDeadline)}
                </p>
              )}

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl bg-cream-dark/60 p-3.5">
                  <Calendar size={16} className="text-navy" />
                  <p className="mt-1.5 text-xs font-semibold text-ink">
                    {course.isRecorded ? 'Acceso inmediato' : formatDate(course.startDate)}
                  </p>
                  <p className="text-[11px] text-ink-muted">{course.isRecorded ? 'Clases grabadas' : 'Fecha de inicio'}</p>
                </div>
                <div className="rounded-xl bg-cream-dark/60 p-3.5">
                  <Clock size={16} className="text-navy" />
                  <p className="mt-1.5 text-xs font-semibold text-ink">{course.duration}</p>
                  <p className="text-[11px] text-ink-muted">{course.sessions} sesiones</p>
                </div>
                <div className="rounded-xl bg-cream-dark/60 p-3.5">
                  <MapPin size={16} className="text-navy" />
                  <p className="mt-1.5 text-xs font-semibold text-ink">{course.modality}</p>
                  <p className="text-[11px] text-ink-muted">Modalidad</p>
                </div>
                {course.rating != null && course.studentsEnrolled != null ? (
                  <div className="rounded-xl bg-cream-dark/60 p-3.5">
                    <Star size={16} className="text-gold fill-gold" />
                    <p className="mt-1.5 text-xs font-semibold text-ink">{course.rating} / 5</p>
                    <p className="text-[11px] text-ink-muted">{course.studentsEnrolled} inscritos</p>
                  </div>
                ) : (
                  hasSpots && (
                    <div className="rounded-xl bg-cream-dark/60 p-3.5">
                      <Calendar size={16} className="text-navy" />
                      <p className="mt-1.5 text-xs font-semibold text-ink">{course.spotsLeft} de {course.totalSpots}</p>
                      <p className="text-[11px] text-ink-muted">Cupos disponibles</p>
                    </div>
                  )
                )}
              </div>

              {teacher && (
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-ink/8 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-cream text-xs font-bold">
                    {teacher.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{teacher.name}</p>
                    <p className="text-xs text-ink-muted">{teacher.role}</p>
                  </div>
                </div>
              )}

              {course.schedule && (
                <div className="mt-6">
                  <h3 className="font-display text-sm font-semibold text-ink uppercase tracking-wide">Programa</h3>
                  <ul className="mt-3 space-y-2">
                    {course.schedule.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-xl bg-cream-dark/60 p-3.5">
                        <div className="shrink-0 w-20 text-xs font-semibold text-navy">{s.date}</div>
                        <div>
                          <p className="text-sm font-semibold text-ink">{s.topic}</p>
                          <p className="text-[11px] text-ink-muted">{s.time} · {s.speaker}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {course.contentModules && (
                <div className="mt-6">
                  <h3 className="font-display text-sm font-semibold text-ink uppercase tracking-wide">Contenido</h3>
                  <ul className="mt-3 space-y-2">
                    {course.contentModules.map((mod, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-xl bg-cream-dark/60 p-3.5">
                        <div className="shrink-0 w-6 text-xs font-semibold text-navy">{String(i + 1).padStart(2, '0')}</div>
                        <p className="text-sm text-ink">{mod}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <h3 className="font-display text-sm font-semibold text-ink uppercase tracking-wide">Incluye</h3>
                <ul className="mt-3 space-y-2">
                  {course.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-ink-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-navy" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {course.pricingTiers && (
                <div className="mt-6">
                  <h3 className="font-display text-sm font-semibold text-ink uppercase tracking-wide">Tarifas</h3>
                  <ul className="mt-3 space-y-2">
                    {course.pricingTiers.map((tier) => (
                      <li
                        key={tier.label}
                        className="flex items-center justify-between rounded-xl bg-cream-dark/60 px-3.5 py-2.5"
                      >
                        <div>
                          <p className="text-sm font-semibold text-ink">{tier.label}</p>
                          {tier.note && <p className="text-[11px] text-ink-muted">{tier.note}</p>}
                        </div>
                        <span className="font-display text-lg font-semibold text-ink">{formatCurrency(tier.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {course.externalSyllabusUrl && (
                <a
                  href={course.externalSyllabusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline underline-offset-4"
                >
                  Ver temario completo <ExternalLink size={14} />
                </a>
              )}

              {course.contactPhones && (
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-ink-muted">
                  {course.contactPhones.map((phone) => (
                    <span key={phone} className="inline-flex items-center gap-1.5">
                      <Phone size={13} /> {phone}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-ink px-6 py-5">
                <div>
                  {course.pricingTiers ? (
                    <span className="text-xs text-cream/50">Desde</span>
                  ) : (
                    course.originalPrice && (
                      <span className="block text-xs text-cream/50 line-through">{formatCurrency(course.originalPrice)}</span>
                    )
                  )}
                  <span className="font-display text-3xl font-semibold text-cream">
                    {formatCurrency(course.pricingTiers ? Math.min(...course.pricingTiers.map((t) => t.price)) : course.price)}
                  </span>
                  {hasSpots && <p className="text-xs text-cream/50 mt-0.5">{course.spotsLeft} cupos disponibles</p>}
                </div>
                <a
                  href={course.externalRegistrationUrl ?? whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-coral text-cream text-sm font-semibold px-6 py-3.5 hover:bg-coral-dark transition-colors"
                >
                  {course.externalRegistrationUrl ? 'Inscribirme' : 'Reservar mi cupo'}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
