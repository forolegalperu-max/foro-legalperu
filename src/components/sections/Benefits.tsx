import { Award, Briefcase, FileText, Percent, Users, Video, type LucideIcon } from 'lucide-react';
import { benefits } from '../../data/benefits';
import { Reveal } from '../ui/Reveal';

const iconMap: Record<string, LucideIcon> = {
  certificate: Award,
  video: Video,
  'file-text': FileText,
  briefcase: Briefcase,
  users: Users,
  percent: Percent,
};

export function Benefits() {
  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-navy">Beneficios</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-ink text-balance">
            Todo lo que obtienes al inscribirte
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon];
            return (
              <Reveal key={benefit.id} delay={0.05 * i}>
                <div className="group h-full rounded-2xl bg-paper border border-ink/8 p-5 md:p-6 hover:border-coral/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10 text-navy group-hover:bg-coral group-hover:text-cream transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-semibold text-ink leading-snug">{benefit.title}</h3>
                  <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">{benefit.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
