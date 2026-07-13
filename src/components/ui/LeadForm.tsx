import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { courseAreas } from '../../data/courses';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
}

const initialState: FormState = { name: '', email: '', phone: '', area: '', message: '' };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = 'Cuéntanos tu nombre completo.';
    if (!isValidEmail(form.email)) next.email = 'Ingresa un correo válido.';
    if (form.phone && !/^[0-9+\s]{6,15}$/.test(form.phone)) next.phone = 'Ingresa un teléfono válido.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      // TODO: integrar con endpoint real (CRM / Google Sheets / email marketing).
      // Ejemplo: await fetch('/api/leads', { method: 'POST', body: JSON.stringify(form) })
      await new Promise((resolve) => setTimeout(resolve, 1100));
      setStatus('success');
      setForm(initialState);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center h-full py-10"
      >
        <CheckCircle2 size={44} className="text-navy-light" />
        <h3 className="mt-4 font-display text-xl font-semibold text-cream">¡Listo, recibimos tus datos!</h3>
        <p className="mt-2 text-sm text-cream/60 max-w-xs">
          Un asesor de Foro Legal se comunicará contigo en menos de 24 horas hábiles.
        </p>
        <button
          onClick={() => setStatus('idle')}
          data-cursor-hover
          className="mt-6 text-xs font-semibold text-navy-light underline underline-offset-4"
        >
          Enviar otra consulta
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="lead-name" className="block text-xs font-semibold text-cream/70 mb-1.5">
          Nombre completo
        </label>
        <input
          id="lead-name"
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className="w-full rounded-xl bg-cream/5 border border-cream/15 px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-coral transition-colors"
          placeholder="Tu nombre y apellido"
          autoComplete="name"
        />
        {errors.name && <p className="mt-1 text-xs text-coral-light">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="lead-email" className="block text-xs font-semibold text-cream/70 mb-1.5">
          Correo electrónico
        </label>
        <input
          id="lead-email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          className="w-full rounded-xl bg-cream/5 border border-cream/15 px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-coral transition-colors"
          placeholder="tucorreo@ejemplo.com"
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-coral-light">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-phone" className="block text-xs font-semibold text-cream/70 mb-1.5">
            Teléfono (opcional)
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="w-full rounded-xl bg-cream/5 border border-cream/15 px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-coral transition-colors"
            placeholder="+51 987 654 321"
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1 text-xs text-coral-light">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="lead-area" className="block text-xs font-semibold text-cream/70 mb-1.5">
            Área de interés
          </label>
          <select
            id="lead-area"
            value={form.area}
            onChange={(e) => update('area', e.target.value)}
            className="w-full rounded-xl bg-cream/5 border border-cream/15 px-4 py-3 text-sm text-cream outline-none focus:border-coral transition-colors"
          >
            <option value="" className="text-ink">Elige un área</option>
            {courseAreas.map((area) => (
              <option key={area} value={area} className="text-ink">
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="lead-message" className="block text-xs font-semibold text-cream/70 mb-1.5">
          Mensaje (opcional)
        </label>
        <textarea
          id="lead-message"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          rows={3}
          className="w-full rounded-xl bg-cream/5 border border-cream/15 px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-coral transition-colors resize-none"
          placeholder="Cuéntanos qué te gustaría aprender"
        />
      </div>

      {status === 'error' && (
        <p className="text-xs text-coral-light">Ocurrió un problema al enviar tu solicitud. Inténtalo nuevamente.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        data-cursor-hover
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-coral text-cream text-sm font-semibold px-6 py-3.5 hover:bg-coral-dark transition-colors disabled:opacity-70"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Enviando...
          </>
        ) : (
          <>
            Quiero más información <Send size={15} />
          </>
        )}
      </button>
      <p className="text-[11px] text-cream/40 text-center">
        Al enviar aceptas nuestra política de privacidad. No compartimos tus datos con terceros.
      </p>
    </form>
  );
}
