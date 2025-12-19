import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { SectionHeader, GlassCard } from '../components/UI';
import { OfferEditor } from '../components/admin/OfferEditor';
import { LogOut, LayoutGrid, MessageSquare, Heart, Video, Calendar, Users, Briefcase, TrendingUp, Image, Database } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';

import { AdminSection } from '../components/admin/AdminSection';
import { FieldConfig } from '../components/admin/GenericEditor';

import {
    TABS,
    JOBS_FIELDS,
    FAQS_FIELDS,
    VALUES_FIELDS,
    TESTIMONIALS_FIELDS,
    INTERNSHIP_FIELDS,
    TIMELINE_FIELDS,
    VIDEO_FIELDS,
    STATS_FIELDS,
    GROWTH_FIELDS,
    MEMORIES_FIELDS,
    PROGRAM_GOALS_FIELDS,
    INTERNSHIP_RULES_FIELDS,
    PROJECTS_FIELDS,
} from '../components/admin/adminFields';

import { TeamEditor } from '../components/admin/TeamEditor';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('jobs');
    const { session, signOut } = useAuth();
    const [recruitmentOpen, setRecruitmentOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('app_settings').select('value').eq('key', 'recruitment_status').single();
            if (data?.value) {
                setRecruitmentOpen(data.value.isOpen);
            }
        };

        const checkRole = async () => {
            const { data } = await supabase.rpc('is_super_admin');
            setIsAdmin(!!data);
        };

        fetchSettings();
        checkRole();
    }, []);

    const toggleRecruitment = async () => {
        const newState = !recruitmentOpen;
        setRecruitmentOpen(newState);
        await supabase.from('app_settings').upsert({ key: 'recruitment_status', value: { isOpen: newState } });
    };

    const ALL_TABS = [
        ...TABS,
        { id: 'team', label: 'Zespół', icon: Users }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'jobs':
                return <AdminSection
                    tableName="job_offers"
                    title="Oferty Pracy"
                    fields={JOBS_FIELDS}
                    columns={[
                        { key: 'title', label: 'Stanowisko' },
                        { key: 'salary', label: 'Wynagrodzenie' },
                        { key: 'location', label: 'Lokalizacja' }
                    ]}
                />
            case 'faqs':
                return <AdminSection
                    tableName="faqs"
                    title="FAQ"
                    filterBy="category"
                    fields={FAQS_FIELDS}
                    columns={[
                        { key: 'question', label: 'Pytanie' },
                        { key: 'answer', label: 'Odpowiedź' },
                        { key: 'category', label: 'Kategoria' }
                    ]}
                />
            case 'values':
                return <AdminSection
                    tableName="company_values"
                    title="Wartości Firmy"
                    orderBy="display_order"
                    fields={VALUES_FIELDS}
                    columns={[
                        { key: 'display_order', label: '#' },
                        { key: 'title', label: 'Wartość' },
                        { key: 'description', label: 'Opis' }
                    ]}
                />
            case 'testimonials':
                return <AdminSection
                    tableName="testimonials"
                    title="Opinie Uczestników"
                    fields={TESTIMONIALS_FIELDS}
                    columns={[
                        { key: 'name', label: 'Osoba' },
                        { key: 'role', label: 'Rola' },
                        { key: 'quote', label: 'Opinia' }
                    ]}
                />
            case 'internship':
                return (
                    <div className="space-y-12">
                        <AdminSection
                            tableName="program_goals"
                            title="Założenia Programu"
                            orderBy="display_order"
                            fields={PROGRAM_GOALS_FIELDS}
                            columns={[
                                { key: 'display_order', label: '#' },
                                { key: 'title', label: 'Tytuł' },
                                { key: 'value', label: 'Wartość' }
                            ]}
                        />
                        <AdminSection
                            tableName="internship_rules"
                            title="Zasady Naboru"
                            orderBy="display_order"
                            fields={INTERNSHIP_RULES_FIELDS}
                            columns={[
                                { key: 'display_order', label: '#' },
                                { key: 'rule', label: 'Zasada' }
                            ]}
                        />
                        <AdminSection
                            tableName="internship_paths"
                            title="Ścieżki Stażowe"
                            fields={INTERNSHIP_FIELDS}
                            columns={[
                                { key: 'title', label: 'Ścieżka' },
                                { key: 'subtitle', label: 'Stack' },
                                { key: 'description', label: 'Opis' }
                            ]}
                        />
                    </div>
                );
            case 'timeline':
                return <AdminSection
                    tableName="timeline_events"
                    title="Oś Czasu"
                    filterBy="category"
                    fields={TIMELINE_FIELDS}
                    orderBy="created_at"
                    columns={[
                        { key: 'date_display', label: 'Data' },
                        { key: 'title', label: 'Wydarzenie' },
                        { key: 'description', label: 'Opis' },
                        { key: 'category', label: 'Kategoria' }
                    ]}
                />
            case 'videos':
                return <AdminSection
                    tableName="video_gallery"
                    title="Galeria Wideo"
                    fields={VIDEO_FIELDS}
                    columns={[
                        { key: 'title', label: 'Tytuł' },
                        { key: 'url', label: 'Link' }
                    ]}
                />
            case 'growth':
                return (
                    <div className="space-y-12">
                        <AdminSection
                            tableName="company_stats"
                            title="Statystyki Firmy"
                            orderBy="display_order"
                            fields={STATS_FIELDS}
                            columns={[
                                { key: 'display_order', label: '#' },
                                { key: 'label', label: 'Etykieta' },
                                { key: 'value', label: 'Wartość' }
                            ]}
                        />
                        <AdminSection
                            tableName="growth_points"
                            title="Punkty Wykresu"
                            orderBy="year"
                            fields={GROWTH_FIELDS}
                            columns={[
                                { key: 'year', label: 'Rok' },
                                { key: 'count', label: 'Wartość' }
                            ]}
                        />
                    </div>
                );
            case 'memories':
                return (
                    <div className="space-y-12">
                        <AdminSection
                            tableName="memories"
                            title="Galeria Zdjęć"
                            fields={MEMORIES_FIELDS}
                            orderBy="year"
                            columns={[
                                { key: 'year', label: 'Rok' },
                                { key: 'label', label: 'Etykieta' },
                                { key: 'image_url', label: 'URL Zdjęcia' }
                            ]}
                        />
                        <AdminSection
                            tableName="internship_projects"
                            title="Historia Projektów"
                            fields={PROJECTS_FIELDS}
                            orderBy="year"
                            columns={[
                                { key: 'year', label: 'Rok' },
                                { key: 'title', label: 'Projekt' },
                                { key: 'team', label: 'Zespół' }
                            ]}
                        />
                    </div>
                );
            case 'team':
                if (!isAdmin) return null;
                return (
                    <div className="max-w-4xl mx-auto">
                        <TeamEditor />
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen relative pt-20 pb-20 px-4">
            <div className="max-w-7xl mx-auto relative z-10">

                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <SectionHeader title="Panel CMS" subtitle="Zarządzaj treścią na stronie" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border transition-colors ${recruitmentOpen ? 'bg-lime-400/20 border-lime-400 text-lime-400' : 'bg-red-500/20 border-red-500 text-red-500'}`}>
                            <span className="text-sm font-bold font-hand uppercase tracking-widest">
                                Rekrutacja na praktyki: {recruitmentOpen ? 'OTWARTA' : 'ZAMKNIĘTA'}
                            </span>
                            <button
                                onClick={toggleRecruitment}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${recruitmentOpen ? 'bg-lime-400' : 'bg-red-900/50'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${recruitmentOpen ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <button onClick={signOut} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors bg-red-900/20 px-4 py-2 rounded-lg border border-red-900/50">
                            <LogOut size={18} /> Wyloguj
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[250px_1fr] gap-8">
                    {/* Sidebar Navigation */}
                    <div className="flex flex-col gap-2 mb-8 bg-black/20 p-2 rounded-2xl backdrop-blur-sm sticky top-4 z-50 border border-emerald-800/50 shadow-2xl self-start h-fit">
                        {ALL_TABS.filter(tab => tab.id !== 'team' || isAdmin).map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 font-bold ${isActive
                                        ? 'bg-lime-400 text-black shadow-[0_0_20px_rgba(132,204,22,0.3)] transform scale-105'
                                        : 'text-emerald-400 hover:bg-emerald-900/50 hover:text-emerald-200'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                    {/* Main Content Area */}
                    <div>
                        {renderContent()}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminPage;
