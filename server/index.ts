import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = 3000;
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

// Security Middlewares
app.use(cors({
  origin: APP_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rate limiting for publishing
const publishLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per window
  message: { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// OAuth Configs
const OAUTH_CONFIGS = {
  linkedin: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    scope: 'w_member_social profile openid email',
  },
  tiktok: {
    authUrl: 'https://www.tiktok.com/v2/auth/authorize/',
    tokenUrl: 'https://open.tiktokapis.com/v2/oauth/token/',
    clientId: process.env.TIKTOK_CLIENT_ID,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
    scope: 'user.info.basic,video.upload,video.publish',
  },
  x: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    clientId: process.env.X_CLIENT_ID,
    clientSecret: process.env.X_CLIENT_SECRET,
    scope: 'tweet.read tweet.write users.read offline.access',
  }
};

const getRedirectUri = (platform: string) => {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000';
  return `${baseUrl}/api/auth/callback/${platform}`;
};

// API Endpoints
app.get('/api/auth/url/:platform', (req, res) => {
  const { platform } = req.params;
  const config = OAUTH_CONFIGS[platform as keyof typeof OAUTH_CONFIGS];

  if (!config || !config.clientId) {
    return res.status(400).json({ error: `Platform ${platform} not configured` });
  }

  const state = Math.random().toString(36).substring(7);
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: getRedirectUri(platform),
    scope: config.scope,
    state,
  });

  // X (Twitter) specific params
  if (platform === 'x') {
    params.append('code_challenge', 'challenge'); // Simplified for demo
    params.append('code_challenge_method', 'plain');
  }

  res.json({ url: `${config.authUrl}?${params.toString()}` });
});

app.get('/api/auth/callback/:platform', async (req, res) => {
  const { platform } = req.params;
  const { code, state } = req.query;
  const config = OAUTH_CONFIGS[platform as keyof typeof OAUTH_CONFIGS];

  if (!config || !config.clientId || !config.clientSecret) {
    return res.status(400).send('Platform not configured');
  }

  try {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code as string,
      redirect_uri: getRedirectUri(platform),
      client_id: config.clientId,
      client_secret: config.clientSecret,
    });

    // X (Twitter) specific params
    if (platform === 'x') {
      params.append('code_verifier', 'challenge');
    }

    const response = await axios.post(config.tokenUrl, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const tokens = response.data;

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'OAUTH_AUTH_SUCCESS', 
                platform: '${platform}',
                tokens: ${JSON.stringify(tokens)}
              }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentification réussie pour ${platform}. Cette fenêtre va se fermer.</p>
        </body>
      </html>
    `);
  } catch (error: any) {
    console.error('OAuth Error:', error.response?.data || error.message);
    res.status(500).send('Erreur lors de l\'échange de jetons');
  }
});

// Publishing Endpoints
app.post('/api/publish/:platform', publishLimiter, async (req, res) => {
  const { platform } = req.params;
  const { content, token, mediaUrl } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  // Strictly no-branding: Use only the user-provided text
  const cleanText = (content.text || '').trim();

  try {
    let response;
    switch (platform) {
      case 'linkedin':
        response = await axios.post('https://api.linkedin.com/v2/ugcPosts', {
          author: `urn:li:person:${token.id || 'MOCK_ID'}`,
          lifecycleState: 'PUBLISHED',
          specificContent: {
            'com.linkedin.ugc.ShareContent': {
              shareCommentary: { text: cleanText },
              shareMediaCategory: 'NONE'
            }
          },
          visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
        }, {
          headers: { 
            'Authorization': `Bearer ${token.access_token}`,
            'X-Restli-Protocol-Version': '2.0.0'
          }
        });
        break;

      case 'x':
        response = await axios.post('https://api.twitter.com/2/tweets', {
          text: cleanText
        }, {
          headers: { 'Authorization': `Bearer ${token.access_token}` }
        });
        break;

      case 'tiktok':
        // TikTok simulation - No branding added
        response = { data: { status: 'success', message: 'TikTok publish initiated (No-Branding)' } };
        break;

      default:
        return res.status(400).json({ error: 'Unsupported platform' });
    }

    res.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error(`Publish Error (${platform}):`, error.response?.data || error.message);
    // If it's a 401, the token might be expired
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(500).json({ error: `Failed to publish to ${platform}` });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

  // Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      root: 'client',
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'client/dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
