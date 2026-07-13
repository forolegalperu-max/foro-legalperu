// ─────────────────────────────────────────────────────────────
// DATOS EDITABLES DE LA MARCA
// Modifica este archivo para cambiar nombre, ciudad, contacto,
// misión, visión, valores y enlaces de navegación.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: 'Foro Legal',
  shortName: 'Foro',
  tagline: 'Aprende Derecho con quienes lo ejercen.',
  description:
    'Cursos, talleres y programas de formación jurídica práctica para estudiantes de Derecho, egresados y abogados que quieren destacar en el ejercicio profesional.',
  city: 'Lima',
  country: 'Perú',
  foundedYear: 2019,
  email: 'forolegalperu@gmail.com',
  // Todo contacto general (WhatsApp, botón flotante, footer) redirige aquí.
  whatsappLink: 'https://wa.link/lm3231',
  whatsappNumber: '51987654321',
  paymentWhatsapp: '+51 956 484 193',
};

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Preguntas frecuentes', href: '#faq' },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/forolegal.pe' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/foro-legal' },
  { label: 'TikTok', href: 'https://tiktok.com/@forolegal' },
  { label: 'YouTube', href: 'https://youtube.com/@forolegal' },
];

export const missionVisionValues = {
  history:
    'Foro Legal nació en 2019 en Lima, cuando un grupo de abogados litigantes y docentes universitarios notó una brecha entre lo que se enseña en las aulas y lo que exige el ejercicio real de la profesión. Empezamos con un taller de redacción de contratos para 30 estudiantes en un auditorio prestado. Hoy somos una comunidad jurídica con presencia en más de 10 ciudades de Latinoamérica.',
  mission:
    'Formar profesionales del Derecho con criterio práctico, mediante programas dictados por quienes ejercen la profesión día a día, combinando rigor académico con casos reales del ejercicio legal.',
  vision:
    'Ser la comunidad de formación jurídica práctica de referencia en Latinoamérica, reconocida por conectar la teoría legal con el desempeño real en estudios, empresas e instituciones públicas.',
  values: [
    {
      title: 'Práctica sobre teoría',
      description: 'Enseñamos con casos, expedientes y situaciones reales del ejercicio profesional.',
    },
    {
      title: 'Docentes en ejercicio',
      description: 'Quienes enseñan, litigan, asesoran o trabajan activamente en el rubro que dictan.',
    },
    {
      title: 'Comunidad, no solo cursos',
      description: 'Construimos una red profesional que se mantiene activa después de cada programa.',
    },
    {
      title: 'Accesibilidad real',
      description: 'Modalidades y precios pensados para estudiantes, no solo para grandes estudios.',
    },
  ],
};
