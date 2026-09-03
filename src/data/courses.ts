// ─────────────────────────────────────────────────────────────
// CURSOS — datos ficticios (salvo los marcados como reales).
// Reemplaza nombres, precios, fechas, docentes (por id, ver
// teachers.ts) y beneficios según corresponda.
// ─────────────────────────────────────────────────────────────

export type CourseArea = 'Corporativo' | 'Compliance' | 'Contratos' | 'Práctica Judicial';

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
  // Tarifas aplicables después de vencer la preventa (mismo formato que pricingTiers).
  regularPricingTiers?: PricingTier[];
  presaleDeadline?: string; // ISO date
  externalSyllabusUrl?: string;
  externalRegistrationUrl?: string;
  contactPhones?: string[];
  whatsappOverride?: string;
  // true = curso grabado/asíncrono de acceso inmediato (sin fecha de inicio en vivo).
  isRecorded?: boolean;
  // Costo adicional opcional por constancia de participación (solo cursos grabados).
  certificateAddOnPrice?: number;
  // true = solo muestra nombre y área, con una etiqueta "Próximamente" (sin precio, docente ni detalles).
  comingSoon?: boolean;
}

export const courses: Course[] = [
  {
    id: 'plataformas-judiciales-registrales',
    name: 'I Curso Práctico de Plataformas Judiciales & Registrales',
    area: 'Práctica Judicial',
    summary: 'Aprende a moverte con seguridad en SINOE, CEJ, SUNARP, Visor BGR, SPIJ y el Tribunal Constitucional, con un enfoque 100% práctico.',
    description:
      'Fortalece tu perfil profesional con un curso práctico impartido por especialistas con experiencia en litigación, gestión registral e investigación jurídica. Aprenderás a moverte con seguridad en las plataformas digitales que todo abogado usa desde su primer día: SINOE, CEJ, SUNARP, Visor BGR, SPIJ y el Tribunal Constitucional, con un enfoque 100% práctico y aplicado a casos reales.',
    startDate: '2026-09-25',
    duration: '2 días',
    modality: 'Online en vivo',
    sessions: 3,
    price: 40,
    currency: 'PEN',
    featured: true,
    level: 'Introductorio',
    benefits: [
      'Acceso a las 3 sesiones en vivo y sus grabaciones',
      'Material autorizado por los ponentes',
      'Bibliografía complementaria',
      'Constancia de participación',
    ],
    schedule: [
      {
        date: '25 de setiembre',
        time: '6:00 p.m. – 8:00 p.m.',
        topic: '¿Cómo presentar una demanda? + Taller: Lectura de Expediente (SINOE y CEJ)',
        speaker: 'Fiorella Luna',
      },
      {
        date: '26 de setiembre',
        time: '6:00 p.m. – 7:50 p.m.',
        topic: 'SUNARP, Visor BGR, Conoce Aquí y Síguelo+ / Taller: ¿Cómo leer una partida?',
        speaker: 'Manuel Monroe',
      },
      {
        date: '26 de setiembre',
        time: '8:00 p.m. – 9:30 p.m.',
        topic: 'Investigación Jurídica: SPIJ y Tribunal Constitucional / Taller: Análisis de un caso penal usando SPIJ y TC',
        speaker: 'César Escarcena',
      },
    ],
    pricingTiers: [
      { label: 'Estudiantes', price: 40 },
      { label: 'Público general', price: 60 },
      { label: 'Corporativo', price: 55, note: 'desde 3 participantes' },
    ],
    regularPricingTiers: [
      { label: 'Estudiantes', price: 50 },
      { label: 'Público general', price: 70 },
      { label: 'Corporativo', price: 65, note: 'desde 3 participantes' },
    ],
    presaleDeadline: '2026-09-15',
    externalSyllabusUrl: 'https://canva.link/m30u7hiim8vqj97',
    contactPhones: ['+51 946 765 063'],
  },
  {
    id: 'compliance-360',
    name: 'Compliance 360°: Gestión Antisoborno, SPLAFT y Protección de Datos',
    area: 'Compliance',
    summary: 'Curso práctico grabado: sistemas de gestión antisoborno, SPLAFT y protección de datos personales.',
    description:
      'Fortalece tu perfil profesional con un curso práctico grabado, dictado por especialistas con amplia experiencia en Compliance, gestión de riesgos y derecho corporativo. Tres módulos sobre sistemas de gestión de compliance, prevención de lavado de activos (SPLAFT) y protección de datos personales.',
    startDate: '2026-08-27',
    duration: '3 módulos',
    modality: 'Grabado',
    sessions: 3,
    price: 45,
    currency: 'PEN',
    featured: false,
    level: 'Intermedio',
    isRecorded: true,
    benefits: ['Clases 100% prácticas', 'Material de estudio', 'Clases grabadas'],
    contentModules: [
      'Sistemas de Gestión de Compliance — David Caballero',
      'SPLAFT (Prevención de Lavado de Activos) — Carlos Hermoza',
      'Protección de Datos Personales — Jeampier Aquino',
    ],
    contactPhones: ['+51 946 765 063'],
    whatsappOverride: '51946765063',
    certificateAddOnPrice: 5,
  },
  {
    id: 'rol-estrategico-abogado-corporativo',
    name: 'El Rol Estratégico del Abogado Corporativo',
    area: 'Corporativo',
    summary: 'Herramientas para la práctica empresarial: derecho societario, contratos y compliance corporativo, ahora en clases grabadas.',
    description:
      'Programa grabado dirigido a estudiantes de Derecho, egresados y practicantes que buscan ingresar o fortalecer su perfil en el mundo corporativo jurídico. Incluye una charla de desarrollo profesional y tres módulos especializados dictados por abogados en ejercicio.',
    startDate: '2026-07-29',
    duration: '4 módulos',
    modality: 'Grabado',
    sessions: 4,
    price: 20,
    currency: 'PEN',
    featured: false,
    level: 'Introductorio',
    isRecorded: true,
    benefits: ['Clases 100% prácticas', 'Material de estudio', 'Clases grabadas'],
    contentModules: [
      'Cómo ingresar al mundo corporativo — Angelo Enciso',
      'Derecho Societario Aplicado — Gerardo Guzmán',
      'Contratos Empresariales — Doris Álvaro',
      'Compliance Corporativo — David Caballero',
    ],
    contactPhones: ['+51 946 765 063'],
    whatsappOverride: '51946765063',
    certificateAddOnPrice: 5,
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
    price: 20,
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
    contactPhones: ['+51 946 765 063'],
    whatsappOverride: '51946765063',
    certificateAddOnPrice: 5,
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
    price: 20,
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
    contactPhones: ['+51 946 765 063'],
    whatsappOverride: '51946765063',
    certificateAddOnPrice: 5,
  },
];

export const courseAreas: CourseArea[] = ['Corporativo', 'Compliance', 'Contratos', 'Práctica Judicial'];
