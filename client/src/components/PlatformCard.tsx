import React from 'react';
import { useContentStore } from '../store/useContentStore';
import { Platform } from '@shared/types';
import { cn } from '../lib/utils';
import { 
  Copy, 
  Check, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MessageCircle,
  Music2,
  Facebook,
  Send as TelegramIcon,
  MessageSquare,
  Download,
  Share2,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cropImage } from '../lib/canvasUtils';

interface PlatformCardProps {
  platform: Platform;
}

const platformConfig: Record<Platform, { 
  name: string; 
  icon: React.ReactNode; 
  aspectRatio: number;
  aspectRatioClass: string;
  color: string;
  shareUrl?: (text: string, url: string) => string;
}> = {
  tiktok: { 
    name: 'TikTok', 
    icon: <Music2 className="w-4 h-4" />, 
    aspectRatio: 9/16,
    aspectRatioClass: 'aspect-[9/16]',
    color: 'text-[#00f2ea]'
  },
  instagram_reel: { 
    name: 'IG Reel', 
    icon: <Instagram className="w-4 h-4" />, 
    aspectRatio: 9/16,
    aspectRatioClass: 'aspect-[9/16]',
    color: 'text-[#e1306c]'
  },
  instagram_feed: { 
    name: 'IG Feed', 
    icon: <Instagram className="w-4 h-4" />, 
    aspectRatio: 1/1,
    aspectRatioClass: 'aspect-square',
    color: 'text-[#e1306c]'
  },
  x: { 
    name: 'X', 
    icon: <Twitter className="w-4 h-4" />, 
    aspectRatio: 16/9,
    aspectRatioClass: 'aspect-video',
    color: 'text-white',
    shareUrl: (text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  },
  linkedin: { 
    name: 'LinkedIn', 
    icon: <Linkedin className="w-4 h-4" />, 
    aspectRatio: 4/5,
    aspectRatioClass: 'aspect-[4/5]',
    color: 'text-[#0077b5]',
    shareUrl: (_, url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  },
  threads: { 
    name: 'Threads', 
    icon: <MessageCircle className="w-4 h-4" />, 
    aspectRatio: 16/9,
    aspectRatioClass: 'aspect-video',
    color: 'text-white'
  },
  facebook: { 
    name: 'Facebook', 
    icon: <Facebook className="w-4 h-4" />, 
    aspectRatio: 1.91/1,
    aspectRatioClass: 'aspect-[1.91/1]',
    color: 'text-[#1877f2]',
    shareUrl: (_, url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  whatsapp: { 
    name: 'WhatsApp', 
    icon: <MessageSquare className="w-4 h-4" />, 
    aspectRatio: 16/9,
    aspectRatioClass: 'aspect-video',
    color: 'text-[#25d366]',
    shareUrl: (text) => `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
  },
  telegram: { 
    name: 'Telegram', 
    icon: <TelegramIcon className="w-4 h-4" />, 
    aspectRatio: 16/9,
    aspectRatioClass: 'aspect-video',
    color: 'text-[#0088cc]',
    shareUrl: (text) => `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`
  },
};

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  const { variations, mediaUrl, mediaType, publishStatus } = useContentStore();
  const content = variations[platform];
  const status = publishStatus[platform];
  const config = platformConfig[platform];
  const [copied, setCopied] = React.useState(false);
  const [isCropping, setIsCropping] = React.useState(false);

  const handleCopy = async () => {
    const textToCopy = `${content.text}\n\n${content.hashtags?.map(h => `#${h}`).join(' ') || ''}`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (config.shareUrl) {
      const text = `${content.text}\n\n${content.hashtags?.map(h => `#${h}`).join(' ') || ''}`;
      window.open(config.shareUrl(text, window.location.href), '_blank');
    }
  };

  const handleDownloadCropped = async () => {
    if (!mediaUrl || mediaType !== 'image') return;
    setIsCropping(true);
    try {
      const croppedDataUrl = await cropImage(mediaUrl, config.aspectRatio);
      const link = document.createElement('a');
      link.href = croppedDataUrl;
      link.download = `omnipost-${platform}.jpg`;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsCropping(false);
    }
  };

  if (!content.text) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-studio p-6 space-y-4 group relative overflow-hidden flex flex-col"
    >
      {/* Platform Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg bg-white/5",
            config.color
          )}>
            {config.icon}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{config.name}</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              {platform === 'tiktok' || platform === 'instagram_reel' ? 'Vertical' : 'Post'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded"
              >
                <Check className="w-3 h-3" />
                Publié
              </motion.div>
            )}
            {status === 'pending' && (
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            )}
          </AnimatePresence>
          <button 
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            title="Copier le texte"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content Preview */}
      <div className="relative group/content flex-1">
        <textarea
          value={content.text}
          readOnly
          className="w-full h-32 bg-white/5 border border-white/5 rounded-xl p-4 text-sm text-slate-300 focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500/30 outline-none transition-all resize-none leading-relaxed"
          placeholder="En attente de génération..."
        />
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-600">
          {content.text.length} chars
        </div>
      </div>

      {/* Media Preview (if exists) */}
      <div className={cn("relative rounded-xl bg-white/5 border border-white/5 overflow-hidden flex items-center justify-center group/media", config.aspectRatioClass)}>
        {mediaUrl ? (
          mediaType === 'image' ? (
            <img 
              src={mediaUrl} 
              alt="Preview" 
              className="w-full h-full object-cover opacity-80 group-hover/media:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
          ) : (
            <video src={mediaUrl} className="w-full h-full object-cover opacity-80 group-hover/media:opacity-100 transition-opacity" muted loop autoPlay playsInline />
          )
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-widest">No Media</span>
          </div>
        )}
        
        {/* Actions Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity flex flex-col justify-end p-4">
          {mediaUrl && mediaType === 'image' && (
            <button
              onClick={handleDownloadCropped}
              disabled={isCropping}
              className="w-full py-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 text-[10px] font-bold uppercase"
            >
              {isCropping ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
              Exporter Format {config.name}
            </button>
          )}
        </div>
      </div>

      {/* Success Overlay */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-green-500/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-none z-10"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="bg-green-500 text-white p-4 rounded-full shadow-xl shadow-green-500/40"
            >
              <Check className="w-10 h-10 stroke-[3]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
