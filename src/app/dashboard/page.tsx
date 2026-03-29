"use client";

import { useState } from "react";
import { 
  Video, 
  Send, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Music2, 
  Layers, 
  Zap,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "tiktok", name: "TikTok", icon: Music2, color: "text-pink-500" },
  { id: "x", name: "X (Twitter)", icon: Twitter, color: "text-blue-400" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-600" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "text-red-500" },
];

export default function Dashboard() {
  const [postContent, setPostContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handlePublish = async () => {
    if (!postContent.trim() || selectedPlatforms.length === 0) return;
    setIsPublishing(true);
    // Simulate publishing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPublishing(false);
    alert("Publication réussie sur : " + selectedPlatforms.join(", "));
  };

  return (
    <div className="min-h-screen bg-onyx text-slate-200">
      <nav className="border-b border-white/5 bg-onyx/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-500 fill-indigo-500" />
            <span className="font-display text-lg font-bold text-white">OmniFlow Studio</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Engine v1.0.5
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 md:p-12 space-y-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Studio de Publication</h1>
          <p className="text-slate-400">Créez une fois, diffusez partout.</p>
        </header>

        <div className="glass-studio p-8 space-y-8">
          {/* Content Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Votre Message
              </label>
              <span className="text-[10px] font-mono text-slate-600">{postContent.length} caractères</span>
            </div>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Qu'allez-vous partager aujourd'hui ?"
              className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all resize-none placeholder:text-slate-700"
            />
          </div>

          {/* Media Upload */}
          <div className="grid md:grid-cols-2 gap-6">
            <button className="group relative flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-white/10 rounded-2xl hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-200">Upload Video</p>
                <p className="text-xs text-slate-500">MP4, MOV (Max 500MB)</p>
              </div>
            </button>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-center">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Plateformes Cibles</p>
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all",
                      selectedPlatforms.includes(platform.id)
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-transparent border-white/5 text-slate-500 hover:bg-white/5"
                    )}
                  >
                    <platform.icon className={cn("w-5 h-5", selectedPlatforms.includes(platform.id) ? platform.color : "text-slate-600")} />
                    <span className="text-sm font-medium">{platform.name}</span>
                    {selectedPlatforms.includes(platform.id) && (
                      <CheckCircle2 className="w-4 h-4 ml-auto text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 space-y-4">
            <button
              onClick={handlePublish}
              disabled={isPublishing || !postContent.trim() || selectedPlatforms.length === 0}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold text-white flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-600/20"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Propagation en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Propager le Contenu
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest">
              🔒 Publication 100% anonyme. Aucune mention d'OmniFlow ne sera ajoutée.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
