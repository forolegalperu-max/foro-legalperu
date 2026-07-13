// ─────────────────────────────────────────────────────────────
// DOCENTES — datos ficticios. Reemplaza por el equipo real.
// ─────────────────────────────────────────────────────────────

export interface Teacher {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  institution: string;
  experience: string;
  initials: string;
  accent: 'coral' | 'navy' | 'gold';
  courseIds: string[];
}

export const teachers: Teacher[] = [
  {
    id: 'daniela-ferreyra',
    name: 'Daniela Ferreyra Luque',
    role: 'Head of Compliance, Grupo Andino',
    specialty: 'Compliance Corporativo y Prevención de Riesgos',
    bio: 'Diseña e implementa programas de cumplimiento normativo para empresas del sector financiero e industrial en la región andina.',
    institution: 'Universidad del Pacífico',
    experience: '9+ años',
    initials: 'DF',
    accent: 'gold',
    courseIds: ['compliance-corporativo'],
  },
];
