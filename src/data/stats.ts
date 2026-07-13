// ─────────────────────────────────────────────────────────────
// ESTADÍSTICAS — cifras centralizadas. Actualiza aquí y se
// reflejan en toda la web (Hero, sección Stats, etc).
// ─────────────────────────────────────────────────────────────

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { id: 'students', value: 200, suffix: '+', label: 'estudiantes formados' },
  { id: 'teachers', value: 10, suffix: '+', label: 'docentes en ejercicio' },
  { id: 'courses', value: 3, suffix: '+', label: 'cursos dictados' },
  { id: 'satisfaction', value: 95, suffix: '%', label: 'satisfacción de alumnos' },
  { id: 'cities', value: 11, suffix: '', label: 'ciudades con alumnos activos' },
];
