import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, ZoomIn } from 'lucide-react';
import { brand } from '../../data/site';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { courses, type Course } from '../../data/courses';
import { Lightbox } from '../ui/Lightbox';

// Cursos en vivo con flyer. Orden: `heroOrder` (courses.ts) y, si no hay, fecha de inicio. Se muestran los dos primeros.
const featured = courses
  .filter((c) => !c.isRecorded && !c.comingSoon && c.cover)
  .sort((a, b) => (a.heroOrder ?? 99) - (b.heroOrder ?? 99) || a.startDate.localeCompare(b.startDate))
  .slice(0, 2);

const coverAlt = (course: Course) => `Flyer: ${course.name}`;
const syllabusAlt = (course: Course) => `Temario: ${course.name}`;
const formatDay = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('es-PE', { day: 'numeric', month: 'long' });

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [frontIndex, setFrontIndex] = useState(0);
  const front = featured[frontIndex];
  const stacked = featured.length > 1;
  const back = stacked ? featured[(frontIndex + 1) % featured.length] : null;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
  const badgeX = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 100, damping: 18 });
  const badgeY = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 100, damping: 18 });
  const badgeX2 = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), { stiffness: 100, damping: 18 });
  const badgeY2 = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="inicio"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-cream pt-32 pb-20 md:pt-44 md:pb-28"
    >
      {/* Brillos de fondo: degradados radiales (más livianos que blur, sobre todo en Safari). */}
      <div className="absolute -top-56 -right-56 h-[760px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(255,75,62,0.13),rgba(255,75,62,0))] pointer-events-none" />
      <div className="absolute top-1/4 -left-52 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(28,43,74,0.11),rgba(28,43,74,0))] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        {/* Text column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted"
          >
            <Sparkles size={14} className="text-navy" />
            Formación jurídica práctica · {brand.city}, {brand.country}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-balance text-5xl sm:text-6xl lg:text-[4.2rem] font-semibold leading-[1.02] text-ink"
          >
            Aprende Derecho
            <br />
            con quienes lo <span className="relative inline-block text-navy">
              ejercen
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 7 Q 50 1, 100 6 T 198 5"
                  stroke="#1C2B4A"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.9, ease: 'easeInOut' }}
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted"
          >
            Cursos, talleres y programas prácticos para estudiantes de Derecho, egresados,
            practicantes y abogados que quieren destacar en el ejercicio profesional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollTo('#cursos')}
              data-cursor-hover
              className="group inline-flex items-center gap-2 rounded-full bg-coral text-cream text-sm font-semibold px-6 py-3.5 shadow-[0_10px_30px_-8px_rgba(255,75,62,0.55)] transition-transform hover:-translate-y-0.5"
            >
              Inscríbete ahora
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('#cursos')}
              data-cursor-hover
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 text-ink text-sm font-semibold px-6 py-3.5 hover:border-ink/40 transition-colors"
            >
              Explorar cursos
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        {/* Visual column: flyers de los cursos en vivo, apilados (el de atrás pasa al frente al pulsarlo) */}
        {front && (
          <div className="relative perspective-1000 mx-auto w-full max-w-md">
            <motion.div
              style={reducedMotion ? undefined : { rotateX, rotateY }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative aspect-[4/5] w-full"
            >
              {featured.map((course, i) => {
                const isFront = i === frontIndex;
                return (
                  <motion.button
                    key={course.id}
                    type="button"
                    onClick={() =>
                      isFront ? setLightbox({ src: course.cover!, alt: coverAlt(course) }) : setFrontIndex(i)
                    }
                    animate={
                      isFront
                        ? { x: '0%', y: '0%', rotate: stacked ? -2 : 0, scale: 1 }
                        : { x: '24%', y: '-14%', rotate: 6, scale: 0.95 }
                    }
                    whileHover={isFront || reducedMotion ? undefined : { x: '30%', rotate: 8 }}
                    transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ zIndex: isFront ? 2 : 1 }}
                    className={`group absolute left-0 block overflow-hidden rounded-3xl text-left ${
                      stacked ? 'top-[18%] w-[78%]' : 'top-0 w-full'
                    } ${isFront ? 'cursor-zoom-in shadow-soft' : 'shadow-card'}`}
                    aria-label={isFront ? `Ampliar imagen de ${course.name}` : `Mostrar ${course.name}`}
                    data-cursor-hover
                  >
                    <img src={course.cover} alt={coverAlt(course)} className="block h-auto w-full" />
                    {isFront && (
                      <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30">
                        <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                          <ZoomIn size={18} />
                        </span>
                      </span>
                    )}
                  </motion.button>
                );
              })}

              {back && (
                <button
                  type="button"
                  onClick={() => setFrontIndex((frontIndex + 1) % featured.length)}
                  data-cursor-hover
                  className="absolute right-0 top-0 z-[3] flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-cream shadow-card transition-colors hover:bg-coral"
                >
                  Otro curso · {formatDay(back.startDate)}
                  <ArrowRight size={13} />
                </button>
              )}
            </motion.div>

            {stacked && (
              <div className="mt-6 flex items-center justify-center gap-1">
                {featured.map((course, i) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => setFrontIndex(i)}
                    aria-label={`Ver ${course.name}`}
                    aria-pressed={i === frontIndex}
                    data-cursor-hover
                    className="p-1.5"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        i === frontIndex ? 'w-6 bg-coral' : 'w-2 bg-ink/20'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
            {stacked && (
              <p className="mt-1 text-center text-xs text-ink-muted">{featured.length} cursos abiertos · toca el de atrás para verlo</p>
            )}

            {/* temario thumbnail — mobile (inline, below the images) */}
            {front.syllabusImage && (
              <button
                type="button"
                onClick={() => setLightbox({ src: front.syllabusImage!, alt: syllabusAlt(front) })}
                data-cursor-hover
                className="group mt-4 flex w-full items-center gap-3 rounded-2xl bg-paper p-2.5 shadow-card sm:hidden"
              >
                <span className="block h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <img src={front.syllabusImage} alt={syllabusAlt(front)} className="block h-full w-full object-cover" />
                </span>
                <span className="flex flex-1 items-center justify-between">
                  <span className="text-left">
                    <span className="block text-xs font-semibold text-ink">Ver temario completo</span>
                    <span className="block text-[11px] text-ink-muted">{front.name}</span>
                  </span>
                  <ZoomIn size={16} className="mr-1.5 shrink-0 text-ink-muted" />
                </span>
              </button>
            )}

            {/* floating badge 1 */}
            <motion.div
              style={reducedMotion ? undefined : { x: badgeX, y: badgeY }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute -top-6 -left-8 rounded-2xl bg-paper shadow-card px-4 py-3 hidden sm:block"
            >
              <p className="text-[11px] text-ink-muted">Constancia</p>
              <p className="font-display text-sm font-semibold text-ink">De participación ✓</p>
            </motion.div>

            {/* floating badge 2: fecha del curso que está al frente */}
            <motion.div
              style={reducedMotion ? undefined : { x: badgeX2, y: badgeY2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="absolute -bottom-7 -right-6 rounded-2xl bg-coral text-cream shadow-card px-4 py-3 hidden sm:block"
            >
              <p className="text-[11px] text-cream/80">Inicio</p>
              <p className="font-display text-sm font-semibold">{formatDay(front.startDate)}</p>
            </motion.div>

            {/* temario thumbnail */}
            {front.syllabusImage && (
              <motion.button
                key={front.id}
                type="button"
                onClick={() => setLightbox({ src: front.syllabusImage!, alt: syllabusAlt(front) })}
                data-cursor-hover
                initial={{ opacity: 0, y: 10, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                whileHover={{ rotate: 0, scale: 1.04 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="group absolute bottom-20 -left-10 z-[3] hidden sm:block w-24 overflow-hidden rounded-xl bg-paper p-1 shadow-card"
              >
                <img src={front.syllabusImage} alt={syllabusAlt(front)} className="block w-full h-auto rounded-lg" />
                <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-ink/0 group-hover:bg-ink/40 transition-colors duration-300">
                  <span className="text-[10px] font-semibold text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver temario
                  </span>
                </span>
              </motion.button>
            )}
          </div>
        )}
      </div>

      <Lightbox src={lightbox?.src ?? null} alt={lightbox?.alt ?? ''} onClose={() => setLightbox(null)} />
    </section>
  );
}
