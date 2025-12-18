import React from 'react';
import { motion } from 'framer-motion';

export const FloatingShapes: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        <motion.div
            animate={{
                y: [0, -60, 0],
                rotate: [0, 90, 180],
                x: [0, 30, 0],
                scale: [1, 1.1, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[10%] w-24 h-24 border-4 border-lime-400/30 rounded-3xl backdrop-blur-sm"
        />

        <motion.div
            animate={{
                y: [0, 40, 0],
                rotate: [0, -45, 0],
                x: [0, -20, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[25%] right-[15%] w-0 h-0 border-l-[40px] border-l-transparent border-b-[70px] border-b-emerald-500/20 border-r-[40px] border-r-transparent filter drop-shadow-lg"
        />

        <motion.div
            animate={{
                y: [0, -30, 0],
                x: [0, -40, 0],
                scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] left-[20%] w-32 h-32 border-8 border-dashed border-white/10 rounded-full"
        />

        <motion.div
            animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[40%] left-[50%] -translate-x-1/2 text-9xl font-black text-lime-400/10 font-sans pointer-events-none select-none"
        >
            +
        </motion.div>
    </div>
);
