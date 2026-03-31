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
}

export function ConnectionCard({ icon: Icon, name, connected }: ConnectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-full shadow-lg"
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

      <GlassButton className="w-full">
        {connected ? 'Gérer' : 'Connecter'}
      </GlassButton>
    </motion.div>
  );
}
