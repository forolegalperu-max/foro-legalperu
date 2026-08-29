import { BookOpen, Download, LibraryBig } from 'lucide-react';
import { libraryBooks } from '../../data/library';
import { Reveal } from '../ui/Reveal';

export function Library() {
  return (
    <section id="biblioteca" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-navy">Biblioteca virtual</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-ink text-balance">
            Libros y materiales gratuitos
          </h2>
          <p className="mt-4 text-ink-muted text-lg leading-relaxed">
            Descarga materiales de estudio seleccionados por nuestro equipo para complementar tu formación jurídica,
            sin costo.
          </p>
        </Reveal>

        {libraryBooks.length === 0 ? (
          <Reveal delay={0.1} className="mt-14">
            <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-ink/15 bg-paper/60 px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy/10 text-navy">
                <LibraryBig size={24} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-ink">Muy pronto</p>
                <p className="mt-1.5 max-w-sm text-sm text-ink-muted">
                  Estamos preparando la primera selección de libros y materiales gratuitos. Vuelve pronto.
                </p>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryBooks.map((book, i) => (
              <Reveal key={book.id} delay={0.05 * i}>
                <div className="flex h-full flex-col rounded-3xl bg-paper border border-ink/8 p-6 shadow-card hover:shadow-soft transition-shadow duration-300">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <BookOpen size={20} />
                  </span>
                  {book.category && (
                    <span className="mt-4 inline-flex w-fit items-center rounded-full bg-navy/10 text-navy text-[11px] font-semibold uppercase tracking-wide px-3 py-1">
                      {book.category}
                    </span>
                  )}
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink leading-snug">{book.title}</h3>
                  {book.author && <p className="mt-1 text-xs text-ink-muted">{book.author}</p>}
                  <p className="mt-2.5 text-sm text-ink-muted leading-relaxed flex-1">{book.description}</p>
                  <a
                    href={book.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream text-sm font-semibold px-5 py-2.5 hover:bg-coral transition-colors duration-300"
                  >
                    <Download size={16} /> Descargar
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
