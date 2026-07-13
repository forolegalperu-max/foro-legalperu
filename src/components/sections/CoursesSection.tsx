import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { courses, courseAreas, type Course } from '../../data/courses';
import { CourseCard } from '../ui/CourseCard';
import { CourseModal } from '../ui/CourseModal';
import { Reveal } from '../ui/Reveal';

export function CoursesSection() {
  const [query, setQuery] = useState('');
  const [activeArea, setActiveArea] = useState<string>('Todos');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesArea = activeArea === 'Todos' || course.area === activeArea;
      const matchesQuery =
        query.trim() === '' ||
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.area.toLowerCase().includes(query.toLowerCase());
      return matchesArea && matchesQuery;
    });
  }, [query, activeArea]);

  return (
    <section id="cursos" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-navy">Nuestros cursos</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-ink text-balance">
            Programas diseñados por quienes ejercen el Derecho
          </h2>
          <p className="mt-4 text-ink-muted text-lg leading-relaxed">
            Elige el área que quieres fortalecer. Todos nuestros cursos combinan clases en vivo, casos reales y
            constancia de participación.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {['Todos', ...courseAreas].map((area) => (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                data-cursor-hover
                aria-pressed={activeArea === area}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  activeArea === area
                    ? 'bg-ink text-cream'
                    : 'bg-paper text-ink-muted border border-ink/10 hover:border-ink/30'
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar curso..."
              aria-label="Buscar curso"
              className="w-full rounded-full border border-ink/10 bg-paper py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted/70 focus:border-coral outline-none transition-colors"
            />
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-ink-muted">No encontramos cursos que coincidan con tu búsqueda.</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} onOpen={setSelectedCourse} index={i} />
            ))}
          </div>
        )}
      </div>

      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </section>
  );
}
