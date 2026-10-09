import type { Course } from '../data/courses';
import { brand } from '../data/site';
import { formatCurrency, formatDate } from './utils';

// Mensaje prefijado de inscripción por curso. Edita aquí el texto.
export function courseWhatsappMessage(course: Course) {
  if (course.isRecorded) {
    const cert = course.certificateAddOnPrice ? ` (con constancia opcional +${formatCurrency(course.certificateAddOnPrice)})` : '';
    return `Hola Foro Legal, quiero inscribirme en el curso grabado "${course.name}" por ${formatCurrency(course.price)}${cert}.`;
  }
  return `Hola Foro Legal, quiero inscribirme en el curso "${course.name}" (inicio ${formatDate(course.startDate)}).`;
}

export function courseWhatsappHref(course: Course) {
  return `https://wa.me/${course.whatsappOverride ?? brand.whatsappNumber}?text=${encodeURIComponent(courseWhatsappMessage(course))}`;
}

export function courseFormHref(course: Course) {
  return course.formUrl ?? brand.formUrl;
}
