import React, { useState } from 'react';
import { JobOffer } from '../../types/database';
import { SketchyButton } from '../UI';

interface OfferEditorProps {
    initialData: Partial<JobOffer>;
    onSave: (data: Partial<JobOffer>) => void;
}

export const OfferEditor: React.FC<OfferEditorProps> = ({ initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (field: keyof JobOffer, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (field: 'tags' | 'tech_stack' | 'responsibilities', value: string) => {
        setFormData(prev => ({ ...prev, [field]: value.split(',').map(s => s.trim()).filter(Boolean) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-emerald-400 text-sm font-bold mb-2">Tytuł stanowiska</label>
                    <input
                        type="text"
                        className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none"
                        value={formData.title || ''}
                        onChange={e => handleChange('title', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-emerald-400 text-sm font-bold mb-2">Wynagrodzenie</label>
                    <input
                        type="text"
                        className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none"
                        value={formData.salary || ''}
                        onChange={e => handleChange('salary', e.target.value)}
                        placeholder="np. 10 000 - 15 000 PLN netto"
                        required
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-emerald-400 text-sm font-bold mb-2">Lokalizacja</label>
                    <input
                        type="text"
                        className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none"
                        value={formData.location || ''}
                        onChange={e => handleChange('location', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-emerald-400 text-sm font-bold mb-2">Rodzaj umowy</label>
                    <input
                        type="text"
                        className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none"
                        value={formData.contract || ''}
                        onChange={e => handleChange('contract', e.target.value)}
                        placeholder="np. B2B / UoP"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-emerald-400 text-sm font-bold mb-2">Opis projektu</label>
                <textarea
                    className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none h-32"
                    value={formData.description || ''}
                    onChange={e => handleChange('description', e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="block text-emerald-400 text-sm font-bold mb-2">Obowiązki (oddziel przecinkami)</label>
                <textarea
                    className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none h-24"
                    value={formData.responsibilities?.join(', ') || ''}
                    onChange={e => handleArrayChange('responsibilities', e.target.value)}
                    placeholder="Tworzenie kodu, Code Review, Spotkania z klientem..."
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-emerald-400 text-sm font-bold mb-2">Tagi (oddziel przecinkami)</label>
                    <input
                        type="text"
                        className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none"
                        value={formData.tags?.join(', ') || ''}
                        onChange={e => handleArrayChange('tags', e.target.value)}
                        placeholder="#Remote, #React, #Senior"
                    />
                </div>
                <div>
                    <label className="block text-emerald-400 text-sm font-bold mb-2">Tech Stack (oddziel przecinkami)</label>
                    <input
                        type="text"
                        className="w-full bg-emerald-950 border border-emerald-700 rounded p-3 text-white focus:border-lime-400 outline-none"
                        value={formData.tech_stack?.join(', ') || ''}
                        onChange={e => handleArrayChange('tech_stack', e.target.value)}
                        placeholder="React, TypeScript, Node.js"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-6">
                <SketchyButton primary className="px-8">Zapisz Ofertę</SketchyButton>
            </div>
        </form>
    );
};
