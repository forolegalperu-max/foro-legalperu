# Foro Legal — Sitio web

Landing page para una plataforma de cursos y formación jurídica práctica (marca ficticia "Foro Legal", Lima, Perú). Construida con React + Vite + TypeScript + Tailwind CSS v4, animada con Framer Motion y GSAP ScrollTrigger.

## Instalación y ejecución

Requiere Node.js 18+ y npm.

```bash
npm install
npm run dev       # entorno de desarrollo, http://localhost:5173
npm run build     # build de producción en /dist
npm run preview   # sirve el build de producción localmente
npm run lint      # oxlint
```

## Estructura del proyecto

```
src/
  data/            ← TODO el contenido editable vive aquí (ver abajo)
  components/
    layout/        ← Header, Footer, WhatsAppButton, ScrollProgress, CustomCursor, Logo
    sections/       ← Una sección de la página por archivo (Hero, CoursesSection, ...)
    ui/             ← Piezas reutilizables (CourseCard, CourseModal, LeadForm, Reveal, ...)
  hooks/            ← useCountUp, useCountdown, useReducedMotion
  lib/utils.ts      ← formateo de moneda, fechas, helpers
```

## Qué archivo editar para cambiar cada cosa

| Quiero cambiar...                                   | Archivo |
|-------------------------------------------------------|---------|
| Nombre de marca, ciudad, teléfono, WhatsApp, email, misión/visión/valores | `src/data/site.ts` |
| Cursos, precios, fechas, cupos, beneficios por curso   | `src/data/courses.ts` |
| Docentes (nombre, foto/iniciales, bio, cursos que dicta) | `src/data/teachers.ts` |
| Testimonios de estudiantes                             | `src/data/testimonials.ts` |
| Estadísticas (número de estudiantes, docentes, etc.)    | `src/data/stats.ts` |
| Preguntas frecuentes                                    | `src/data/faq.ts` |
| Planes y precios (individual, pack, membresía)          | `src/data/pricing.ts` |
| Beneficios generales y pasos de la metodología          | `src/data/benefits.ts` |
| Colores, tipografía, tokens de diseño                   | `src/index.css` (bloque `@theme`) |
| Enlaces del menú / navegación                           | `src/data/site.ts` → `navLinks` |
| SEO (título, descripción, Open Graph)                   | `index.html` |
| Número de WhatsApp usado en todos los botones            | `src/data/site.ts` → `brand.whatsappNumber` |

No es necesario tocar los componentes para actualizar contenido: todo texto, precio, fecha o dato de contacto vive en `src/data/*.ts`.

## Formularios e integraciones pendientes

- `src/components/ui/LeadForm.tsx` simula el envío (usa `setTimeout`). El punto de integración con tu backend/CRM está marcado con un comentario `TODO` dentro del `handleSubmit`.
- Los botones de "Inscribirme" / "Reservar cupo" abren WhatsApp con un mensaje pre-rellenado (`wa.me`). No hay pasarela de pago real conectada; los componentes de precios (`Pricing.tsx`, `CourseModal.tsx`) están listos para enlazar a un checkout cuando lo definas.

## Accesibilidad y rendimiento

- Respeta `prefers-reduced-motion`: todas las animaciones (Framer Motion, GSAP, cursor personalizado) se desactivan o reducen automáticamente.
- Navegación por teclado: enlace "Saltar al contenido principal", focus visible en todos los elementos interactivos.
- Diseño mobile-first, probado en 375px, 768px y 1440px+.
