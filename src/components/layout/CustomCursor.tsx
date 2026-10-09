import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const HOVER_SELECTOR = 'a, button, [data-cursor-hover]';

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const seen = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // El punto sigue al mouse sin retraso; solo el aro se suaviza.
  const ringX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(isFinePointer && !reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    // Por movimiento solo se actualizan los valores de posición (sin re-render de React).
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!seen.current) {
        seen.current = true;
        setVisible(true);
      }
    };
    // El estado "sobre un enlace" solo se recalcula al cambiar de elemento.
    const over = (e: MouseEvent) => setHovering(Boolean((e.target as HTMLElement).closest(HOVER_SELECTOR)));
    const leave = () => {
      seen.current = false;
      setVisible(false);
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-2 w-2 rounded-full bg-coral md:block"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-14 w-14 rounded-full border md:block"
        animate={{
          scale: hovering ? 1 : 0.57,
          borderColor: hovering ? 'rgba(255,75,62,0.6)' : 'rgba(18,19,23,0.35)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
