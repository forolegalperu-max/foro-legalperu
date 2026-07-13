import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { brand } from '../../data/site';
import { stats } from '../../data/stats';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import proximoCursoImg from '../../assets/curso-abogado-corporativo.jpeg';

const studentsStat = stats.find((s) => s.id === 'students')!;
const teachersStat = stats.find((s) => s.id === 'teachers')!;

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

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
      {/* background texture */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-coral/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 h-[380px] w-[380px] rounded-full bg-navy/10 blur-3xl pointer-events-none" />

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
              onClick={() => scrollTo('#cta-final')}
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-ink pr-16 sm:pr-0"
          >
            <div>
              <p className="font-display text-2xl font-semibold">
                {studentsStat.value.toLocaleString('es-PE')}
                {studentsStat.suffix}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">{studentsStat.label}</p>
            </div>
            <div className="h-8 w-px bg-ink/10" />
            <div>
              <p className="font-display text-2xl font-semibold">4.8/5</p>
              <p className="text-xs text-ink-muted mt-0.5">satisfacción promedio</p>
            </div>
            <div className="h-8 w-px bg-ink/10" />
            <div>
              <p className="font-display text-2xl font-semibold">
                {teachersStat.value.toLocaleString('es-PE')}
                {teachersStat.suffix}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">{teachersStat.label}</p>
            </div>
          </motion.div>
        </div>

        {/* Visual column */}
        <div className="relative perspective-1000 mx-auto w-full max-w-md">
          <motion.div
            style={reducedMotion ? undefined : { rotateX, rotateY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden shadow-soft"
          >
            <img
              src={proximoCursoImg}
              alt="Próximo curso: El rol estratégico del abogado corporativo, del 29 al 31 de julio, modalidad virtual"
              className="block w-full h-auto"
            />
          </motion.div>

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

          {/* floating badge 2 */}
          <motion.div
            style={reducedMotion ? undefined : { x: badgeX2, y: badgeY2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="absolute -bottom-7 -right-6 rounded-2xl bg-coral text-cream shadow-card px-4 py-3 hidden sm:block"
          >
            <p className="text-[11px] text-cream/80">Próximo inicio</p>
            <p className="font-display text-sm font-semibold">29 de julio</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
