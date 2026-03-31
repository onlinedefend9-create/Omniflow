'use client';

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Loader2,
  Music2,
  Share2,
  Layout,
  Eye,
  Upload,
  Youtube,
  Instagram,
  Facebook,
  MessageSquare,
  Twitter,
  Linkedin,
  Send,
  Rss
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { ConnectionCard } from "@/components/ConnectionCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { SyncModal } from "@/components/SyncModal";

const platforms = [
  { id: "tiktok", providerId: "tiktok", name: "TikTok", icon: Music2 },
  { id: "youtube", providerId: "google", name: "YouTube", icon: Youtube },
  { id: "instagram", providerId: "facebook", name: "Instagram", icon: Instagram },
  { id: "facebook", providerId: "facebook", name: "Facebook", icon: Facebook },
  { id: "threads", providerId: "facebook", name: "Threads", icon: MessageSquare },
  { id: "x", providerId: "twitter", name: "X", icon: Twitter },
  { id: "linkedin", providerId: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "telegram", providerId: "telegram", name: "Telegram", icon: Send },
  { id: "rss", providerId: "rss", name: "RSS Feed", icon: Rss },
];

import { TelegramLogin } from "@/components/TelegramLogin";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [isDemo, setIsDemo] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [media, setMedia] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    if (status === "unauthenticated") {
      setIsDemo(true);
    }
  }, [status]);

  useEffect(() => {
    if (!media) return;
    const objectUrl = URL.createObjectURL(media);
    return () => URL.revokeObjectURL(objectUrl);
  }, [media]);

  if (status === "loading" || !mounted) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  const handlePublish = async () => {
    if (!content.trim() || selectedPlatforms.length === 0) {
      alert("Veuillez saisir du contenu et sélectionner au moins une plateforme.");
      return;
    }
    setIsPublishing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Contenu publié avec succès sur ${selectedPlatforms.length} plateformes !`);
      setContent("");
      setSelectedPlatforms([]);
      setMedia(null);
    } catch (error) {
      console.error(error);
      alert("Échec de la publication. Veuillez réessayer.");
    } finally {
      setIsPublishing(false);
    }
  };

  const togglePlatform = (platformId: string, providerId: string) => {
    // @ts-expect-error - accounts is not defined on session
    const accounts = session?.accounts || {};
    const isConnected = !!accounts[providerId] || isDemo;

    if (!isConnected) {
      if (providerId === 'telegram') {
        setShowTelegramModal(true);
        return;
      }
      // Standardized login route as requested
      window.location.href = `/api/auth/${providerId}/login`;
      return;
    }

    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const handleTelegramAuth = (user: Record<string, string>) => {
    const params = new URLSearchParams(user);
    window.location.href = `/api/auth/telegram/callback?${params.toString()}`;
  };

  return (
    <div className="min-h-screen text-slate-200 pt-32 pb-12 px-4 md:px-8 lg:px-12 font-sans relative bg-[#09090B]">
      <SyncModal isOpen={showSyncModal} onClose={() => setShowSyncModal(false)} />
      
      {/* Telegram Login Modal */}
      <AnimatePresence>
        {showTelegramModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#18181B] border border-white/10 p-10 rounded-[40px] max-w-md w-full shadow-2xl text-center"
            >
              <Send className="w-16 h-16 text-blue-500 mb-8 mx-auto" />
              <h2 className="text-3xl font-display font-black text-white mb-4 italic">Connect Telegram</h2>
              <p className="text-slate-400 mb-10 text-sm leading-relaxed">
                Use the official Telegram widget below to securely authorize OneFlow to post on your behalf.
              </p>
              <div className="flex justify-center mb-10">
                <TelegramLogin 
                  botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "OneFlowBot"} 
                  onAuth={handleTelegramAuth} 
                />
              </div>
              <button 
                onClick={() => setShowTelegramModal(false)}
                className="w-full py-4 text-zinc-500 hover:text-white font-black uppercase tracking-[0.2em] text-[10px] transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-display font-black tracking-tighter text-white leading-none">
              Content <span className="text-blue-500">Studio</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
              {isDemo ? "Mode Artiste (Aperçu Live)" : `Connecté: ${session?.user?.name}`}
            </p>
          </motion.div>
          <button 
            onClick={() => setIsDemo(!isDemo)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
          >
            {isDemo ? "Quitter la démo" : "Explorer la démo (Mode Artiste)"}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
            <h4 className="text-slate-400 text-sm">Vues (Simulées)</h4>
            <p className="text-3xl font-bold text-white">1,240,000</p>
          </div>
          <AdPlaceholder className="h-full w-full min-h-[100px]" />
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
            <h4 className="text-slate-400 text-sm">Engagement</h4>
            <p className="text-3xl font-bold text-pink-500">12.4%</p>
          </div>
        </div>

        <main className="grid lg:grid-cols-12 gap-8 items-start dashboard-main-content">
          <section className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-3 p-1.5 bg-white/5 rounded-[24px] w-fit border border-white/10 backdrop-blur-xl">
              <button 
                onClick={() => setActiveTab("editor")} 
                className={cn("flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500", activeTab === "editor" ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-white")}
              >
                <Layout className="w-4 h-4" /> Editor
              </button>
              <button 
                onClick={() => setActiveTab("preview")} 
                className={cn("flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500", activeTab === "preview" ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-white")}
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "editor" ? (
                <motion.div key="editor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-[#18181B] border border-[#27272A] rounded-[40px] p-10 space-y-10">
                  <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="What's the global impact today?" 
                    className="w-full h-72 bg-transparent border-none focus:ring-0 text-3xl font-display font-bold text-white placeholder:text-zinc-800 resize-none leading-tight" 
                  />
                  <div className="flex flex-wrap items-center gap-5 pt-10 border-t border-white/5">
                    <div 
                      onClick={() => fileInputRef.current?.click()} 
                      className="flex-1 flex items-center gap-6 px-10 py-8 bg-[#09090B] rounded-[32px] cursor-pointer border border-[#27272A] border-dashed hover:border-blue-500/40 transition-all duration-500"
                    >
                      <Upload className="w-6 h-6 text-blue-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Drop Media Here</span>
                      <input 
                        ref={fileInputRef} 
                        type="file" 
                        accept="image/*,video/*" 
                        className="hidden" 
                        onChange={(e) => setMedia(e.target.files?.[0] || null)} 
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-[#18181B] border border-[#27272A] rounded-[40px] p-10 min-h-[500px] flex items-center justify-center">
                  <p className="text-zinc-600 font-bold uppercase tracking-[0.2em] text-[10px]">Your vision will appear here</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={handlePublish} 
              disabled={isPublishing || !content.trim() || selectedPlatforms.length === 0} 
              className="w-full py-8 bg-blue-600 text-white rounded-[40px] font-display font-black text-2xl flex items-center justify-center gap-5 disabled:opacity-50"
            >
              {isPublishing ? <Loader2 className="w-8 h-8 animate-spin" /> : <Share2 className="w-8 h-8" />}
              {isPublishing ? "Publishing..." : `Ignite ${selectedPlatforms.length} Networks`}
            </button>
          </section>

          <section className="lg:col-span-4 space-y-8">
            <div className="grid grid-cols-2 gap-5">
              {platforms.map((platform) => {
                // @ts-expect-error - accounts is not defined on session
                const accounts = session?.accounts || {};
                const isConnected = !!accounts[platform.providerId] || isDemo;
                const isSelected = selectedPlatforms.includes(platform.id);

                return (
                  <ConnectionCard
                    key={platform.id}
                    icon={platform.icon}
                    name={platform.name}
                    connected={isConnected}
                    selected={isSelected}
                    onClick={() => togglePlatform(platform.id, platform.providerId)}
                  />
                );
              })}
            </div>
            <AdPlaceholder className="h-64 w-full" />
          </section>
        </main>
      </div>
    </div>
  );
}
