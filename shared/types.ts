export type Platform = 'tiktok' | 'instagram_reel' | 'instagram_feed' | 'x' | 'linkedin' | 'threads' | 'facebook' | 'whatsapp' | 'telegram';

export interface GeneratedContent {
  text: string;
  hashtags?: string[];
}

export type PublishStatus = 'idle' | 'pending' | 'success' | 'error';

export interface OAuthTokens {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  id?: string;
  [key: string]: any;
}
