import React from 'react';

export const BackgroundGrid: React.FC = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-lime-400/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full" />
    </div>
);
