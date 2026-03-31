import React from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export function GlassButton({ className, children, variant = 'outline', ...props }: GlassButtonProps) {
  return (
    <button
      className={cn(
        "relative backdrop-blur-md border transition-all duration-300 px-4 py-2 rounded-lg text-sm font-medium",
        "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:border-blue-500/50",
        variant === 'outline' 
          ? "bg-white/5 border-white/10 text-white" 
          : "bg-blue-600 border-blue-500 text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
