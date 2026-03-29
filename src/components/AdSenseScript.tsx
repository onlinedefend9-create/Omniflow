import Script from 'next/script';

export const AdSenseScript = () => {
  const adSenseId = process.env.VITE_ADSENSE_CLIENT_ID; // Keeping the same env var for compatibility

  if (!adSenseId) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};
