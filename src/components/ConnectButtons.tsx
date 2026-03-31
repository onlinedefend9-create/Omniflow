"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { 
  Music2, 
  Youtube, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "google", name: "YouTube", icon: Youtube, color: "hover:bg-red-600/20 hover:text-red-500" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "hover:bg-blue-600/20 hover:text-blue-500" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "hover:bg-blue-700/20 hover:text-blue-600" },
  { id: "twitter", name: "Twitter (X)", icon: Twitter, color: "hover:bg-zinc-600/20 hover:text-white" },
  { id: "tiktok", name: "TikTok", icon: Music2, color: "hover:bg-pink-600/20 hover:text-pink-500" },
];

export function ConnectButtons() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (platformId: string) => {
    setLoading(platformId);
    setError(null);
    try {
      const result = await signIn(platformId, { 
        callbackUrl: "/dashboard",
        redirect: true 
      });
      if (result?.error) {
        setError(`Failed to connect to ${platformId}. Please try again.`);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      // Note: For redirecting providers, this might not be reached
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isLoading = loading === platform.id;

          return (
            <button
              key={platform.id}
              onClick={() => handleConnect(platform.id)}
              disabled={!!loading}
              className={cn(
                "group relative flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-[24px] transition-all duration-500 text-left disabled:opacity-50 disabled:cursor-not-allowed",
                platform.color
              )}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-inherit transition-colors">
                  Connect
                </span>
                <span className="text-sm font-bold text-white">
                  {platform.name}
                </span>
              </div>
              
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
