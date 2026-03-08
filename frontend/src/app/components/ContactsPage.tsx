import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { ContactForm } from "./ContactForm";

export function ContactsPage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden pt-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 text-gray-300 hover:text-[#DC143C] transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Вернуться на главную</span>
        </motion.button>
        <ContactForm />
      </div>
    </motion.div>
  );
}
