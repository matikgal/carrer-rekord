import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { GlassCard } from './UI';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqSectionProps {
    items: FaqItem[];
    activeIndex: number | null;
    onToggle: (index: number) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ items, activeIndex, onToggle }) => {
    return (
        <div className="space-y-4">
            {items.map((faq, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                >
                    <GlassCard noHover className={`!p-0 overflow-hidden transition-all duration-300 ${activeIndex === i ? 'border-lime-400 bg-emerald-900/60' : 'hover:bg-emerald-800/30'}`}>
                        <button
                            onClick={() => onToggle(i)}
                            className="w-full text-left p-6 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <HelpCircle className={`text-lime-400 transition-transform ${activeIndex === i ? 'rotate-12' : ''}`} size={24} />
                                <span className="text-lg font-bold text-white">{faq.question}</span>
                            </div>
                            <ChevronDown className={`text-emerald-400 transition-transform duration-300 ${activeIndex === i ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {activeIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                >
                                    <div className="p-6 pt-0 pl-16 text-emerald-200/90 leading-relaxed border-t border-dashed border-emerald-700/50">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    );
};
