import React from 'react';
import { motion } from 'framer-motion';

interface ProcessStep {
    step: string;
    title: string;
    desc: string;
}

interface ProcessTimelineProps {
    steps: ProcessStep[];
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps }) => {
    return (
        <div className="relative max-w-4xl mx-auto px-4 md:px-0">
            <div className="hidden md:block absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-emerald-700 -translate-x-1/2" />

            <div className="space-y-12">
                {steps.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="relative flex flex-col md:flex-row items-center w-full min-h-[100px]"
                    >
                        <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-emerald-900 border-2 border-lime-400 flex items-center justify-center font-bold font-hand text-lg text-lime-400 z-10 shadow-[0_0_15px_rgba(132,204,22,0.3)]">
                            {item.step}
                        </div>

                        <div
                            className={`w-full md:w-1/2 pl-24 md:pl-0 pt-1 md:pt-0 ${i % 2 === 0
                                    ? 'md:text-right md:pr-16'
                                    : 'md:ml-auto md:text-left md:pl-16'
                                }`}
                        >
                            <h3 className="text-3xl font-bold text-white mb-2 tracking-wide group-hover:text-lime-400 transition-colors">{item.title}</h3>
                            <p className="text-emerald-200/70 leading-relaxed text-lg">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
