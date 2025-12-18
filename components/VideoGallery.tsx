import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { GlassCard } from './UI';
import { VideoMetadata } from '../services/videoService';

interface VideoGalleryProps {
    videos: VideoMetadata[];
    onVideoSelect: (videoId: string) => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({ videos, onVideoSelect }) => {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {videos.map((vid, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                    className="relative group cursor-pointer"
                    onClick={() => onVideoSelect(vid.id)}
                >
                    <GlassCard className="!p-0 overflow-hidden relative aspect-video border-2 border-dashed border-emerald-600 group-hover:border-lime-400">
                        <div className="absolute inset-0 bg-emerald-900/20" />
                        <img
                            src={`https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`}
                            alt={vid.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`;
                            }}
                        />

                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-16 h-16 rounded-full bg-lime-400 flex items-center justify-center text-emerald-950 shadow-[0_0_20px_rgba(132,204,22,0.6)] group-hover:scale-110 transition-transform">
                                <Play fill="currentColor" size={28} className="ml-1" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-emerald-950/90 to-transparent pt-12">
                            <h4 className="text-white font-bold text-xl drop-shadow-md leading-tight line-clamp-2">{vid.title}</h4>
                            <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded text-white mt-2 inline-block">
                                Wideo
                            </span>
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    );
};
