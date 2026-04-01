"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface YouTubeData {
  title: string;
  subscriberCount: string;
  videoCount: string;
}

export default function ConnectedPlatforms() {
  const { data: session, status } = useSession();
  const [youtubeData, setYoutubeData] = useState<YouTubeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchYouTubeData() {
      if ((session as any)?.provider === "google") {
        setIsLoading(true);
        try {
          const response = await fetch("/api/youtube");
          const data = await response.json();

          if (data.error) {
            setError(data.error);
          } else {
            setYoutubeData(data);
          }
        } catch (err) {
          setError("YouTube API error");
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (status === "authenticated") {
      fetchYouTubeData();
    }
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 border rounded-lg max-w-md w-full bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Connected Platforms</h2>
      
      {(session as any)?.provider === "google" ? (
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-gray-500 animate-pulse">Fetching YouTube data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : youtubeData ? (
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Channel Name</span>
                <span className="font-medium">{youtubeData.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subscribers count</span>
                <span className="font-medium">{youtubeData.subscriberCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Videos count</span>
                <span className="font-medium">{youtubeData.videoCount}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No YouTube channel found.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Connect a Google account to view YouTube statistics.</p>
      )}
    </div>
  );
}
