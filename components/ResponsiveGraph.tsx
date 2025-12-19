import React from 'react';
import { motion } from 'framer-motion';

const WIDTH = 800;
const HEIGHT = 300;
const PADDING = { top: 20, right: 30, bottom: 40, left: 30 };
const MAX_COUNT = 180;

interface GraphPoint {
    year: number;
    count: number;
}

interface ResponsiveGraphProps {
    data: GraphPoint[];
}

export const ResponsiveGraph: React.FC<ResponsiveGraphProps> = ({ data }) => {
    if (!data || data.length === 0) return null;

    const sortedData = [...data].sort((a, b) => a.year - b.year);
    const minYear = sortedData[0].year;
    const maxYear = sortedData[sortedData.length - 1].year;

    const maxVal = Math.max(...data.map(d => d.count)) * 1.1;

    const getX = (year: number) => PADDING.left + ((year - minYear) / (maxYear - minYear)) * (WIDTH - PADDING.left - PADDING.right);
    const getY = (count: number) => HEIGHT - PADDING.bottom - (count / maxVal) * (HEIGHT - PADDING.top - PADDING.bottom);

    const points = sortedData.map(d => ({ x: getX(d.year), y: getY(d.count) }));

    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX = p0.x + (p1.x - p0.x) / 2;
        pathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    return (
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full overflow-visible">
            <defs>
                <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#84cc16" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
                </linearGradient>
            </defs>

            <line x1={PADDING.left} y1={HEIGHT - PADDING.bottom} x2={WIDTH - PADDING.right} y2={HEIGHT - PADDING.bottom} stroke="white" strokeOpacity="0.1" strokeWidth="2" />

            {[50, 100, 150].map(val => (
                <line key={val} x1={PADDING.left} y1={getY(val)} x2={WIDTH - PADDING.right} y2={getY(val)} stroke="white" strokeOpacity="0.05" strokeDasharray="4" />
            ))}

            <path
                d={`${pathD} L ${WIDTH - PADDING.right} ${HEIGHT - PADDING.bottom} L ${PADDING.left} ${HEIGHT - PADDING.bottom} Z`}
                fill="url(#gradient-area)"
            />

            <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
                d={pathD}
                fill="none"
                stroke="#84cc16"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {sortedData.map((point, i) => (
                <g key={i} className="group cursor-pointer">
                    <circle cx={getX(point.year)} cy={getY(point.count)} r="20" fill="transparent" />
                    <circle
                        cx={getX(point.year)}
                        cy={getY(point.count)}
                        r={i === sortedData.length - 1 ? 6 : 4}
                        fill={i === sortedData.length - 1 ? "#84cc16" : "white"}
                        stroke={i === sortedData.length - 1 ? "rgba(132, 204, 22, 0.4)" : "none"}
                        strokeWidth="4"
                        className="transition-all duration-300 group-hover:r-8 group-hover:fill-lime-400 group-hover:stroke-lime-400/30"
                    />
                    <text
                        x={getX(point.year)}
                        y={HEIGHT - 15}
                        textAnchor="middle"
                        fill="white"
                        className={`text-[10px] sm:text-xs font-mono tracking-wider transition-opacity duration-300 ${point.year === 2025 ? 'font-bold text-lime-400 opacity-100' : 'opacity-40 group-hover:opacity-100'}`}
                    >
                        {point.year}
                    </text>
                    <foreignObject
                        x={getX(point.year) - 40}
                        y={getY(point.count) - 50}
                        width="80"
                        height="40"
                        className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-y-1"
                    >
                        <div className="flex justify-center">
                            <div className="bg-emerald-950 border border-lime-400/50 text-lime-400 text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                {point.count} osób
                            </div>
                        </div>
                    </foreignObject>
                </g>
            ))}
        </svg>
    );
};
