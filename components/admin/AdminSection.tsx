import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { DataTable } from './DataTable';
import { GenericEditor, FieldConfig } from './GenericEditor';
import { ConfirmationModal } from '../ConfirmationModal';

interface AdminSectionProps<T> {
    tableName: string;
    title: string;
    description?: string;
    fields: FieldConfig[];
    columns: any[];
    orderBy?: string; // column to order by
    filterBy?: keyof T; // column to filter by
}

export const AdminSection = <T extends { id: string } & Record<string, any>>({ tableName, title, description, fields, columns, orderBy = 'created_at', filterBy }: AdminSectionProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState<Partial<T> | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<T | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const { data: result } = await supabase.from(tableName).select('*').order(orderBy, { ascending: true });
        if (result) setData(result as T[]);
        setLoading(false);
    };

    // Derive unique filter values (e.g., categories)
    const filterOptions = filterBy
        ? ['all', ...Array.from(new Set(data.map(item => String(item[filterBy]))))]
        : [];

    // Reset filter when changing sections
    useEffect(() => {
        setActiveFilter('all');
    }, [tableName]);

    // Filter data
    const filteredData = (!filterBy || activeFilter === 'all')
        ? data
        : data.filter(item => String(item[filterBy]) === activeFilter);

    useEffect(() => {
        fetchData();
    }, [tableName, orderBy]);

    const handleSave = async (item: Partial<T>) => {
        if (item.id) {
            const { error } = await supabase.from(tableName).update(item).eq('id', item.id);
            if (error) alert(error.message);
        } else {
            const { error } = await supabase.from(tableName).insert([item]);
            if (error) alert(error.message);
        }
        setEditingItem(null);
        fetchData();
    };

    const handleDeleteClick = (item: T) => {
        setItemToDelete(item);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        await supabase.from(tableName).delete().eq('id', itemToDelete.id);
        fetchData();
        setDeleteModalOpen(false);
        setItemToDelete(null);
    };

    if (loading) return <div className="p-8 text-center text-emerald-500">Ładowanie danych...</div>;

    if (editingItem) {
        return (
            <div className="bg-emerald-900/40 p-6 rounded-2xl border border-lime-400/30">
                <h3 className="text-2xl font-bold text-white mb-6">{editingItem.id ? 'Edytuj' : 'Dodaj'} {title}</h3>
                <GenericEditor
                    initialData={editingItem}
                    fields={fields}
                    onSave={handleSave}
                    onCancel={() => setEditingItem(null)}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {description && <p className="text-emerald-200/60 text-sm mb-2">{description}</p>}

            {filterBy && (
                <div className="flex gap-2 flex-wrap">
                    {filterOptions.map(option => (
                        <button
                            key={option}
                            onClick={() => setActiveFilter(option)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${activeFilter === option
                                ? 'bg-lime-400 text-emerald-950 border-lime-400'
                                : 'bg-emerald-950/40 text-emerald-300 border-emerald-900/50 hover:bg-emerald-900'
                                }`}
                        >
                            {option === 'all' ? 'Wszystkie' : option}
                        </button>
                    ))}
                </div>
            )}

            <DataTable
                title={title}
                data={filteredData}
                columns={columns}
                onAdd={() => setEditingItem({})}
                onEdit={setEditingItem}
                onDelete={handleDeleteClick}
            />

            <ConfirmationModal
                isOpen={deleteModalOpen}
                title="Usuń element"
                message="Czy na pewno chcesz usunąć ten element? Tej operacji nie można cofnąć."
                onConfirm={confirmDelete}
                onCancel={() => setDeleteModalOpen(false)}
                confirmLabel="Usuń"
                cancelLabel="Anuluj"
                isDestructive
            />
        </div>
    );
};
