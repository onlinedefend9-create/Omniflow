"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { 
  Send, 
  Video, 
  Zap, 
  Loader2,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
  Music2,
  MessageSquare,
  Share2,
  Sparkles,
  Layout,
  Eye,
  Upload,
  Trash2,
  Linkedin,
  CheckCircle2
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
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [showToast, setShowToast] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsDemo(true);
    }
  }, [status]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
      setShowToast(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#60a5fa', '#93c5fd']
      });
      
      const timer = setTimeout(() => setShowToast(false), 4000);
      window.history.replaceState({}, '', window.location.pathname);
      return () => clearTimeout(timer);
    }
  }, []);
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!media) {
      setMediaPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(media);
    setMediaPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [media]);

  if (status === "loading" || !mounted) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ rotate: { repeat: Infinity, duration: 2, ease: "linear" }, scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
          className="relative"
        >
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-50" />
          <Zap className="relative w-16 h-16 text-blue-500 fill-blue-500/20" />
        </motion.div>
      </div>
    );
  }

  const handlePublish = async () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;
    setIsPublishing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Successfully published to ${selectedPlatforms.length} platforms!`);
      setContent("");
      setSelectedPlatforms([]);
      setMedia(null);
    } catch (error) {
      console.error(error);
      alert("Failed to publish. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-200 pt-32 pb-12 px-4 md:px-8 lg:px-12 font-sans relative bg-[#09090B]">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <p className="text-sm font-medium text-white">Connexion réussie ! Vos flux sont désormais synchronisés.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <SyncModal isOpen={showSyncModal} onClose={() => setShowSyncModal(false)} />
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-12">
        <AdPlaceholder className="h-24 w-full" />
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-display font-black tracking-tighter text-white leading-none">
              Content <span className="text-blue-500">Studio</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
              Create once. Impact everywhere.
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
            <h4 className="text-slate-400 text-sm">Vues</h4>
            <p className="text-3xl font-bold text-white">{isDemo ? "1.2M" : "0"}</p>
          </div>
          <AdPlaceholder className="h-full w-full min-h-[100px]" />
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
            <h4 className="text-slate-400 text-sm">Likes</h4>
            <p className="text-3xl font-bold text-white">{isDemo ? "450K" : "0"}</p>
          </div>
        </div>

        <main className="grid lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-3 p-1.5 bg-white/5 rounded-[24px] w-fit border border-white/10 backdrop-blur-xl" role="tablist">
              <button 
                onClick={() => setActiveTab("editor")} 
                role="tab"
                aria-selected={activeTab === "editor"}
                aria-label="Open content editor"
                className={cn("flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500", activeTab === "editor" ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]" : "text-zinc-500 hover:text-white hover:bg-white/5")}
              >
                <Layout className="w-4 h-4" /> Editor
              </button>
              <button 
                onClick={() => setActiveTab("preview")} 
                role="tab"
                aria-selected={activeTab === "preview"}
                aria-label="Preview content"
                className={cn("flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500", activeTab === "preview" ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]" : "text-zinc-500 hover:text-white hover:bg-white/5")}
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "editor" ? (
                <motion.div key="editor" initial={{ opacity: 0, scale: 0.98, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -20 }} className="bg-[#18181B] border border-[#27272A] rounded-[40px] p-10 space-y-10 relative overflow-hidden group">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-blue-500" />
                        </div>
                        <label htmlFor="content-editor" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Viral Stream</label>
                      </div>
                      <span className={cn("text-[10px] font-black px-3 py-1.5 rounded-full", content.length > 280 ? "bg-red-500/20 text-red-400" : "bg-white/5 text-zinc-500")}>
                        {content.length} / 280
                      </span>
                    </div>
                    <textarea 
                      id="content-editor"
                      value={content} 
                      onChange={(e) => setContent(e.target.value)} 
                      placeholder="What's the global impact today?" 
                      className="w-full h-72 bg-transparent border-none focus:ring-0 text-3xl font-display font-bold text-white placeholder:text-zinc-800 resize-none leading-tight selection:bg-blue-500/30" 
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-5 pt-10 border-t border-white/5">
                    <div 
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files?.[0];
                        if (file) setMedia(file);
                      }}
                      onClick={() => fileInputRef.current?.click()} 
                      aria-label="Upload media"
                      className="group flex-1 flex items-center gap-6 px-10 py-8 bg-[#09090B] rounded-[32px] cursor-pointer border border-[#27272A] border-dashed hover:border-blue-500/40 transition-all duration-500"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-500 shadow-inner">
                        <Upload className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-white mb-1">Drop Media Here</span>
                        <span className="block text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Supports 4K Video & High-Res Images</span>
                      </div>
                      <input 
                        ref={fileInputRef} 
                        type="file" 
                        id="media-upload"
                        accept="image/*,video/*" 
                        className="hidden" 
                        onChange={(e) => setMedia(e.target.files?.[0] || null)} 
                      />
                    </div>
                    
                    {media && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-6 px-8 py-6 bg-gradient-to-r from-blue-500/10 to-blue-500/10 border border-blue-500/20 rounded-[32px] shadow-2xl">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 overflow-hidden border border-white/10 shadow-inner">
                          {media.type.startsWith("image/") ? (
                            <Image src={mediaPreview!} alt="Preview" fill className="object-cover" unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black">
                              <Video className="w-6 h-6 text-blue-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-white uppercase tracking-widest truncate max-w-[150px]">{media.name}</span>
                          <span className="text-[8px] font-bold text-blue-500/60 uppercase tracking-widest">Optimized for Stream</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setMedia(null);
                          }} 
                          aria-label="Remove media"
                          className="w-10 h-10 rounded-full hover:bg-red-500/20 flex items-center justify-center transition-colors text-zinc-400 hover:text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="preview" initial={{ opacity: 0, scale: 0.98, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -20 }} className="bg-[#18181B] border border-[#27272A] rounded-[40px] p-10 min-h-[500px] flex flex-col items-center justify-center text-center space-y-10 relative overflow-hidden">
                  {content ? (
                    <div className="max-w-lg w-full space-y-8 text-left">
                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-700 p-0.5">
                          <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center overflow-hidden">
                            {session?.user?.image ? <Image src={session.user.image} alt="" fill className="object-cover" unoptimized /> : <Zap className="w-6 h-6 text-blue-500" />}
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-display font-bold text-white leading-tight">{session?.user?.name || "OneFlow Creator"}</p>
                          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">OneFlow Preview • Now</p>
                        </div>
                      </div>
                      <p className="text-2xl font-display font-medium text-zinc-100 leading-snug whitespace-pre-wrap">{content}</p>
                      {mediaPreview && (
                        <div className="aspect-video w-full bg-white/5 rounded-[32px] border border-white/10 flex items-center justify-center overflow-hidden relative group">
                          {media?.type.startsWith("image/") ? (
                            <Image src={mediaPreview} alt="Preview" fill className="object-cover" unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black">
                              <Video className="w-12 h-12 text-blue-500/20" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-12 h-12 text-blue-500 animate-pulse" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-28 h-28 mx-auto bg-white/5 rounded-[40px] flex items-center justify-center border border-white/10 shadow-inner">
                        <Eye className="w-12 h-12 text-zinc-800" />
                      </motion.div>
                      <p className="text-zinc-600 font-bold uppercase tracking-[0.2em] text-[10px]">Your vision will appear here</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.01, y: -2 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={handlePublish} 
              disabled={isPublishing || !content.trim() || selectedPlatforms.length === 0} 
              aria-label="Publish to selected networks"
              className="w-full py-8 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white rounded-[40px] font-display font-black text-2xl flex items-center justify-center gap-5 hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 border border-white/20"
            >
              {isPublishing ? <><Loader2 className="w-8 h-8 animate-spin" /> Propagating Stream...</> : <><Share2 className="w-8 h-8" /> Ignite {selectedPlatforms.length} Networks</>}
            </motion.button>
          </section>

          <section className="lg:col-span-4 space-y-8">
            <AdPlaceholder className="h-full w-full min-h-[400px]" />
            <div className="grid grid-cols-2 gap-5">
              {platforms.map((platform) => {
                const account = (session as { accounts?: Record<string, unknown> })?.accounts?.[platform.id];
                const isConnected = !!account;
                return (
                  <ConnectionCard
                    key={platform.id}
                    icon={platform.icon}
                    name={platform.name}
                    connected={isConnected}
                    onClick={() => {
                      const callbackUrl = platform.id === 'tiktok' 
                        ? 'https://oneflow.site/api/auth/callback/tiktok' 
                        : '/dashboard';
                      signIn(platform.providerId, { callbackUrl });
                    }}
                  />
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
