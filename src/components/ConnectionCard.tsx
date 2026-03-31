"use client";
import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';

import { cn } from '@/lib/utils';

interface ConnectionCardProps {
  icon: LucideIcon;
  name: string;
  connected: boolean;
  selected?: boolean;
  onClick: () => void;
}

export function ConnectionCard({ icon: Icon, name, connected, selected, onClick }: ConnectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white/5 backdrop-blur-xl border p-6 rounded-2xl flex flex-col justify-between h-full shadow-lg transition-all duration-300",
        selected ? "border-blue-500 bg-blue-500/10" : "border-white/10"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-3 rounded-lg border transition-colors",
          selected ? "bg-blue-500 border-blue-400" : "bg-white/5 border-white/10"
        )}>
          <Icon className="text-white" size={24} />
        </div>
        <StatusBadge connected={connected} />
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>

      <button
        onClick={onClick}
        className={cn(
          "w-full py-2 px-4 rounded-lg transition-all border font-bold uppercase tracking-wider text-[10px]",
          connected 
            ? selected 
              ? "bg-blue-600 border-blue-500 text-white" 
              : "bg-white/10 hover:bg-white/20 text-white border-white/10"
            : "bg-blue-500 hover:bg-blue-600 text-white border-blue-400"
        )}
      >
        {connected ? (selected ? 'Sélectionné' : 'Sélectionner') : 'Connecter'}
      </button>
    </motion.div>
  );
}
