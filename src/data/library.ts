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

export const libraryBooks: LibraryBook[] = [];
