import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    isDestructive?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmLabel = "Potwierdź",
    cancelLabel = "Anuluj",
    isDestructive = false
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-emerald-950 border border-lime-400/20 rounded-2xl p-6 shadow-2xl overflow-hidden pointer-events-auto"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-400/50 to-transparent" />

                        <button
                            onClick={onCancel}
                            className="absolute top-4 right-4 text-emerald-400 hover:text-lime-400 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isDestructive ? 'bg-red-500/10 text-red-400' : 'bg-lime-400/10 text-lime-400'}`}>
                                <AlertTriangle size={32} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">
                                {title}
                            </h3>

                            <p className="text-emerald-200/70 mb-8">
                                {message}
                            </p>

                            <div className="flex gap-4 w-full">
                                <button
                                    onClick={onCancel}
                                    className="flex-1 py-3 px-4 rounded-xl font-medium border border-emerald-800 text-emerald-300 hover:bg-emerald-900/50 hover:text-white transition-colors"
                                >
                                    {cancelLabel}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-white transition-all shadow-lg ${isDestructive
                                        ? 'bg-red-600 hover:bg-red-500 shadow-red-900/20'
                                        : 'bg-lime-600 hover:bg-lime-500 shadow-lime-900/20'
                                        }`}
                                >
                                    {confirmLabel}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
