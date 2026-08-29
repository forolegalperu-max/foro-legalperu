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
];
