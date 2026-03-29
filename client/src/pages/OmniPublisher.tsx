import React from 'react';
import { MediaUploader } from '../components/MediaUploader';
import { PlatformCard } from '../components/PlatformCard';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { PropagateButton } from '../components/PropagateButton';
import { SocialConnector } from '../components/SocialConnector';
import { useContentStore } from '../store/useContentStore';
import { Platform } from '@shared/types';
import { 
  Sparkles, 
  Loader2, 
  RefreshCw, 
  Github, 
  Heart, 
  Info, 
  Activity, 
  Send,
  Link,
  Zap,
  Layers,
  Share2
} from 'lucide-react';
import { generatePlatformVariations } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const platforms: Platform[] = [
  'tiktok', 'instagram_reel', 'instagram_feed', 
  'x', 'linkedin', 'threads', 
  'facebook', 'whatsapp', 'telegram'
];

export const OmniPublisher: React.FC = () => {
  const { 
    masterCaption, 
    setMasterCaption, 
    isGenerating, 
    setGenerating, 
    setAllVariations,
    reset,
    variations,
    isPropagating,
    setPropagating,
    propagationProgress,
    setPropagationProgress,
    setPlatformPublishStatus,
    tokens
  } = useContentStore();

  const handleGenerate = async () => {
    if (!masterCaption.trim()) return;
    
    setGenerating(true);
    try {
      const results = await generatePlatformVariations(masterCaption);
      setAllVariations(results);
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la génération.");
    } finally {
      setGenerating(false);
    }
  };

  const handlePropagate = async () => {
    const connectedPlatforms = Object.keys(tokens).filter(p => !!tokens[p]) as Platform[];
    if (connectedPlatforms.length === 0) {
      alert("Veuillez connecter au moins un compte (LinkedIn, TikTok ou X).");
      return;
    }

    setPropagating(true);
    setPropagationProgress(0);

    for (let i = 0; i < connectedPlatforms.length; i++) {
      const platform = connectedPlatforms[i];
      setPlatformPublishStatus(platform, 'pending');
      
      try {
        const response = await fetch(`/api/publish/${platform}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: variations[platform],
            token: tokens[platform],
            mediaUrl: useContentStore.getState().mediaUrl
          })
        });

        if (response.status === 401) {
          setPlatformPublishStatus(platform, 'error');
          alert(`La session ${platform} a expiré. Veuillez vous reconnecter.`);
          continue;
        }

        if (!response.ok) throw new Error('Publish failed');

        setPlatformPublishStatus(platform, 'success');
      } catch (error) {
        console.error(`Error publishing to ${platform}:`, error);
        setPlatformPublishStatus(platform, 'error');
      } finally {
        setPropagationProgress(((i + 1) / connectedPlatforms.length) * 100);
      }
    }

    setTimeout(() => {
      setPropagating(false);
      setPropagationProgress(0);
    }, 2000);
  };

  const hasResults = Object.values(variations).some(v => v.text !== '');
  const charCount = masterCaption.length;
  const isXLimitExceeded = charCount > 280;

  return (
    <div className="min-h-screen bg-onyx text-slate-200 flex flex-col">
      {/* Studio Header */}
      <nav className="border-b border-white/5 bg-onyx/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">OmniFlow<span className="text-indigo-400">.Studio</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Engine</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">v1.0.4</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {hasResults && (
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Réinitialiser
              </button>
            )}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar: Connections */}
        <aside className="w-80 border-r border-white/5 bg-onyx/50 hidden xl:flex flex-col p-6 space-y-8 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3 h-3" />
              Connecteurs Sociaux
            </h3>
            <SocialConnector />
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Sponsorisé
            </h3>
            <AdPlaceholder type="SIDE" />
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>Status</span>
              <span className="text-green-500">Operational</span>
            </div>
            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
              <p className="text-[10px] text-indigo-300 leading-relaxed">
                OmniFlow est Privacy-First. Vos tokens sont stockés localement.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Studio Area */}
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent">
          <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-10">
            
            {/* Ad Leaderboard */}
            <AdPlaceholder type="TOP" />

            {/* Editor Zone */}
            <section className="space-y-6">
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                  <MediaUploader />
                </div>
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Éditeur Master
                    </label>
                    <div className={cn(
                      "text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 transition-colors",
                      isXLimitExceeded ? "text-red-400 border-red-400/20 bg-red-400/5" : "text-slate-500"
                    )}>
                      {charCount} / 280 (X Limit)
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition-opacity" />
                    <textarea
                      value={masterCaption}
                      onChange={(e) => setMasterCaption(e.target.value)}
                      placeholder="Écrivez votre idée ici... L'IA s'occupe de l'adapter pour chaque réseau."
                      className="relative w-full h-48 bg-onyx border border-white/10 rounded-2xl p-6 text-lg focus:ring-0 focus:border-indigo-500/50 outline-none transition-all resize-none placeholder:text-slate-700"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !masterCaption.trim()}
                      className={cn(
                        "flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all",
                        "bg-white text-black hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Génération IA...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Générer les Variantes
                        </>
                      )}
                    </button>
                    {hasResults && (
                      <div className="w-48">
                        <PropagateButton onClick={handlePropagate} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Propagation Progress */}
            <AnimatePresence>
              {isPropagating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="glass-studio p-6 space-y-4"
                >
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2">
                      <Activity className="w-3 h-3 animate-pulse text-indigo-400" />
                      Propagation en cours...
                    </span>
                    <span>{Math.round(propagationProgress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                      animate={{ width: `${propagationProgress}%` }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Grid */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/5" />
                <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Share2 className="w-3 h-3" />
                  Aperçus des Plateformes
                </h2>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <AnimatePresence mode="wait">
                {!hasResults && !isGenerating ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-80 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-slate-600 p-8 text-center"
                  >
                    <Sparkles className="w-10 h-10 mb-4 opacity-20" />
                    <p className="text-sm">Vos aperçus apparaîtront ici après la génération.</p>
                  </motion.div>
                ) : isGenerating ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="glass-studio h-64 animate-pulse" />
                    ))}
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {platforms.map((platform, idx) => (
                      <React.Fragment key={platform}>
                        <PlatformCard platform={platform} />
                        {idx === 1 && <AdPlaceholder type="INLINE" />}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};
