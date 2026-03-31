import React from 'react';

interface StatusBadgeProps {
  connected: boolean;
}

export function StatusBadge({ connected }: StatusBadgeProps) {
  return (
    <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${connected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`} />
      {connected ? 'Connecté' : 'Déconnecté'}
    </div>
  );
}
