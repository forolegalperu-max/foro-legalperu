import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  once?: boolean;
}

export function Reveal({ children, className, delay = 0, y = 28, direction = 'up', once = true }: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset =
    direction === 'up' ? { y } : direction === 'left' ? { x: -y } : direction === 'right' ? { x: y } : {};

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
