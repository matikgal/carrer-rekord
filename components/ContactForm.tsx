import React from 'react';
import { UploadCloud, Paperclip } from 'lucide-react';
import { StickyNote } from './UI';

interface ContactFormProps {
    title: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ title }) => {
    return (
        <StickyNote title={title}>
            <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-emerald-800 mb-1">Imię</label>
                        <input type="text" className="w-full bg-white/50 border-b-2 border-emerald-800 p-2 focus:outline-none focus:bg-white/80 font-hand text-xl text-black placeholder-emerald-900/30" placeholder="Twoje imię..." />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-emerald-800 mb-1">Email</label>
                        <input type="email" className="w-full bg-white/50 border-b-2 border-emerald-800 p-2 focus:outline-none focus:bg-white/80 font-hand text-xl text-black placeholder-emerald-900/30" placeholder="email@domena.pl" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-1">Wiadomość</label>
                    <textarea rows={4} className="w-full bg-white/50 border-2 border-emerald-800/20 rounded-lg p-2 focus:outline-none focus:bg-white/80 focus:border-emerald-800 font-hand text-xl text-black placeholder-emerald-900/30 resize-none" placeholder="O co chcesz zapytać?" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">Załącz CV</label>
                    <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-emerald-800/40 rounded-lg cursor-pointer hover:bg-white/40 transition-colors group">
                        <div className="flex flex-col items-center">
                            <UploadCloud className="text-emerald-800/60 group-hover:text-emerald-900 mb-1" size={24} />
                            <span className="text-emerald-800/60 font-hand text-lg group-hover:text-emerald-900">Kliknij, aby dodać plik (PDF)</span>
                        </div>
                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    </label>
                </div>

                <button className="w-full mt-4 bg-emerald-800 text-yellow-100 font-bold py-3 rounded-lg hover:bg-emerald-900 transition-colors shadow-md flex items-center justify-center gap-2 group">
                    Wyślij wiadomość <Paperclip size={18} className="group-hover:rotate-45 transition-transform" />
                </button>
            </form>
        </StickyNote>
    );
};
