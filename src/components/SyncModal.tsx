import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, ExternalLink } from "lucide-react";

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SyncModal({ isOpen, onClose }: SyncModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#18181B] border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl"
          >
            <AlertTriangle className="w-12 h-12 text-amber-400 mb-6 mx-auto" />
            <h2 className="text-2xl font-bold text-white mb-4 text-center">TikTok synchronise vos données</h2>
            <p className="text-slate-400 mb-8 text-center">
              Cela peut prendre quelques minutes en mode Sandbox. En attendant, découvrez nos guides de croissance.
            </p>
            <div className="flex flex-col gap-3">
              <a 
                href="/guides" 
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/10"
              >
                Guides de croissance <ExternalLink size={16} />
              </a>
              <button 
                onClick={onClose}
                className="w-full py-3 px-4 text-slate-400 hover:text-white transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
