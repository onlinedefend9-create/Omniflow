import React from 'react';
import { useContentStore } from '../store/useContentStore';
import { Platform } from '@shared/types';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Music2,
  CheckCircle2,
  Link as LinkIcon,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

const oauthPlatforms: Platform[] = ['tiktok', 'linkedin', 'x'];

const platformIcons: Record<Platform, React.ReactNode> = {
  tiktok: <Music2 className="w-4 h-4" />,
  instagram_reel: <Instagram className="w-4 h-4" />,
  instagram_feed: <Instagram className="w-4 h-4" />,
  x: <Twitter className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  threads: <Twitter className="w-4 h-4" />, // Mock icon
  facebook: <Twitter className="w-4 h-4" />, // Mock icon
  whatsapp: <Twitter className="w-4 h-4" />, // Mock icon
  telegram: <Twitter className="w-4 h-4" />, // Mock icon
};

const platformColors: Record<string, string> = {
  tiktok: 'text-[#00f2ea]',
  linkedin: 'text-[#0077b5]',
  x: 'text-white',
};

export const SocialConnector: React.FC = () => {
  const { tokens, setToken } = useContentStore();

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const { platform, tokens: platformTokens } = event.data;
        setToken(platform, platformTokens);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setToken]);

  const handleConnect = async (platform: string) => {
    if (tokens[platform]) {
      setToken(platform, null);
      return;
    }

    try {
      const response = await fetch(`/api/auth/url/${platform}`);
      if (!response.ok) throw new Error('Failed to get auth URL');
      const { url } = await response.json();
      
      window.open(url, 'oauth_popup', 'width=600,height=700');
    } catch (error) {
      console.error('OAuth error:', error);
      alert("Impossible d'initier la connexion. Vérifiez la configuration.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-studio p-5">
        <h3 className="text-[11px] font-bold text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
          <LinkIcon className="w-3.5 h-3.5 text-indigo-500" />
          Connecteurs Directs
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {oauthPlatforms.map((platform) => {
            const isConnected = !!tokens[platform];
            return (
              <button
                key={platform}
                onClick={() => handleConnect(platform)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all duration-500 group relative overflow-hidden",
                  isConnected 
                    ? "bg-white/5 border-white/10 shadow-lg shadow-black/20" 
                    : "bg-black/40 border-white/5 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg",
                    isConnected ? "bg-white/10 " + platformColors[platform] : "bg-black/50 text-slate-600"
                  )}>
                    {platformIcons[platform]}
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-white uppercase tracking-widest">
                      {platform}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        isConnected ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-slate-700"
                      )} />
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-widest",
                        isConnected ? "text-green-500" : "text-slate-600"
                      )}>
                        {isConnected ? 'Connecté' : 'Déconnecté'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={cn(
                  "px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all relative z-10",
                  isConnected 
                    ? "bg-white/5 text-slate-400 group-hover:bg-red-500/10 group-hover:text-red-500" 
                    : "bg-indigo-600 text-white group-hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
                )}>
                  {isConnected ? 'Détacher' : 'Relier'}
                </div>

                {/* Irised border effect on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-white/10 transition-colors pointer-events-none" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5 glass-studio border-green-500/10 flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <h4 className="text-[11px] font-bold text-green-500 uppercase tracking-[0.15em]">Privacy First</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed mt-1.5">
            Vos jetons sont stockés localement. Aucune donnée ne transite par nos serveurs.
          </p>
        </div>
      </div>
    </div>
  );
};
