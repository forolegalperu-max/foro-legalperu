import { MessageCircle } from 'lucide-react';
import { brand } from '../../data/site';
import { stats } from '../../data/stats';
import { Reveal } from '../ui/Reveal';

const studentsStat = stats.find((s) => s.id === 'students')!;

export function CTA() {
  return (
    <section id="cta-final" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-coral/10 blur-3xl" />
      <div className="relative mx-auto max-w-2xl px-5 md:px-8 text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wide text-navy-light">Empieza hoy</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-cream text-balance leading-tight">
            Da el siguiente paso en tu formación jurídica.
          </h2>
          <p className="mt-5 text-cream/60 text-lg leading-relaxed mx-auto max-w-md">
            Escríbenos y un asesor académico te ayudará a elegir el curso o programa que mejor se adapta a tu momento
            profesional.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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

          <div className="mt-10 flex items-center justify-center gap-6 text-cream/50 text-xs">
            <span>{brand.city}, {brand.country}</span>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <span>Desde {brand.foundedYear}</span>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <span>+{studentsStat.value.toLocaleString('es-PE')} estudiantes</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
