import { MessageCircle } from 'lucide-react';
import { brand } from '../../data/site';
import { stats } from '../../data/stats';
import { Reveal } from '../ui/Reveal';
import { LeadForm } from '../ui/LeadForm';

const studentsStat = stats.find((s) => s.id === 'students')!;

export function CTA() {
  return (
    <section id="cta-final" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-coral/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <Reveal direction="left">
          <span className="text-xs font-semibold uppercase tracking-wide text-navy-light">Empieza hoy</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-cream text-balance leading-tight">
            Da el siguiente paso en tu formación jurídica.
          </h2>
          <p className="mt-5 text-cream/60 text-lg leading-relaxed max-w-md">
            Escríbenos y un asesor académico te ayudará a elegir el curso o programa que mejor se adapta a tu momento
            profesional.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-ink text-sm font-semibold px-6 py-3.5 hover:brightness-95 transition-all"
            >
              <MessageCircle size={18} /> Escríbenos por WhatsApp
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-cream/50 text-xs">
            <span>{brand.city}, {brand.country}</span>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <span>Desde {brand.foundedYear}</span>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <span>+{studentsStat.value.toLocaleString('es-PE')} estudiantes</span>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1} className="rounded-3xl bg-ink-soft border border-cream/10 p-7 md:p-9">
          <h3 className="font-display text-lg font-semibold text-cream">Solicita información</h3>
          <p className="mt-1 text-sm text-cream/50">Te contactamos en menos de 24 horas hábiles.</p>
          <div className="mt-6">
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
