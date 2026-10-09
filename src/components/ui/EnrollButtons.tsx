import { BookOpenText, FileText, MessageCircle } from 'lucide-react';
import type { Course } from '../../data/courses';
import { courseFormHref, courseWhatsappHref } from '../../lib/whatsapp';

interface EnrollButtonsProps {
  course: Course;
  // Si se pasa, aparece el botón "Temario" y se llama al pulsarlo.
  onSyllabus?: () => void;
}

const base = 'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors';

// Botones pequeños: temario (opcional) + formulario (solo cursos en vivo) + WhatsApp.
export function EnrollButtons({ course, onSyllabus }: EnrollButtonsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {onSyllabus && (
        <button
          type="button"
          onClick={onSyllabus}
          data-cursor-hover
          className={`${base} border border-ink/15 text-ink hover:border-ink/40`}
        >
          <BookOpenText size={12} /> Temario
        </button>
      )}
      {/* Los cursos grabados se inscriben solo por WhatsApp. */}
      {!course.isRecorded && (
        <a
          href={courseFormHref(course)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className={`${base} bg-ink text-cream hover:bg-coral`}
        >
          <FileText size={12} /> Formulario
        </a>
      )}
      <a
        href={courseWhatsappHref(course)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className={`${base} bg-coral text-cream hover:bg-coral-dark`}
      >
        <MessageCircle size={12} /> WhatsApp
      </a>
    </div>
  );
}
