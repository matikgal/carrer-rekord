import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './UI';
import { useCarouselDrag } from '../hooks/useCarouselDrag';

interface ValueItem {
    title: string;
    desc: string;
}

interface ValuesCarouselProps {
    values: ValueItem[];
}

export const ValuesCarousel: React.FC<ValuesCarouselProps> = ({ values }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const dragConstraint = useCarouselDrag(carouselRef, values);

    return (
        <>
            <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden p-4 -m-4">
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -dragConstraint }}
                    className="flex gap-8"
                >
                    {values.map((item, i) => (
                        <motion.div
                            key={i}
                            className="min-w-[300px] md:min-w-[350px] h-[320px]"
                            whileHover={{ scale: 1.02, rotate: 0 }}
                            initial={{ rotate: i % 2 === 0 ? 1 : -1 }}
                        >
                            <GlassCard className="h-full flex flex-col justify-start relative overflow-hidden group hover:border-lime-400/60 pt-12">
                                <span className="absolute right-[-20px] top-[-40px] text-[14rem] font-black font-hand text-lime-400/5 group-hover:text-lime-400/10 transition-colors select-none pointer-events-none leading-none z-0">
                                    0{i + 1}
                                </span>

                                <div className="relative z-10 w-full">
                                    <h3 className="text-4xl font-black mb-4 text-white group-hover:text-lime-400 transition-colors">{item.title}</h3>
                                    <div className="h-1.5 w-16 bg-lime-400 mb-6 rounded-full" />
                                    <p className="text-emerald-200/90 text-lg leading-relaxed">{item.desc}</p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
            <div className="text-center mt-6 text-emerald-500/50 text-sm font-hand">
                ← Przesuń, aby zobaczyć więcej →
            </div>
        </>
    );
};
