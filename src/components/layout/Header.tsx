import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data/site';
import { Logo } from './Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
          mobileOpen
            ? 'bg-ink py-5'
            : scrolled
              ? 'bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(18,19,23,0.08)] py-3'
              : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between">
          <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} data-cursor-hover>
            <Logo dark={mobileOpen} />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                data-cursor-hover
                className="text-sm font-medium text-ink-muted hover:text-ink transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-coral transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="#cursos"
              onClick={(e) => handleNavClick(e, '#cursos')}
              data-cursor-hover
              className="inline-flex items-center rounded-full bg-ink text-cream text-sm font-semibold px-5 py-2.5 hover:bg-coral transition-colors duration-300"
            >
              Inscríbete ahora
            </a>
          </div>

          <button
            className={`lg:hidden p-2 transition-colors ${mobileOpen ? 'text-cream' : 'text-ink'}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] bg-ink lg:hidden"
          >
            <motion.nav
              className="flex flex-col items-start gap-6 px-8 pt-28"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="font-display text-3xl text-cream font-medium"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#cursos"
                onClick={(e) => handleNavClick(e, '#cursos')}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                className="mt-4 inline-flex items-center rounded-full bg-coral text-cream text-base font-semibold px-6 py-3"
              >
                Inscríbete ahora
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
