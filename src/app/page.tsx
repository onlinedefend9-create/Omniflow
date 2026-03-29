"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "motion/react";
import { 
  Send, 
  Video, 
  Image as ImageIcon, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  Music2,
  MessageSquare,
  Globe,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "tiktok", name: "TikTok", icon: Music2, color: "text-pink-500" },
  { id: "youtube", name: "YouTube Shorts", icon: Youtube, color: "text-red-500" },
  { id: "instagram", name: "Instagram", icon: ImageIcon, color: "text-purple-500" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
  { id: "threads", name: "Threads", icon: MessageSquare, color: "text-white" },
  { id: "x", name: "X (Twitter)", icon: Twitter, color: "text-slate-200" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
  { id: "telegram", name: "Telegram", icon: Send, color: "text-sky-400" },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [media, setMedia] = useState<File | null>(null);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handlePublish = async () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;
    
    setIsPublishing(true);
    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          platforms: selectedPlatforms,
          media: media ? media.name : null, // Simplification for demo
        }),
      });
      
      if (response.ok) {
        alert("Publication réussie !");
        setContent("");
        setSelectedPlatforms([]);
        setMedia(null);
      } else {
        alert("Erreur lors de la publication.");
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#38bdf8] rounded-xl flex items-center justify-center shadow-lg shadow-[#38bdf8]/20">
              <Zap className="w-6 h-6 text-[#0f172a] fill-[#0f172a]" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">OmniFlow<span className="text-[#38bdf8]">.click</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400 hidden md:block">{session.user?.email}</span>
                <button 
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold hover:bg-white/10 transition-all"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button 
                onClick={() => signIn()}
                className="px-6 py-2 bg-[#38bdf8] text-[#0f172a] rounded-lg text-sm font-bold hover:bg-[#38bdf8]/90 transition-all"
              >
                Connexion
              </button>
            )}
          </div>
        </header>

        <main className="grid lg:grid-cols-3 gap-8">
          {/* Left: Content Editor */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Contenu du Post</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full h-48 bg-transparent border-none focus:ring-0 text-xl text-white placeholder:text-slate-600 resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5">
                <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                  <Video className="w-4 h-4 text-[#38bdf8]" />
                  <span className="text-sm font-medium">Vidéo</span>
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => setMedia(e.target.files?.[0] || null)} />
                </label>
                <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                  <ImageIcon className="w-4 h-4 text-[#38bdf8]" />
                  <span className="text-sm font-medium">Image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setMedia(e.target.files?.[0] || null)} />
                </label>
                {media && (
                  <span className="text-xs text-slate-500 italic">Fichier sélectionné : {media.name}</span>
                )}
              </div>
            </div>

            <button
              onClick={handlePublish}
              disabled={isPublishing || !content.trim() || selectedPlatforms.length === 0}
              className="w-full py-4 bg-[#38bdf8] text-[#0f172a] rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#38bdf8]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-[#38bdf8]/20"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Propagation en cours...
                </>
              ) : (
                <>
                  <Share2 className="w-6 h-6" />
                  Propager sur {selectedPlatforms.length} réseaux
                </>
              )}
            </button>
          </section>

          {/* Right: Platforms Grid */}
          <section className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Réseaux Sociaux</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform) => {
                  const isSelected = selectedPlatforms.includes(platform.id);
                  // Mock connection status for demo
                  const isConnected = (session as any)?.provider === platform.id || platform.id === "telegram"; 

                  return (
                    <motion.button
                      key={platform.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => togglePlatform(platform.id)}
                      className={cn(
                        "relative flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all",
                        isSelected 
                          ? "bg-[#38bdf8]/10 border-[#38bdf8]/50" 
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      )}
                    >
                      <platform.icon className={cn("w-8 h-8", platform.color)} />
                      <span className="text-xs font-bold uppercase tracking-tight">{platform.name}</span>
                      
                      {/* Connection Status Badge */}
                      <div className="absolute top-2 right-2">
                        {isConnected ? (
                          <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-700" />
                        )}
                      </div>

                      {isSelected && (
                        <div className="absolute -top-2 -right-2 bg-[#38bdf8] rounded-full p-1 shadow-lg">
                          <CheckCircle2 className="w-3 h-3 text-[#0f172a]" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Légende Statut</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] text-slate-400">Connecté</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <span className="text-[10px] text-slate-400">Déconnecté</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
              <p className="text-xs text-indigo-300 leading-relaxed italic">
                "OmniFlow utilise les APIs officielles pour garantir la sécurité de vos comptes. Vos tokens sont cryptés."
              </p>
            </div>
          </section>
        </main>

        {/* Footer Links */}
        <footer className="pt-12 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <a href="/privacy" className="hover:text-[#38bdf8] transition-colors">Confidentialité</a>
          <a href="/terms" className="hover:text-[#38bdf8] transition-colors">Conditions</a>
          <a href="/delete-account" className="hover:text-red-400 transition-colors">Supprimer mon compte</a>
          <span className="text-slate-700">© 2026 OmniFlow Studio</span>
        </footer>
      </div>
    </div>
  );
}
