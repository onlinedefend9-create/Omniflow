import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Platform, GeneratedContent, PublishStatus } from '@shared/types';

interface ContentState {
  mediaUrl: string | null;
  mediaType: 'image' | 'video' | null;
  masterCaption: string;
  isGenerating: boolean;
  isPropagating: boolean;
  propagationProgress: number;
  variations: Record<Platform, GeneratedContent>;
  tokens: Record<string, any | null>; // OAuth tokens
  publishStatus: Record<Platform, PublishStatus>;
  
  setMedia: (url: string | null, type: 'image' | 'video' | null) => void;
  setMasterCaption: (caption: string) => void;
  setGenerating: (isGenerating: boolean) => void;
  setPropagating: (isPropagating: boolean) => void;
  setPropagationProgress: (progress: number) => void;
  setVariation: (platform: Platform, content: GeneratedContent) => void;
  setAllVariations: (variations: Partial<Record<Platform, GeneratedContent>>) => void;
  setToken: (platform: string, token: any | null) => void;
  setPlatformPublishStatus: (platform: Platform, status: PublishStatus) => void;
  reset: () => void;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      mediaUrl: null,
      mediaType: null,
      masterCaption: '',
      isGenerating: false,
      isPropagating: false,
      propagationProgress: 0,
      variations: {
        tiktok: { text: '' },
        instagram_reel: { text: '' },
        instagram_feed: { text: '' },
        x: { text: '' },
        linkedin: { text: '' },
        threads: { text: '' },
        facebook: { text: '' },
        whatsapp: { text: '' },
        telegram: { text: '' },
      },
      tokens: {
        tiktok: null,
        linkedin: null,
        x: null,
      },
      publishStatus: {
        tiktok: 'idle',
        instagram_reel: 'idle',
        instagram_feed: 'idle',
        x: 'idle',
        linkedin: 'idle',
        threads: 'idle',
        facebook: 'idle',
        whatsapp: 'idle',
        telegram: 'idle',
      },

      setMedia: (url, type) => set({ mediaUrl: url, mediaType: type }),
      setMasterCaption: (masterCaption) => set({ masterCaption }),
      setGenerating: (isGenerating) => set({ isGenerating }),
      setPropagating: (isPropagating) => set({ isPropagating }),
      setPropagationProgress: (propagationProgress) => set({ propagationProgress }),
      setVariation: (platform, content) => 
        set((state) => ({ 
          variations: { ...state.variations, [platform]: content } 
        })),
      setAllVariations: (newVariations) => set((state) => ({ 
        variations: { ...state.variations, ...newVariations } 
      })),
      setToken: (platform, token) => 
        set((state) => ({ 
          tokens: { ...state.tokens, [platform]: token } 
        })),
      setPlatformPublishStatus: (platform, status) => 
        set((state) => ({ 
          publishStatus: { ...state.publishStatus, [platform]: status } 
        })),
      reset: () => set({
        mediaUrl: null,
        mediaType: null,
        masterCaption: '',
        isGenerating: false,
        isPropagating: false,
        propagationProgress: 0,
        variations: {
          tiktok: { text: '' },
          instagram_reel: { text: '' },
          instagram_feed: { text: '' },
          x: { text: '' },
          linkedin: { text: '' },
          threads: { text: '' },
          facebook: { text: '' },
          whatsapp: { text: '' },
          telegram: { text: '' },
        },
        publishStatus: {
          tiktok: 'idle',
          instagram_reel: 'idle',
          instagram_feed: 'idle',
          x: 'idle',
          linkedin: 'idle',
          threads: 'idle',
          facebook: 'idle',
          whatsapp: 'idle',
          telegram: 'idle',
        },
      }),
    }),
    {
      name: 'omnipost-v2-storage',
      partialize: (state) => ({ 
        masterCaption: state.masterCaption, 
        variations: state.variations,
        tokens: state.tokens 
      }),
    }
  )
);
