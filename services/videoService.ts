export interface VideoMetadata {
    id: string;
    title: string;
    author: string;
    url: string;
}

export async function fetchVideoMetadata(url: string): Promise<VideoMetadata | null> {
    try {
        const res = await fetch(`https://noembed.com/embed?url=${url}`);
        const data = await res.json();
        const videoId = url.split('v=')[1]?.split('&')[0];

        if (!videoId) return null;

        return {
            id: videoId,
            title: data.title || "Wideo RekordIT",
            author: data.author_name || "RekordSI",
            url: url
        };
    } catch {
        return null;
    }
}
