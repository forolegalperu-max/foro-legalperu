// ─────────────────────────────────────────────────────────────
// BIBLIOTECA VIRTUAL — libros y materiales gratuitos.
// Para agregar un libro, añade un objeto a `libraryBooks` con
// un enlace externo (Google Drive, Canva, etc.) en `fileUrl`.
// ─────────────────────────────────────────────────────────────

export interface LibraryBook {
  id: string;
  title: string;
  author?: string;
  description: string;
  category?: string;
  fileUrl: string;
}

export const libraryBooks: LibraryBook[] = [
  {
    id: 'lo-esencial-del-derecho-pucp',
    title: 'Lo esencial del Derecho',
    author: 'Fondo Editorial PUCP',
    category: 'Colección',
    description:
      'Colección de 68 libros que cubren las principales áreas del Derecho (constitucional, penal, civil, laboral, corporativo y más), publicados por el Fondo Editorial de la PUCP.',
    fileUrl: 'https://drive.google.com/drive/folders/1_FJQcfOwBMDcIxPAGil8h8iPBtHQ1I4W?usp=share_link',
  },
  {
    id: 'mi-primer-juicio-de-familia',
    title: 'Mi primer Juicio de Familia',
    category: 'Familia',
    description: 'Guía práctica para afrontar tu primer proceso judicial en materia de familia.',
    fileUrl: 'https://drive.google.com/file/d/1U85BdfOjH5z9X01xfNL-ULwvwRmMDUTz/view?usp=share_link',
  },
  {
    id: 'guias-practicas-materia-penal',
    title: 'Guías prácticas en materia penal',
    category: 'Penal',
    description: 'Colección de guías prácticas para la actuación en procesos penales.',
    fileUrl: 'https://drive.google.com/drive/folders/1hVETcZ2_qeidkZr77l38U3qCMLabEidu?usp=share_link',
  },
];
