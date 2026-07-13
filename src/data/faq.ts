// ─────────────────────────────────────────────────────────────
// PREGUNTAS FRECUENTES
// ─────────────────────────────────────────────────────────────

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'modalidad',
    question: '¿Los cursos son en vivo o grabados?',
    answer:
      'La mayoría de nuestros cursos son online en vivo vía Google Meet, con sesiones interactivas. Todas las clases quedan grabadas y te las enviamos a tu correo para que puedas repasarlas cuando quieras.',
  },
  {
    id: 'constancia',
    question: '¿Obtengo un certificado al finalizar?',
    answer:
      'Emitimos una constancia de participación a nombre de la Sociedad Peruana de Formación y Práctica Jurídica S.A.C., por la cantidad de horas correspondiente a cada curso, al completar el 80% de las sesiones.',
  },
  {
    id: 'grabaciones',
    question: '¿Por cuánto tiempo tengo acceso a las grabaciones?',
    answer:
      'Tienes acceso a las grabaciones y materiales del curso durante 3 meses desde la fecha de finalización del programa.',
  },
  {
    id: 'pagos',
    question: '¿Qué formas de pago aceptan?',
    answer:
      'Solo aceptamos pagos por Yape o Plin, al número +51 956 484 193.',
  },
  {
    id: 'requisitos',
    question: '¿Necesito ser abogado colegiado para inscribirme?',
    answer:
      'No. Nuestros cursos están diseñados para estudiantes de Derecho desde ciclos intermedios, egresados, practicantes y abogados colegiados. Cada curso indica su nivel recomendado.',
  },
  {
    id: 'materiales',
    question: '¿Tengo acceso a materiales descargables?',
    answer:
      'Sí. Cada curso incluye plantillas, modelos de documentos, lecturas y material complementario que te enviamos directo a tu correo.',
  },
];
