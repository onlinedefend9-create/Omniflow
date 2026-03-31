"use client";
import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { StatusBadge } from './StatusBadge';

interface ConnectionCardProps {
  icon: LucideIcon;
  name: string;
  connected: boolean;
}

export function ConnectionCard({ icon: Icon, name, connected }: ConnectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-[#18181B] border border-[#27272A] p-6 rounded-xl flex flex-col justify-between h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#09090B] rounded-lg border border-[#27272A]">
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
