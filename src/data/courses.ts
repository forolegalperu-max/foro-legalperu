// ─────────────────────────────────────────────────────────────
// CURSOS — datos ficticios (salvo los marcados como reales).
// Reemplaza nombres, precios, fechas, docentes (por id, ver
// teachers.ts) y beneficios según corresponda.
// ─────────────────────────────────────────────────────────────

export type CourseArea = 'Corporativo' | 'Compliance' | 'Contratos';

export interface ScheduleSession {
  date: string; // texto a mostrar, ej. "29 de julio"
  time: string;
  topic: string;
  speaker: string;
}

export interface PricingTier {
  label: string;
  price: number;
  note?: string;
}

export interface Course {
  id: string;
  name: string;
  area: CourseArea;
  teacherId?: string;
  summary: string;
  description: string;
  startDate: string; // ISO date (fecha de grabación si isRecorded)
  duration: string;
  modality: 'Online en vivo' | 'Híbrido' | 'Presencial' | 'Grabado';
  sessions: number;
  price: number;
  originalPrice?: number;
  currency: 'PEN';
  rating?: number;
  studentsEnrolled?: number;
  totalSpots?: number;
  spotsLeft?: number;
  featured: boolean;
  benefits: string[];
  level: 'Introductorio' | 'Intermedio' | 'Avanzado';
  // Campos opcionales para programas especiales tipo evento (varias
  // sesiones/ponentes, tarifas escalonadas, inscripción externa).
  schedule?: ScheduleSession[];
  contentModules?: string[];
  pricingTiers?: PricingTier[];
  presaleDeadline?: string; // ISO date
  externalSyllabusUrl?: string;
  externalRegistrationUrl?: string;
  contactPhones?: string[];
  whatsappOverride?: string;
  // true = curso grabado/asíncrono de acceso inmediato (sin fecha de inicio en vivo).
  isRecorded?: boolean;
  // true = solo muestra nombre y área, con una etiqueta "Próximamente" (sin precio, docente ni detalles).
  comingSoon?: boolean;
}

export const courses: Course[] = [
  {
    id: 'rol-estrategico-abogado-corporativo',
    name: 'El Rol Estratégico del Abogado Corporativo',
    area: 'Corporativo',
    summary: 'Herramientas para la práctica empresarial: 3 sesiones en vivo sobre derecho societario, contratos y compliance.',
    description:
      'Programa intensivo de tres días dirigido a estudiantes de Derecho, egresados y practicantes que buscan ingresar o fortalecer su perfil en el mundo corporativo jurídico. Incluye una charla de desarrollo profesional y tres módulos especializados dictados por abogados en ejercicio.',
    startDate: '2026-07-29',
    duration: '3 días',
    modality: 'Online en vivo',
    sessions: 4,
    price: 35,
    currency: 'PEN',
    featured: true,
    level: 'Introductorio',
    benefits: [
      'Ingreso a todas las sesiones en vivo',
      'Materiales y libros virtuales',
      'Constancia de participación',
      'Clases grabadas',
    ],
    schedule: [
      { date: '29 de julio', time: '5:00 p.m. – 5:50 p.m.', topic: 'Cómo ingresar al mundo corporativo', speaker: 'Angelo Enciso' },
      { date: '29 de julio', time: '6:00 p.m. – 8:00 p.m.', topic: 'Derecho Societario Aplicado', speaker: 'Gerardo Guzmán' },
      { date: '30 de julio', time: '6:00 p.m. – 8:00 p.m.', topic: 'Contratos Empresariales', speaker: 'Doris Álvaro' },
      { date: '31 de julio', time: '6:00 p.m. – 8:00 p.m.', topic: 'Compliance Corporativo', speaker: 'David Caballero' },
    ],
    pricingTiers: [
      { label: 'Estudiantes', price: 35 },
      { label: 'Público general', price: 45 },
      { label: 'Corporativo', price: 40, note: 'por persona, desde 3 participantes' },
    ],
    presaleDeadline: '2026-07-16',
    externalSyllabusUrl: 'https://canva.link/8w9kix56qrkdtn9',
    externalRegistrationUrl: 'https://forms.gle/3RDVJfubbFzAjpAC6',
    contactPhones: ['+51 982 870 467', '+51 956 484 193'],
  },
  {
    id: 'redaccion-contratos-tipicos',
    name: 'Curso Práctico en Redacción de Contratos Típicos',
    area: 'Contratos',
    summary: 'Aprende a redactar contratos de forma práctica, segura y estratégica: compraventa, arrendamiento, locación de servicios y mutuo.',
    description:
      'Curso 100% práctico sobre redacción contractual, con clases grabadas de acceso inmediato: contrato de compraventa, arrendamiento con cláusula de allanamiento a futuro (desalojo), locación de servicios, mutuo (préstamo de dinero) y las cláusulas estratégicas aplicables a todo contrato.',
    startDate: '2026-06-26',
    duration: '3 módulos',
    modality: 'Grabado',
    sessions: 3,
    price: 15,
    currency: 'PEN',
    featured: false,
    level: 'Introductorio',
    isRecorded: true,
    benefits: ['Clases 100% prácticas', 'Material de estudio', 'Clases grabadas'],
    contentModules: [
      'Introducción a la redacción contractual y elaboración del contrato de compraventa',
      'Contrato de arrendamiento con cláusula de allanamiento a futuro (desalojo) y contrato de locación de servicios',
      'Contrato de mutuo (préstamo de dinero) y cláusulas estratégicas aplicables a todo contrato',
    ],
    contactPhones: ['+51 982 870 467'],
    whatsappOverride: '51982870467',
  },
  {
    id: 'derecho-empresarial-gestion-legal',
    name: 'Curso Práctico en Derecho Empresarial & Gestión Legal de Negocios',
    area: 'Corporativo',
    summary: 'Cómo crear, formalizar y proteger un negocio desde el ámbito legal: constitución de empresas, marcas, contratación laboral y prevención de contingencias.',
    description:
      'En este curso aprenderás de manera práctica cómo crear, formalizar y proteger un negocio desde el ámbito legal. Conocerás sobre constitución de empresas, registro de marcas, contratación laboral y prevención de contingencias legales en materia laboral, todo ello mediante casos reales y ejercicios prácticos que te permitirán desenvolverte con mayor seguridad en el ámbito empresarial y jurídico.',
    startDate: '2026-06-26',
    duration: '4 módulos',
    modality: 'Grabado',
    sessions: 4,
    price: 15,
    currency: 'PEN',
    featured: false,
    level: 'Introductorio',
    isRecorded: true,
    benefits: ['Clases 100% prácticas', 'Material de estudio', 'Clases grabadas'],
    contentModules: [
      'Constitución y formalización de empresas',
      'Registro de marcas y protección de la propiedad intelectual',
      'Contratación laboral',
      'Prevención de contingencias legales en materia laboral',
    ],
    contactPhones: ['+51 982 870 467'],
    whatsappOverride: '51982870467',
  },
  {
    id: 'compliance-corporativo',
    name: 'Compliance Corporativo',
    area: 'Compliance',
    teacherId: 'daniela-ferreyra',
    comingSoon: true,
    summary: 'Diseño e implementación de programas de cumplimiento normativo y prevención de riesgos legales.',
    description:
      'Revisa los fundamentos del compliance en Perú y la región: mapas de riesgo, canales de denuncia, debida diligencia de terceros y responsabilidad administrativa de personas jurídicas.',
    startDate: '2026-09-07',
    duration: '5 semanas',
    modality: 'Online en vivo',
    sessions: 10,
    price: 790,
    currency: 'PEN',
    rating: 4.7,
    studentsEnrolled: 156,
    totalSpots: 40,
    spotsLeft: 22,
    featured: false,
    level: 'Intermedio',
    benefits: ['Plantilla de matriz de riesgos', 'Constancia de participación digital', 'Comunidad privada de compliance'],
  },
];

export const courseAreas: CourseArea[] = ['Corporativo', 'Compliance', 'Contratos'];
