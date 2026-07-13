import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { brand } from '../../data/site';

export function WhatsAppButton() {
  return (
    <motion.a
      href={brand.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[80] flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-soft px-4 py-4 md:px-5 md:py-4"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <MessageCircle size={24} strokeWidth={2} />
      <span className="hidden md:inline text-sm font-semibold pr-1">Escríbenos</span>
    </motion.a>
  );
}
