import { Briefcase, FileSignature, Fingerprint, Landmark, Play, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { Course, CourseArea } from '../../data/courses';

const areaStyle: Record<CourseArea, { gradient: string; Icon: LucideIcon }> = {
  Penal: { gradient: 'from-navy via-navy-light to-coral', Icon: Fingerprint },
  Corporativo: { gradient: 'from-ink via-navy to-navy-light', Icon: Briefcase },
  Compliance: { gradient: 'from-coral-dark via-coral to-coral-light', Icon: ShieldCheck },
  Contratos: { gradient: 'from-navy-light via-navy to-ink', Icon: FileSignature },
  'Práctica Judicial': { gradient: 'from-ink via-navy to-coral-dark', Icon: Landmark },
};

// Portada de un curso: usa `course.cover` si existe; si no, genera una con el color y el
// ícono del área jurídica. `tag` es la etiqueta oscura en la esquina inferior izquierda.
export function CourseCover({ course, tag, className = '' }: { course: Course; tag: string; className?: string }) {
  const { gradient, Icon } = areaStyle[course.area];

  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      {course.cover ? (
        <img
          src={course.cover}
          alt={`Portada: ${course.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className={`relative h-full w-full bg-linear-to-br ${gradient} transition-transform duration-500 group-hover:scale-105`}
          aria-hidden
        >
          <svg className="absolute -right-6 -top-6 h-3/4 text-cream/15" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6">
            {[18, 30, 42, 54].map((r) => (
              <circle key={r} cx="60" cy="40" r={r} />
            ))}
            <path d="M0 78 H100 M0 86 H100 M0 94 H100" />
          </svg>
          <Icon className="absolute right-[14%] top-[22%] h-[34%] w-auto text-cream/90" strokeWidth={1.4} />
          <span className="absolute left-3 top-3 hidden items-center gap-1 sm:inline-flex rounded-full bg-cream/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cream backdrop-blur-sm">
            <Play size={9} fill="currentColor" /> {course.area}
          </span>
        </div>
      )}
      <span className="absolute bottom-0 left-0 max-w-full bg-ink px-2 py-1 text-[10px] font-bold leading-tight text-cream sm:px-3 sm:py-1.5 sm:text-xs">
        {tag}
      </span>
    </div>
  );
}
