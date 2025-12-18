import { useState, useEffect } from 'react';
import { fetchVideoMetadata, VideoMetadata } from '../services/videoService';

export function useVideoLoader(urls: string[]) {
    const [videos, setVideos] = useState<VideoMetadata[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true);
            const promises = urls.map(url => fetchVideoMetadata(url));
            const results = await Promise.all(promises);
            setVideos(results.filter((v): v is VideoMetadata => v !== null));
            setLoading(false);
        };

        loadVideos();
    }, [urls]);

    return { videos, loading };
}
