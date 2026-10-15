// ─────────────────────────────────────────────────────────────
// CURSOS — datos ficticios (salvo los marcados como reales).
// Reemplaza nombres, precios, fechas, docentes (por id, ver
// teachers.ts) y beneficios según corresponda.
// ─────────────────────────────────────────────────────────────

import penalistaCover from '../assets/curso-penalista.jpg';
import penalistaTemario from '../assets/temario-penalista.jpg';
import plataformasCover from '../assets/curso-plataformas-judiciales.jpg';
import complianceCover from '../assets/curso-compliance-360.jpg';
import corporativoCover from '../assets/curso-abogado-corporativo.jpeg';
import contratosCover from '../assets/curso-redaccion-contratos.jpg';
import empresarialCover from '../assets/curso-derecho-empresarial.jpg';
import empresarialIICover from '../assets/curso-empresarial-ii.jpg';
import empresarialIITemario from '../assets/temario-empresarial-ii.jpg';
import inmobiliarioCover from '../assets/curso-inmobiliario-contratos.jpg';
import inmobiliarioTemario from '../assets/temario-inmobiliario-contratos.jpg';

export type CourseArea = 'Corporativo' | 'Compliance' | 'Contratos' | 'Práctica Judicial' | 'Penal';

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
  contactPhones?: string[];
  whatsappOverride?: string;
  // true = curso grabado/asíncrono de acceso inmediato (sin fecha de inicio en vivo).
  isRecorded?: boolean;
  // Costo adicional opcional por constancia de participación (solo cursos grabados).
  certificateAddOnPrice?: number;
  // Orden en la portada (menor = primero). Si falta, se ordena por fecha de inicio.
  heroOrder?: number;
  // Formulario de inscripción propio de este curso. Si falta, se usa brand.formUrl (site.ts).
  formUrl?: string;
  // Imagen del temario (se abre ampliada desde la ventana "Temario").
  syllabusImage?: string;
  // Imagen de portada opcional (import desde src/assets). Si falta, se genera una portada con la marca.
  cover?: string;
  // true = solo muestra nombre y área, con una etiqueta "Próximamente" (sin precio, docente ni detalles).
  comingSoon?: boolean;
}

export const courses: Course[] = [
  {
    id: 'ii-derecho-empresarial-gestion-legal',
    heroOrder: 1,
    cover: empresarialIICover,
    syllabusImage: empresarialIITemario,
    name: 'II Curso Práctico en Derecho Empresarial & Gestión Legal de Negocios',
    area: 'Corporativo',
    summary: 'Previene riesgos laborales, negocia contratos empresariales y constituye una empresa con seguridad jurídica, con un enfoque práctico.',
    description:
      'Si quieres emprender, trabajar con empresas o fortalecer tu perfil en el mundo corporativo: en 3 noches de formación aprenderás a prevenir riesgos laborales, negociar contratos empresariales y constituir una empresa con seguridad jurídica, de la mano de especialistas.',
    startDate: '2026-11-17',
    duration: '3 noches',
    modality: 'Online en vivo',
    sessions: 3,
    price: 35,
    currency: 'PEN',
    featured: true,
    level: 'Intermedio',
    benefits: [
      'Acceso a las 3 sesiones en vivo',
      'Grabaciones para repasar las clases',
      'Material autorizado por los ponentes',
      'Bibliografía complementaria',
      'Constancia de participación a nombre de Foro Legal',
      'Formación práctica con especialistas en cada materia',
    ],
    schedule: [
      {
        date: 'Martes 17 de noviembre',
        time: '9:00 p. m. – 10:30 p. m.',
        topic: 'Derecho laboral para empresas y emprendedores: contrata sin riesgos',
        speaker: 'Dr. Lucas Plada',
      },
      {
        date: 'Miércoles 18 de noviembre',
        time: '9:00 p. m. – 10:30 p. m.',
        topic: 'Contratos empresariales y financieros: préstamos, garantías y compraventa de empresas',
        speaker: 'Dr. Gerardo Guzmán',
      },
      {
        date: 'Jueves 19 de noviembre',
        time: '9:00 p. m. – 10:30 p. m.',
        topic: 'Constituye tu empresa de principio a fin: sociedad, minuta, inscripción en SUNARP, actas y poderes',
        speaker: 'Dra. Rosa Milagros Chancafe',
      },
    ],
    pricingTiers: [
      { label: 'Estudiantes', price: 30 },
      { label: 'Público general', price: 35 },
    ],
    externalSyllabusUrl: 'https://canva.link/ihdwjy8sxv9z0iq',
    formUrl: 'https://forms.gle/naVbRg7yPBcJ4SRr6',
    contactPhones: ['+51 946 765 063'],
  },
  {
    id: 'rol-estrategico-abogado-penalista',
    name: 'I Curso Práctico: El Rol Estratégico del Abogado Penalista',
    area: 'Penal',
    summary: 'Conoce cómo piensa y litiga un abogado penalista en cada etapa del proceso: investigación preparatoria, etapa intermedia y juzgamiento.',
    description:
      '¿Quieres conocer cómo piensa y litiga un abogado penalista en cada etapa del proceso? Tres sesiones prácticas grabadas con abogados penalistas en ejercicio, recorriendo la investigación preparatoria, la etapa intermedia y el juzgamiento.',
    cover: penalistaCover,
    syllabusImage: penalistaTemario,
    startDate: '2026-10-14',
    duration: '3 sesiones',
    modality: 'Grabado',
    sessions: 3,
    price: 35,
    currency: 'PEN',
    featured: false,
    level: 'Intermedio',
    isRecorded: true,
    benefits: ['Acceso a las 3 sesiones grabadas', 'Materiales y bibliografía'],
    contentModules: [
      '"Los primeros 120 días: cómo se gana (o se pierde) el caso antes de la acusación" (La Investigación Preparatoria) — Dan Torres & César Escarcena',
      '"La audiencia que nadie te enseñó a litigar: el filtro que decide si hay juicio" (La Etapa Intermedia) — Alex Montes',
      '"Cara a cara con el Juez: litigación oral para ganar en la sala de audiencias" (El Juzgamiento) — Benji Espinoza',
    ],
    externalSyllabusUrl: 'https://canva.link/0n1jnxcnp69nxuq',
    contactPhones: ['+51 946 765 063'],
  },
  {
    id: 'taller-derecho-inmobiliario-contratos',
    heroOrder: 2,
    cover: inmobiliarioCover,
    syllabusImage: inmobiliarioTemario,
    name: 'Taller Práctico: Derecho Inmobiliario y Contratos',
    area: 'Contratos',
    summary: 'Maneja con seguridad los contratos que más se firman: promesa de compraventa, compraventa de inmueble y arrendamiento.',
    description:
      'Aprende a manejar con seguridad los contratos que más se firman en el día a día: promesa de compraventa, compraventa de inmueble y arrendamiento. Un taller 100% práctico con el abogado Iván Palacios, con modelos editables que podrás usar.',
    startDate: '2026-11-04',
    duration: '2 horas',
    modality: 'Online en vivo',
    sessions: 1,
    price: 20,
    currency: 'PEN',
    featured: false,
    level: 'Introductorio',
    benefits: [
      'Grabación de la sesión',
      'Modelos de contratos editables',
      'Material complementario',
      'Constancia de participación a nombre de Foro Legal',
    ],
    schedule: [
      {
        date: 'Miércoles 4 de noviembre',
        time: '8:00 p. m. – 10:00 p. m.',
        topic: 'Taller práctico en vivo por Google Meet, con modelos de contratos editables',
        speaker: 'Iván Palacios',
      },
    ],
    contentModules: [
      'Apertura con un caso real',
      'Promesa de compraventa y arras',
      'Compraventa de inmueble',
      'Arrendamiento',
      'La partida registral',
      'Cláusulas que sirven en cualquier contrato',
      'Preguntas y cierre',
    ],
    externalSyllabusUrl: 'https://canva.link/meh4lmbcu4yl3jm',
    formUrl: 'https://forms.gle/HTVqENr2gnMhhMb2A',
    contactPhones: ['+51 946 765 063'],
  },
  {
    id: 'plataformas-judiciales-registrales',
    cover: plataformasCover,
    name: 'I Curso Práctico de Plataformas Judiciales & Registrales',
    area: 'Práctica Judicial',
    summary: 'Aprende a moverte con seguridad en SINOE, CEJ, SUNARP, Visor BGR, SPIJ y el Tribunal Constitucional, con un enfoque 100% práctico.',
    description:
      'Curso práctico grabado, impartido por especialistas con experiencia en litigación, gestión registral e investigación jurídica. Aprenderás a moverte con seguridad en las plataformas digitales que todo abogado usa desde su primer día: SINOE, CEJ, SUNARP, Visor BGR, SPIJ y el Tribunal Constitucional, con un enfoque 100% práctico y aplicado a casos reales.',
    startDate: '2026-09-25',
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
      '¿Cómo presentar una demanda? + Taller: Lectura de Expediente (SINOE y CEJ) — Fiorella Luna',
      'SUNARP, Visor BGR, Conoce Aquí y Síguelo+ / Taller: ¿Cómo leer una partida? — Manuel Monroe',
      'Investigación Jurídica: SPIJ y Tribunal Constitucional / Taller: Análisis de un caso penal usando SPIJ y TC — César Escarcena',
    ],
    contactPhones: ['+51 946 765 063'],
    whatsappOverride: '51946765063',
    certificateAddOnPrice: 5,
  },
  {
    id: 'compliance-360',
    cover: complianceCover,
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
    cover: corporativoCover,
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
    cover: contratosCover,
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
    cover: empresarialCover,
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

export const courseAreas: CourseArea[] = ['Corporativo', 'Compliance', 'Contratos', 'Práctica Judicial', 'Penal'];
