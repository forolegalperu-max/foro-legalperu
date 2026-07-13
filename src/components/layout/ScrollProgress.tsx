import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-coral z-[90]"
      style={{ scaleX }}
    />
  );
}
