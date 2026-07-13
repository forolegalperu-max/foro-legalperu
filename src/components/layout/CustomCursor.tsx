import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 200, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 200, damping: 30, mass: 0.6 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(isFinePointer && !reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest('a, button, [data-cursor-hover]')));
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden="true">
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-coral"
        style={{
          x: springX,
          y: springY,
          width: 8,
          height: 8,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-ink/40"
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          borderColor: hovering ? 'rgba(255,75,62,0.6)' : 'rgba(18,19,23,0.35)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
