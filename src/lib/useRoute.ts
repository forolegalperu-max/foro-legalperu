import { useEffect, useState } from 'react';

// Rutas por hash (#/inscripcion) para no depender de la configuración del hosting.
export const ENROLL_HASH = '#/inscripcion';
export const HOME_HASH = '#/';

export function useIsEnrollPage() {
  const [isEnroll, setIsEnroll] = useState(() => window.location.hash === ENROLL_HASH);

  useEffect(() => {
    const onHash = () => setIsEnroll(window.location.hash === ENROLL_HASH);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return isEnroll;
}
