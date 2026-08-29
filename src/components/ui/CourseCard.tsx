import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Clock, Sparkles, Star, Users } from 'lucide-react';
import type { Course } from '../../data/courses';
import { teachers } from '../../data/teachers';
import { formatCurrency, formatDate } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CourseCardProps {
  course: Course;
  onOpen: (course: Course) => void;
  index?: number;
}

export function CourseCard({ course, onOpen, index = 0 }: CourseCardProps) {
  const teacher = teachers.find((t) => t.id === course.teacherId);
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const hasSpots = course.spotsLeft != null && course.totalSpots != null;
  const spotsPercentage = hasSpots ? Math.round((course.spotsLeft! / course.totalSpots!) * 100) : 0;
  const lowestTierPrice = course.pricingTiers
    ? Math.min(...course.pricingTiers.map((t) => t.price))
    : course.price;
  const isFeatured = course.featured;

  if (course.comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: index * 0.08 }}
        className="flex flex-col items-start justify-between rounded-3xl border border-dashed border-ink/15 bg-paper/60 p-6 min-h-[220px]"
      >
        <span className="inline-flex items-center rounded-full bg-navy/10 text-navy text-[11px] font-semibold uppercase tracking-wide px-3 py-1">
          {course.area}
        </span>
        <div>
          <h3 className="mt-4 font-display text-xl font-semibold text-ink leading-snug">{course.name}</h3>
          <span className="mt-4 inline-flex items-center rounded-full bg-ink/5 text-ink-muted text-xs font-semibold uppercase tracking-wide px-3 py-1.5">
            Próximamente
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: reducedMotion ? 0 : index * 0.08 }}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`perspective-1000 group relative flex flex-col rounded-3xl border p-6 shadow-card hover:shadow-soft transition-shadow duration-300 ${
        isFeatured ? 'bg-navy border-navy-light/50 shadow-[0_20px_45px_-15px_rgba(28,43,74,0.55)]' : 'bg-paper border-ink/8'
      }`}
    >
      {isFeatured && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-coral text-cream text-[11px] font-bold uppercase tracking-wide px-3.5 py-1.5 shadow-md">
          <Sparkles size={12} /> Curso del mes
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full text-[11px] font-semibold uppercase tracking-wide px-3 py-1 ${
            isFeatured ? 'bg-cream/15 text-cream' : 'bg-navy/10 text-navy'
          }`}
        >
          {course.area}
        </span>
        {course.originalPrice && (
          <span
            className={`inline-flex items-center rounded-full text-[11px] font-semibold px-2.5 py-1 ${
              isFeatured ? 'bg-coral text-cream' : 'bg-navy text-cream'
            }`}
          >
            -{Math.round((1 - course.price / course.originalPrice) * 100)}%
          </span>
        )}
      </div>

      <h3 className={`mt-4 font-display text-xl font-semibold leading-snug ${isFeatured ? 'text-cream' : 'text-ink'}`}>
        {course.name}
      </h3>
      <p className={`mt-2 text-sm leading-relaxed line-clamp-2 ${isFeatured ? 'text-cream/70' : 'text-ink-muted'}`}>
        {course.summary}
      </p>

      <div className={`mt-4 flex items-center gap-2 text-xs ${isFeatured ? 'text-cream/70' : 'text-ink-muted'}`}>
        <Clock size={14} />
        <span>{course.duration}</span>
        <span className={isFeatured ? 'text-cream/30' : 'text-ink/20'}>•</span>
        <span>{course.modality}</span>
      </div>

      {course.rating != null && course.studentsEnrolled != null && (
        <div className={`mt-1 flex items-center gap-2 text-xs ${isFeatured ? 'text-cream/70' : 'text-ink-muted'}`}>
          <Star size={14} className="text-gold fill-gold" />
          <span>{course.rating}</span>
          <span className={isFeatured ? 'text-cream/30' : 'text-ink/20'}>•</span>
          <Users size={14} />
          <span>{course.studentsEnrolled} inscritos</span>
        </div>
      )}

      {teacher && (
        <div className="mt-4 flex items-center gap-2.5">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
              isFeatured ? 'bg-cream text-navy' : 'bg-ink text-cream'
            }`}
          >
            {teacher.initials}
          </span>
          <div>
            <p className={`text-xs font-semibold ${isFeatured ? 'text-cream' : 'text-ink'}`}>{teacher.name}</p>
            <p className={`text-[11px] ${isFeatured ? 'text-cream/60' : 'text-ink-muted'}`}>{teacher.specialty}</p>
          </div>
        </div>
      )}

      <div className={`mt-5 rounded-xl px-3.5 py-2.5 ${isFeatured ? 'bg-cream/10' : 'bg-cream-dark/60'}`}>
        {hasSpots && (
          <>
            <div className={`flex items-center justify-between text-[11px] mb-1.5 ${isFeatured ? 'text-cream/70' : 'text-ink-muted'}`}>
              <span>Cupos disponibles</span>
              <span className={`font-semibold ${isFeatured ? 'text-cream' : 'text-ink'}`}>
                {course.spotsLeft} de {course.totalSpots}
              </span>
            </div>
            <div className={`h-1.5 w-full rounded-full overflow-hidden ${isFeatured ? 'bg-cream/15' : 'bg-ink/10'}`}>
              <div
                className={`h-full rounded-full ${spotsPercentage < 30 ? 'bg-coral' : isFeatured ? 'bg-cream' : 'bg-navy'}`}
                style={{ width: `${100 - spotsPercentage}%` }}
              />
            </div>
          </>
        )}
        <p className={`${hasSpots ? 'mt-1.5' : ''} text-[11px] ${isFeatured ? 'text-cream/70' : 'text-ink-muted'}`}>
          {course.isRecorded ? 'Acceso inmediato · clases grabadas' : `Inicia el ${formatDate(course.startDate)}`}
        </p>
      </div>

      <div className={`mt-5 flex items-center justify-between pt-4 border-t ${isFeatured ? 'border-cream/15' : 'border-ink/8'}`}>
        <div>
          {course.pricingTiers ? (
            <>
              <span className={`block text-[11px] ${isFeatured ? 'text-cream/60' : 'text-ink-muted'}`}>Desde</span>
              <span className={`font-display text-2xl font-semibold ${isFeatured ? 'text-cream' : 'text-ink'}`}>
                {formatCurrency(lowestTierPrice)}
              </span>
            </>
          ) : (
            <>
              {course.originalPrice && (
                <span className={`block text-xs line-through ${isFeatured ? 'text-cream/50' : 'text-ink-muted'}`}>
                  {formatCurrency(course.originalPrice)}
                </span>
              )}
              <span className={`font-display text-2xl font-semibold ${isFeatured ? 'text-cream' : 'text-ink'}`}>
                {formatCurrency(course.price)}
              </span>
              {course.certificateAddOnPrice != null && (
                <span className={`block text-[11px] mt-0.5 ${isFeatured ? 'text-cream/60' : 'text-ink-muted'}`}>
                  +{formatCurrency(course.certificateAddOnPrice)} constancia (opcional)
                </span>
              )}
            </>
          )}
        </div>
        <button
          onClick={() => onOpen(course)}
          data-cursor-hover
          className={`rounded-full text-sm font-semibold px-5 py-2.5 transition-colors duration-300 ${
            isFeatured ? 'bg-coral text-cream hover:bg-coral-dark' : 'bg-ink text-cream group-hover:bg-coral'
          }`}
        >
          Ver curso
        </button>
      </div>
    </motion.div>
  );
}
