'use client';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Force le mode démo si pas de session après chargement
    if (status === "unauthenticated") setIsDemo(true);
  }, [status]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="flex justify-between items-center p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <h1 className="text-2xl font-bold">OneFlow Dashboard</h1>
        <span className={isDemo ? "text-yellow-500" : "text-green-500"}>
          {isDemo ? "Mode Artiste (Aperçu Live)" : `Connecté: ${session?.user?.name}`}
        </span>
      </header>
      
      {/* Emplacements AdSense & Stats Mockées */}
      <main className="mt-8 space-y-6">
        <div className="h-24 bg-white/5 border-dashed border border-white/20 rounded-xl flex items-center justify-center">
           <p className="text-gray-500 text-sm">Zone Publicitaire AdSense (Haut)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-gray-400">Vues (Simulées)</p>
              <p className="text-4xl font-bold">1,240,000</p>
           </div>
           <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-gray-400">Engagement</p>
              <p className="text-4xl font-bold text-pink-500">12.4%</p>
           </div>
        </div>
      </main>
    </div>
  );
}
