"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { 
  Send, 
  Video, 
  Zap, 
  CheckCircle2, 
  Loader2,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  Music2,
  MessageSquare,
  Globe,
  Share2,
  Sparkles,
  Layout,
  Eye,
  Upload,
  Trash2,
  Power
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ rotate: { repeat: Infinity, duration: 2, ease: "linear" }, scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
          className="relative"
        >
          <div className="absolute inset-0 bg-accent blur-2xl opacity-50" />
          <Zap className="relative w-16 h-16 text-accent fill-accent/20" />
        </motion.div>
      </div>
    );
  }

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handlePublish = async () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;
    setIsPublishing(true);
    try {
      // Simulate API call for now
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
    <div className="min-h-screen text-slate-200 pt-32 pb-12 px-4 md:px-8 lg:px-12 font-sans relative">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-display font-black tracking-tighter text-white leading-none">
              Content <span className="text-accent text-gradient">Studio</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
              Create once. Impact everywhere.
            </p>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-green" />
              <span className="text-[8px] font-black uppercase tracking-widest text-green-500">Engine Live v1.0.5</span>
            </div>
          </div>
        </header>

        <main className="grid lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-3 p-1.5 bg-white/5 rounded-[24px] w-fit border border-white/10 backdrop-blur-xl" role="tablist">
              <button 
                onClick={() => setActiveTab("editor")} 
                role="tab"
                aria-selected={activeTab === "editor"}
                aria-label="Open content editor"
                className={cn("flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500", activeTab === "editor" ? "bg-accent text-black shadow-[0_0_20px_rgba(255,0,127,0.3)]" : "text-slate-500 hover:text-white hover:bg-white/5")}
              >
                <Layout className="w-4 h-4" /> Editor
              </button>
              <button 
                onClick={() => setActiveTab("preview")} 
                role="tab"
                aria-selected={activeTab === "preview"}
                aria-label="Preview content"
                className={cn("flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500", activeTab === "preview" ? "bg-accent text-black shadow-[0_0_20px_rgba(255,0,127,0.3)]" : "text-slate-500 hover:text-white hover:bg-white/5")}
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "editor" ? (
                <motion.div key="editor" initial={{ opacity: 0, scale: 0.98, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -20 }} className="glass-card rounded-[40px] p-10 space-y-10 relative overflow-hidden group">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-accent" />
                        </div>
                        <label htmlFor="content-editor" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Viral Stream</label>
                      </div>
                      <span className={cn("text-[10px] font-black px-3 py-1.5 rounded-full", content.length > 280 ? "bg-red-500/20 text-red-400" : "bg-white/5 text-slate-500")}>
                        {content.length} / 280
                      </span>
                    </div>
                    <textarea 
                      id="content-editor"
                      value={content} 
                      onChange={(e) => setContent(e.target.value)} 
                      placeholder="What's the global impact today?" 
                      className="w-full h-72 bg-transparent border-none focus:ring-0 text-3xl font-display font-bold text-white placeholder:text-slate-800 resize-none leading-tight selection:bg-accent/30" 
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
                      className="group flex-1 flex items-center gap-6 px-10 py-8 glass-card glass-card-hover rounded-[32px] cursor-pointer border border-white/5 border-dashed hover:border-accent/40 transition-all duration-500"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500 shadow-inner">
                        <Upload className="w-6 h-6 text-accent" />
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-white mb-1">Drop Media Here</span>
                        <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-widest">Supports 4K Video & High-Res Images</span>
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
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-6 px-8 py-6 bg-gradient-to-r from-accent/10 to-accent/10 border border-accent/20 rounded-[32px] shadow-2xl">
                        <div className="w-16 h-16 rounded-2xl bg-accent/20 overflow-hidden border border-white/10 shadow-inner">
                          {media.type.startsWith("image/") ? (
                            <Image src={mediaPreview!} alt="Preview" fill className="object-cover" unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black">
                              <Video className="w-6 h-6 text-accent" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-white uppercase tracking-widest truncate max-w-[150px]">{media.name}</span>
                          <span className="text-[8px] font-bold text-accent/60 uppercase tracking-widest">Optimized for Stream</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setMedia(null);
                          }} 
                          aria-label="Remove media"
                          className="w-10 h-10 rounded-full hover:bg-red-500/20 flex items-center justify-center transition-colors text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="preview" initial={{ opacity: 0, scale: 0.98, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -20 }} className="glass-card rounded-[40px] p-10 min-h-[500px] flex flex-col items-center justify-center text-center space-y-10 relative overflow-hidden">
                  {content ? (
                    <div className="max-w-lg w-full space-y-8 text-left">
                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-accent to-accent-hover p-0.5">
                          <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center overflow-hidden">
                            {session?.user?.image ? <Image src={session.user.image} alt="" fill className="object-cover" unoptimized /> : <Zap className="w-6 h-6 text-accent" />}
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-display font-bold text-white leading-tight">{session?.user?.name || "OneFlow Creator"}</p>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">OneFlow Preview • Now</p>
                        </div>
                      </div>
                      <p className="text-2xl font-display font-medium text-slate-100 leading-snug whitespace-pre-wrap">{content}</p>
                      {mediaPreview && (
                        <div className="aspect-video w-full bg-white/5 rounded-[32px] border border-white/10 flex items-center justify-center overflow-hidden relative group">
                          {media?.type.startsWith("image/") ? (
                            <Image src={mediaPreview} alt="Preview" fill className="object-cover" unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black">
                              <Video className="w-12 h-12 text-accent/20" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-12 h-12 text-accent animate-pulse" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-28 h-28 mx-auto bg-white/5 rounded-[40px] flex items-center justify-center border border-white/10 shadow-inner">
                        <Eye className="w-12 h-12 text-slate-800" />
                      </motion.div>
                      <p className="text-slate-600 font-bold uppercase tracking-[0.2em] text-[10px]">Your vision will appear here</p>
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
              className="w-full py-8 bg-gradient-to-r from-accent via-accent to-accent text-white rounded-[40px] font-display font-black text-2xl flex items-center justify-center gap-5 hover:shadow-[0_20px_50px_rgba(255,0,127,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 border border-white/20"
            >
              {isPublishing ? <><Loader2 className="w-8 h-8 animate-spin" /> Propagating Stream...</> : <><Share2 className="w-8 h-8" /> Ignite {selectedPlatforms.length} Networks</>}
            </motion.button>
          </section>

          <section className="lg:col-span-4 space-y-8">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-[40px] p-10 space-y-10 border border-white/5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-accent" />
                  </div>
                  <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Connectors</h2>
                </div>
                <button onClick={() => setSelectedPlatforms(platforms.map(p => p.id))} className="text-[10px] font-black text-accent hover:text-white transition-colors uppercase tracking-widest">Select All</button>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                {platforms.map((platform, idx) => {
                  const account = (session as { accounts?: Record<string, unknown> })?.accounts?.[platform.id];
                  const isConnected = !!account;
                  const isSelected = selectedPlatforms.includes(platform.id);
                  return (
                    <motion.div
                      key={platform.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 + 0.3 }}
                      className={cn(
                        "relative flex flex-col items-center justify-center gap-6 p-8 rounded-[40px] border transition-all duration-700 group overflow-hidden",
                        isConnected 
                          ? "bg-black border-[#FF007F] shadow-[0_0_15px_rgba(255,0,127,0.3)]" 
                          : "bg-black border-[rgba(255,0,127,0.3)] hover:border-[#FF007F]"
                      )}
                    >
                      <div className={cn(
                        "w-20 h-20 rounded-[28px] flex items-center justify-center transition-all duration-700 shadow-inner relative",
                        isConnected ? "bg-[#FF007F]/10 scale-110" : "bg-white/5 group-hover:scale-110"
                      )}>
                        {isConnected && (
                          <div className="absolute inset-0 bg-[#FF007F]/20 blur-2xl animate-pulse rounded-full" />
                        )}
                        <platform.icon className={cn("w-10 h-10 relative z-10 transition-colors duration-500", isConnected ? "text-[#FF007F]" : "text-white group-hover:text-[#FF007F]")} />
                      </div>
                      
                      <div className="text-center space-y-2">
                        <span className={cn(
                          "text-[12px] font-black uppercase tracking-[0.3em] transition-colors duration-500",
                          isConnected ? "text-white" : "text-slate-500 group-hover:text-white"
                        )}>
                          {platform.name}
                        </span>
                        {isConnected && (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF007F] animate-pulse" />
                            <span className="text-[8px] font-black text-[#FF007F] uppercase tracking-widest">Active Stream</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Action Button */}
                      {!isConnected ? (
                        <button 
                          onClick={() => signIn(platform.providerId)}
                          className="w-full py-4 bg-black text-[10px] font-black text-white hover:text-white uppercase tracking-widest rounded-2xl border border-[#FF007F] hover:bg-[#FF007F] transition-all duration-500 shadow-[0_0_10px_rgba(255,0,127,0.1)] hover:shadow-[0_0_20px_rgba(255,0,127,0.4)]"
                        >
                          Connect
                        </button>
                      ) : (
                        <div className="flex flex-col w-full gap-4">
                          <div 
                            onClick={() => togglePlatform(platform.id)}
                            className={cn(
                              "w-full h-10 rounded-full relative p-1 cursor-pointer transition-all duration-500",
                              isSelected ? "bg-[#FF007F]/20 border border-[#FF007F]/50" : "bg-slate-900 border border-white/5"
                            )}
                          >
                            <motion.div 
                              animate={{ x: isSelected ? 44 : 0 }}
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                                isSelected ? "bg-[#FF007F] shadow-[0_0_15px_rgba(255,0,127,0.6)]" : "bg-slate-700"
                              )}
                            >
                              <Power className={cn("w-4 h-4", isSelected ? "text-white" : "text-slate-500")} />
                            </motion.div>
                          </div>
                          <button 
                            onClick={() => signOut()}
                            className="text-[8px] font-black text-slate-600 hover:text-[#FF007F] uppercase tracking-[0.2em] transition-colors"
                          >
                            Terminate Connection
                          </button>
                        </div>
                      )}

                      {isSelected && (
                        <motion.div layoutId="check" className="absolute top-4 right-4 bg-[#FF007F] rounded-full p-2 shadow-[0_0_10px_rgba(255,0,127,0.5)] border border-white/20">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="p-8 glass-card rounded-[32px] border-accent/10 relative group overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Global Engine</span>
              </div>
              <p className="text-[12px] text-accent/60 leading-relaxed italic font-medium">&quot;OneFlow orchestrates official OAuth2 streams. Your security is paramount.&quot;</p>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}
