export function AdPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white/30 ${className}`}>
      <span className="text-sm">Espace Publicitaire</span>
    </div>
  );
}
