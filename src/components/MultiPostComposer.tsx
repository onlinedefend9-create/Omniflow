"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiPostComposerProps {
  connectedAccountsCount: number;
}

export function MultiPostComposer({ connectedAccountsCount }: MultiPostComposerProps) {
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const canPublish = connectedAccountsCount >= 2;

  const handlePublish = async () => {
    if (!content.trim() || !canPublish) return;

    setIsPublishing(true);
    setStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus("success");
      setContent("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("Publishing error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      {/* Ultra-Glass Container */}
      <div className="relative p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Decorative Background Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -mr-32 -mt-32 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] -ml-32 -mb-32 rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  Multi-Platform Engine
                </span>
              </div>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">
                Composer
              </h3>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
              <div className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                canPublish ? "bg-green-500" : "bg-yellow-500"
              )} />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                {connectedAccountsCount} Accounts Linked
              </span>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's the global impact today?"
              className="w-full h-40 p-6 bg-black/20 border border-white/5 rounded-[24px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-all duration-500 resize-none font-medium leading-relaxed"
            />
            
            <div className="absolute bottom-4 right-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest">
              {content.length} Characters
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {!canPublish && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-2 text-yellow-500/80 text-[10px] font-bold uppercase tracking-wider"
                  >
                    <AlertCircle className="w-3 h-3" />
                    Connect at least 2 accounts to enable multi-posting
                  </motion.div>
                )}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-wider"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Broadcast Successful
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {canPublish && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  onClick={handlePublish}
                  disabled={isPublishing || !content.trim()}
                  className={cn(
                    "relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-black italic tracking-tighter uppercase text-sm transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100",
                    isPublishing && "pr-12"
                  )}
                >
                  {isPublishing ? (
                    <>
                      Publishing
                      <Loader2 className="w-4 h-4 animate-spin absolute right-6" />
                    </>
                  ) : (
                    <>
                      Publish Everywhere
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
