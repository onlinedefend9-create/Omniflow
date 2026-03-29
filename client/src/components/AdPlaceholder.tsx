import React from 'react';

interface AdPlaceholderProps {
  type: 'TOP' | 'SIDE' | 'INLINE';
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type }) => {
  const height = type === 'TOP' ? 'h-24' : type === 'SIDE' ? 'h-64' : 'h-48';
  
  return (
    <div className={`w-full ${height} bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em] mb-2">Sponsorisé</span>
      <div className="w-12 h-1 bg-white/10 rounded-full" />
      <div className="mt-4 text-[9px] text-slate-800 font-mono">ADSENSE_UNIT_{type}</div>
    </div>
  );
};
