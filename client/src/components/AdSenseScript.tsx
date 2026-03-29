import React from 'react';

/**
 * AdSenseScript component
 * Loads the Google AdSense script only in production mode.
 */
export const AdSenseScript: React.FC = () => {
  const isProduction = process.env.NODE_ENV === 'production' || import.meta.env.PROD;
  const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  React.useEffect(() => {
    if (isProduction && adsenseClientId) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [isProduction, adsenseClientId]);

  return null;
};
