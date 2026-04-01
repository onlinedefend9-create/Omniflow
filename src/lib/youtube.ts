export async function getYouTubeChannelData(accessToken: string) {
  try {
    const response = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&mine=true",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("YouTube API error");
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const channel = data.items[0];

    return {
      title: channel.snippet.title,
      subscriberCount: channel.statistics.subscriberCount,
      videoCount: channel.statistics.videoCount,
    };
  } catch (error) {
    throw new Error("YouTube API error");
  }
}
