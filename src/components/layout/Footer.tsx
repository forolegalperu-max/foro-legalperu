import { Mail, MessageCircle } from 'lucide-react';
import { brand, navLinks } from '../../data/site';
import { Logo } from './Logo';
import { InstagramIcon, LinkedInIcon, YoutubeIcon } from '../ui/SocialIcons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream/80">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-2">
            <Logo dark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">{brand.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com/forolegal.pe"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 hover:bg-coral hover:border-coral transition-colors"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href="https://linkedin.com/company/foro-legal"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 hover:bg-coral hover:border-coral transition-colors"
              >
                <LinkedInIcon size={17} />
              </a>
              <a
                href="https://youtube.com/@forolegal"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 hover:bg-coral hover:border-coral transition-colors"
              >
                <YoutubeIcon size={17} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-cream mb-4 uppercase tracking-wide">Navegación</h4>
            <ul className="space-y-2.5 text-sm text-cream/60">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} data-cursor-hover className="hover:text-navy-light transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-cream mb-4 uppercase tracking-wide">Contacto</h4>
            <ul className="space-y-3 text-sm text-cream/60">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <a
                  href={brand.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="hover:text-navy-light transition-colors"
                >
                  {brand.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle size={16} className="mt-0.5 shrink-0" />
                <a
                  href={brand.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="hover:text-navy-light transition-colors"
                >
                  Escríbenos por WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/45">
          <p>
            © {year} {brand.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" data-cursor-hover className="hover:text-navy-light transition-colors">
              Términos y condiciones
            </a>
            <a href="#" data-cursor-hover className="hover:text-navy-light transition-colors">
              Política de privacidad
            </a>
            <a href="#" data-cursor-hover className="hover:text-navy-light transition-colors">
              Libro de reclamaciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
