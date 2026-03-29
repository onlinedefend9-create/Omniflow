import React, { useState } from 'react';
import { useContentStore } from '../store/useContentStore';
import { Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface PropagateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const PropagateButton: React.FC<PropagateButtonProps> = ({ onClick, disabled }) => {
  const { isPropagating } = useContentStore();
  const [showShockwave, setShowShockwave] = useState(false);

  const handleClick = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    setShowShockwave(true);
    setTimeout(() => setShowShockwave(false), 600);
    onClick();
  };

  return (
    <div className="relative group w-full">
      <AnimatePresence>
        {showShockwave && (
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl border-4 border-indigo-500/50 animate-shockwave" />
          </div>
        )}
      </AnimatePresence>

      <div className={cn(
        "absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200",
        isPropagating && "opacity-100 animate-pulse"
      )} />
      
      <button
        onClick={handleClick}
        disabled={disabled || isPropagating}
        className={cn(
          "relative w-full py-5 px-8 rounded-2xl font-black text-lg tracking-widest uppercase flex items-center justify-center gap-4 transition-all duration-500 overflow-hidden",
          "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/20",
          "hover:scale-[1.02] active:scale-95",
          isPropagating && "cursor-wait",
          disabled && !isPropagating && "opacity-50 grayscale cursor-not-allowed"
        )}
      >
        {isPropagating ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Propagation...</span>
          </>
        ) : (
          <>
            <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <span>Propager</span>
          </>
        )}
      </button>
    </div>
  );
};
