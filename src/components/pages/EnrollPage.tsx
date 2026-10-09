import { useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, ChevronDown, FileText, MessageCircle, MonitorPlay, Search } from 'lucide-react';
import { courses, type Course } from '../../data/courses';
import { formatCurrency, formatShortDate } from '../../lib/utils';
import { HOME_HASH } from '../../lib/useRoute';
import { courseFormHref, courseWhatsappHref } from '../../lib/whatsapp';
import { CourseCover } from '../ui/CourseCover';
import { Reveal } from '../ui/Reveal';

const enrollable = courses.filter((c) => !c.comingSoon);
const liveCourses = enrollable.filter((c) => !c.isRecorded);
const recordedCourses = enrollable.filter((c) => c.isRecorded);
const recordedFromPrice = recordedCourses.length ? Math.min(...recordedCourses.map((c) => c.price)) : 0;
const certificatePrice = recordedCourses.find((c) => c.certificateAddOnPrice)?.certificateAddOnPrice;

// A partir de cuántos cursos grabados se muestra el buscador.
const SEARCH_THRESHOLD = 6;

// Botones pequeños: formulario (solo cursos en vivo) + WhatsApp.
function EnrollButtons({ course }: { course: Course }) {
  const base =
    'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors';
  return (
    <div className="flex flex-wrap gap-1.5">
      {/* Los cursos grabados se inscriben solo por WhatsApp. */}
      {!course.isRecorded && (
        <a
          href={courseFormHref(course)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className={`${base} bg-ink text-cream hover:bg-coral`}
        >
          <FileText size={12} /> Formulario
        </a>
      )}
      <a
        href={courseWhatsappHref(course)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className={`${base} bg-coral text-cream hover:bg-coral-dark`}
      >
        <MessageCircle size={12} /> WhatsApp
      </a>
    </div>
  );
}

function LiveCourse({ course }: { course: Course }) {
  const lowestPrice = course.pricingTiers ? Math.min(...course.pricingTiers.map((t) => t.price)) : course.price;

  return (
    <article className="flex gap-4 rounded-3xl bg-paper p-3 shadow-card ring-1 ring-ink/5 sm:gap-5 sm:p-4">
      <a
        href={courseWhatsappHref(course)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className="group block w-28 shrink-0 sm:w-36"
        aria-label={`Inscribirme en ${course.name}`}
      >
        <CourseCover course={course} tag="En vivo" className="aspect-[4/5] rounded-2xl" />
      </a>

      <div className="flex min-w-0 flex-1 flex-col py-1">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">{course.name}</h3>

        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} className="text-coral" /> Inicia {formatShortDate(course.startDate)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MonitorPlay size={14} className="text-coral" /> {course.modality} · {course.duration}
          </span>
        </p>

        {course.schedule && (
          <details className="group/sch mt-2 text-xs">
            <summary
              data-cursor-hover
              className="inline-flex cursor-pointer list-none items-center gap-1 font-semibold text-navy hover:underline underline-offset-4"
            >
              Ver cronograma
              <ChevronDown size={13} className="transition-transform group-open/sch:rotate-180" />
            </summary>
            <ol className="mt-2 space-y-2">
              {course.schedule.map((s) => (
                <li key={s.date} className="border-l-2 border-coral/40 pl-3 text-ink-muted">
                  <span className="font-semibold text-ink">{s.date}</span> · {s.time}
                  <span className="block">{s.speaker}</span>
                </li>
              ))}
            </ol>
          </details>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <span className="font-display text-2xl font-semibold text-ink">
            {course.pricingTiers && <span className="mr-1 text-xs font-normal text-ink-muted">desde</span>}
            {formatCurrency(lowestPrice)}
          </span>
          <EnrollButtons course={course} />
        </div>
      </div>
    </article>
  );
}

function RecordedCourse({ course }: { course: Course }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl bg-paper p-2.5 shadow-card ring-1 ring-ink/5 transition-transform duration-300 hover:-translate-y-1">
      <CourseCover course={course} tag="Grabado" className="aspect-[16/10] rounded-xl" />
      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3">
        <h3 className="line-clamp-3 text-sm font-bold leading-snug text-ink">{course.name}</h3>
        <div className="mt-auto space-y-2.5 pt-3">
          <div className="leading-tight">
            <span className="font-display text-lg font-semibold text-ink">{formatCurrency(course.price)}</span>
            {course.certificateAddOnPrice && (
              <span className="ml-1.5 text-[11px] text-ink-muted">+ {formatCurrency(course.certificateAddOnPrice)} constancia</span>
            )}
          </div>
          <EnrollButtons course={course} />
        </div>
      </div>
    </article>
  );
}

export function EnrollPage() {
  const [query, setQuery] = useState('');

  const filteredRecorded = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? recordedCourses.filter((c) => `${c.name} ${c.area}`.toLowerCase().includes(q)) : recordedCourses;
  }, [query]);

  return (
    <div className="bg-cream pb-20 pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <a
          href={HOME_HASH}
          data-cursor-hover
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted transition-colors hover:text-coral"
        >
          <ArrowLeft size={16} /> Volver al inicio
        </a>

        <Reveal className="mt-4 max-w-2xl">
          <h1 className="text-4xl font-semibold text-ink text-balance md:text-5xl">Inscríbete aquí</h1>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            Elige tu curso y te llevamos a WhatsApp con el mensaje de inscripción ya escrito.
          </p>
        </Reveal>

        {liveCourses.length > 0 && (
          <section className="mt-10" aria-labelledby="enroll-live-title">
            <h2 id="enroll-live-title" className="mb-4 text-xs font-bold uppercase tracking-widest text-coral">
              Curso actual
            </h2>
            <div className={`grid gap-4 ${liveCourses.length > 1 ? 'lg:grid-cols-2' : ''}`}>
              {liveCourses.map((course) => (
                <Reveal key={course.id}>
                  <LiveCourse course={course} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {recordedCourses.length > 0 && (
          <section className="mt-12" aria-labelledby="enroll-recorded-title">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 id="enroll-recorded-title" className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                  Clases grabadas
                </h2>
                <span className="rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold text-coral">
                  Desde {formatCurrency(recordedFromPrice)}
                  {certificatePrice ? ` + ${formatCurrency(certificatePrice)} constancia` : ''}
                </span>
              </div>

              {recordedCourses.length > SEARCH_THRESHOLD && (
                <label className="relative w-full sm:w-64">
                  <span className="sr-only">Buscar curso grabado</span>
                  <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar curso…"
                    className="w-full rounded-full border border-ink/10 bg-paper py-2 pl-9 pr-4 text-sm text-ink placeholder:text-ink-muted/70 focus:border-coral focus:outline-none"
                  />
                </label>
              )}
            </div>

            {filteredRecorded.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
                {filteredRecorded.map((course) => (
                  <Reveal key={course.id} className="h-full" y={16}>
                    <RecordedCourse course={course} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="rounded-2xl bg-paper p-6 text-sm text-ink-muted">No encontramos cursos con ese nombre.</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
