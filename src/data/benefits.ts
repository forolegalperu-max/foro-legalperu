// ─────────────────────────────────────────────────────────────
// BENEFICIOS
// ─────────────────────────────────────────────────────────────

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: 'certificate' | 'video' | 'file-text' | 'briefcase' | 'users' | 'percent';
}

export const benefits: Benefit[] = [
  {
    id: 'constancia',
    title: 'Constancia de participación',
    description: 'Con respaldo de Foro Legal, lista para tu CV o LinkedIn.',
    icon: 'certificate',
  },
  {
    id: 'grabaciones',
    title: 'Grabaciones por 3 meses',
    description: 'Recibe la grabación de cada sesión directo en tu correo para repasarla cuando quieras.',
    icon: 'video',
  },
  {
    id: 'material',
    title: 'Material descargable',
    description: 'Plantillas, modelos de documentos y lecturas seleccionadas por cada docente.',
    icon: 'file-text',
  },
  {
    id: 'casos',
    title: 'Casos prácticos reales',
    description: 'Expedientes, contratos y situaciones anonimizadas del ejercicio profesional.',
    icon: 'briefcase',
  },
  {
    id: 'networking',
    title: 'Networking jurídico',
    description: 'Conecta con otros estudiantes, egresados y abogados de toda la región.',
    icon: 'users',
  },
  {
    id: 'descuentos',
    title: 'Descuentos por volumen',
    description: 'Packs y membresía con precios preferentes para estudiantes.',
    icon: 'percent',
  },
];
