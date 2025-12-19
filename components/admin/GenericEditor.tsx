import React, { useState } from 'react';
import { SketchyButton } from '../UI';
import { supabase } from '../../supabaseClient';
import { Upload, X } from 'lucide-react';

export interface FieldConfig {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'select' | 'array' | 'array-tags' | 'image';
    options?: string[]; // for select
    placeholder?: string;
    required?: boolean;
}

interface GenericEditorProps<T> {
    initialData: Partial<T>;
    fields: FieldConfig[];
    onSave: (data: Partial<T>) => void;
    onCancel: () => void;
}

type FormValue = string | number | string[] | undefined;
type FormData = Record<string, FormValue>;

export const GenericEditor = <T extends Record<string, FormValue>>({ initialData, fields, onSave, onCancel }: GenericEditorProps<T>) => {
    const [formData, setFormData] = useState<FormData>(initialData as FormData);
    const [uploading, setUploading] = useState(false);

    const handleChange = (key: string, value: FormValue) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleArrayChange = (key: string, value: string) => {
        handleChange(key, value.split(';').map(s => s.trim()).filter(Boolean));
    };

    const handleFileUpload = async (key: string, file: File) => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            handleChange(key, data.publicUrl);
        } catch (error: any) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData as unknown as Partial<T>); }} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {fields.map(field => (
                    <div key={field.key} className={field.type === 'textarea' || field.type === 'array' ? "md:col-span-2" : ""}>
                        <label className="block text-emerald-400 text-sm font-bold mb-2">{field.label}</label>

                        {field.type === 'textarea' && (
                            <textarea
                                className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none h-32"
                                value={formData[field.key] || ''}
                                onChange={e => handleChange(field.key, e.target.value)}
                                required={field.required}
                            />
                        )}

                        {(field.type === 'text' || field.type === 'number') && (
                            <input
                                type={field.type}
                                className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none"
                                value={formData[field.key] || ''}
                                onChange={e => handleChange(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                required={field.required}
                            />
                        )}

                        {field.type === 'select' && (
                            <select
                                className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none"
                                value={formData[field.key] || ''}
                                onChange={e => handleChange(field.key, e.target.value)}
                                required={field.required}
                            >
                                <option value="">Wybierz...</option>
                                {field.options?.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        )}

                        {field.type === 'image' && (
                            <div className="border-2 border-dashed border-emerald-800 rounded-xl p-4 text-center hover:bg-emerald-900/30 transition-colors">
                                {formData[field.key] ? (
                                    <div className="relative inline-block group">
                                        <img
                                            src={formData[field.key] as string}
                                            alt="Preview"
                                            className="h-32 w-auto object-cover rounded-lg border border-lime-400/20 shadow-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleChange(field.key, '')}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer flex flex-col items-center justify-center h-32">
                                        <Upload className="text-emerald-400 mb-2" size={24} />
                                        <span className="text-emerald-300 text-sm font-medium">Kliknij, aby dodać zdjęcie</span>
                                        <span className="text-emerald-500/50 text-xs mt-1">MAX 2MB</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleFileUpload(field.key, file);
                                            }}
                                        />
                                    </label>
                                )}
                                {uploading && <div className="text-lime-400 text-xs mt-2 font-bold animate-pulse">Wysyłanie...</div>}
                            </div>
                        )}

                        {(field.type === 'array' || field.type === 'array-tags') && (
                            <div className="relative">
                                <textarea
                                    className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none h-24 font-mono text-sm"
                                    value={Array.isArray(formData[field.key]) ? (formData[field.key] as string[]).join('; ') : ''}
                                    onChange={e => handleArrayChange(field.key, e.target.value)}
                                    placeholder="Wartość 1; Wartość 2; Wartość 3..."
                                />
                                <span className="absolute bottom-2 right-2 text-[10px] text-emerald-500 bg-emerald-900 px-2 py-0.5 rounded">
                                    Oddziel średnikami (;)
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-6 gap-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 text-emerald-400 hover:text-white transition-colors">
                    Anuluj
                </button>
                <SketchyButton primary className="px-8" disabled={uploading}>
                    {uploading ? 'Wysyłanie...' : 'Zapisz Zmiany'}
                </SketchyButton>
            </div>
        </form>
    );
};
