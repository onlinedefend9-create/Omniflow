"use client";
import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { GlassButton } from './ui/GlassButton';
import { StatusBadge } from './ui/StatusBadge';

interface ConnectionCardProps {
  icon: LucideIcon;
  name: string;
  connected: boolean;
  onClick: () => void;
}

export function ConnectionCard({ icon: Icon, name, connected, onClick }: ConnectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-full shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <Icon className="text-white" size={24} />
        </div>
        <StatusBadge connected={connected} />
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>

      <button
        onClick={onClick}
        className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
      >
        {connected ? 'Gérer' : 'Connecter'}
      </button>
    </motion.div>
  );
}
