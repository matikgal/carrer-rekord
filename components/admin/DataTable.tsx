import React, { useState } from 'react';
import { GlassCard } from '../UI';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Column<T> {
    key: keyof T;
    label: string;
    render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
    onAdd: () => void;
    title: string;
}

export const DataTable = <T extends { id: string }>({ data, columns, onEdit, onDelete, onAdd, title }: DataTableProps<T>) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-emerald-950/20 p-4 rounded-xl border border-emerald-900/30">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold px-4 py-2 rounded-lg transition-colors border-2 border-transparent hover:border-lime-500 shadow-lg"
                >
                    <Plus size={18} /> Dodaj
                </button>
            </div>

            <div className="grid gap-3">
                {data.map((item) => (
                    <GlassCard key={item.id} className="flex justify-between items-center py-4 px-6 opacity-90 hover:opacity-100" noHover>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 items-center">
                            {columns.map(col => (
                                <div key={col.key as string} className="text-sm">
                                    <span className="block text-emerald-500/50 text-[10px] uppercase font-bold mb-1">{col.label}</span>
                                    <div className="text-emerald-100 font-medium truncate pr-4">
                                        {col.render ? col.render(item[col.key], item) : ((item[col.key] === undefined || item[col.key] === null) ? '' : String(item[col.key]))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 pl-4 border-l border-emerald-800/30 ml-4">
                            <button
                                onClick={() => onEdit(item)}
                                className="p-2 bg-emerald-800 hover:bg-lime-600 text-white rounded transition-colors"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => onDelete(item)}
                                className="p-2 bg-red-900/40 hover:bg-red-600 text-red-200 hover:text-white rounded transition-colors border border-red-900/50"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </GlassCard>
                ))}

                {data.length === 0 && (
                    <div className="text-center py-12 text-emerald-500/40 border-2 border-dashed border-emerald-900/50 rounded-xl">
                        Brak wpisów w tej sekcji.
                    </div>
                )}
            </div>
        </div>
    );
};
