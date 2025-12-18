import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Plus, Trash2, Shield, User, Lock } from 'lucide-react';
import { SketchyButton } from '../UI';
import { ConfirmationModal } from '../ConfirmationModal';

interface AdminUser {
    id: string;
    email: string;
    role: 'admin' | 'editor';
    created_at: string;
}

export const TeamEditor = () => {
    const [team, setTeam] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [newAdminInput, setNewAdminInput] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [newAdminRole, setNewAdminRole] = useState<'admin' | 'editor'>('editor');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Fetch team members
    const fetchTeam = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('admin_users_view')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;
            setTeam(data || []);
        } catch (err: any) {
            console.error('Error fetching team:', err);
            setError('Nie udało się pobrać listy zespołu.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    // Add new team member OR Create new user
    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAdminInput) return;

        try {
            setError(null);
            setSuccess(null);
            let targetUserId = newAdminInput.trim();

            // 1. If Password provided -> Create New User
            if (newAdminPassword) {
                if (!targetUserId.includes('@')) {
                    throw new Error('Do rejestracji wymagany jest poprawny adres email.');
                }
                const { data, error: createError } = await supabase
                    .rpc('create_user_with_password', {
                        email: targetUserId,
                        password: newAdminPassword
                    });

                if (createError) throw createError;
                targetUserId = data; // New User ID
                setSuccess(`Utworzono nowego użytkownika: ${newAdminInput}`);
            }
            // 2. If No Password -> Resolve Email to UUID (Existing User)
            else if (targetUserId.includes('@')) {
                const { data, error: rpcError } = await supabase
                    .rpc('get_user_id_by_email', { user_email: targetUserId });

                if (rpcError || !data) {
                    throw new Error('Nie znaleziono użytkownika o tym adresie email (lub brak uprawnień).');
                }
                targetUserId = data;
            }

            // 3. Add Role to Admins table
            const { error } = await supabase
                .from('admins')
                .insert([{ id: targetUserId, role: newAdminRole }]);

            if (error) {
                // If user is already in team
                if (error.code === '23505') throw new Error('Ten użytkownik jest już w zespole.');
                throw error;
            }

            setNewAdminInput('');
            setNewAdminPassword('');
            fetchTeam();
        } catch (err: any) {
            console.error('Error adding member:', err);
            setError(err.message || 'Nie udało się dodać członka zespołu.');
        }
    };

    // Remove team member (and delete account)
    const handleRemoveMember = async () => {
        if (!deleteId) return;

        try {
            // Call the secure RPC to delete the user completely (Auth + Admin table)
            const { error } = await supabase
                .rpc('delete_user_completely', { target_user_id: deleteId });

            if (error) throw error;

            fetchTeam();
            setDeleteId(null);
        } catch (err: any) {
            console.error('Error removing member:', err);
            setError('Nie udało się usunąć użytkownika. Upewnij się, że masz uprawnienia Administratora.');
        }
    };

    // Change role
    const handleChangeRole = async (id: string, newRole: 'admin' | 'editor') => {
        try {
            const { error } = await supabase
                .from('admins')
                .update({ role: newRole })
                .eq('id', id);

            if (error) throw error;
            fetchTeam();
        } catch (err: any) {
            console.error('Error changing role:', err);
            setError('Nie udało się zmienić roli. Wymagane uprawnienia super-admina.');
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-emerald-900/40 p-6 rounded-xl border border-emerald-500/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Plus size={20} className="text-lime-400" />
                    Dodaj członka zespołu
                </h3>
                <p className="text-emerald-200/60 text-sm mb-4">
                    Wpisz <strong>Email</strong> istniejącego użytkownika, aby go dodać.<br />
                    Lub wpisz <strong>Email</strong> oraz <strong>Hasło</strong>, aby stworzyć zupełnie nowe konto.
                </p>

                <form onSubmit={handleAddMember} className="flex flex-col md:flex-row gap-4 items-end flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs uppercase tracking-widest text-emerald-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={newAdminInput}
                            onChange={(e) => setNewAdminInput(e.target.value)}
                            placeholder="admin@example.com"
                            className="w-full bg-emerald-950/50 border border-emerald-500/30 rounded p-2 text-white focus:border-lime-400 outline-none font-mono"
                            required
                        />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs uppercase tracking-widest text-emerald-400 mb-1 flex items-center gap-2">
                            <Lock size={12} />
                            Hasło (Opcjonalne)
                        </label>
                        <input
                            type="password"
                            value={newAdminPassword}
                            onChange={(e) => setNewAdminPassword(e.target.value)}
                            placeholder="Tylko dla nowych kont..."
                            className="w-full bg-emerald-950/50 border border-emerald-500/30 rounded p-2 text-white focus:border-lime-400 outline-none placeholder:text-emerald-800"
                        />
                    </div>

                    <div className="w-full md:w-40">
                        <label className="block text-xs uppercase tracking-widest text-emerald-400 mb-1">Rola</label>
                        <select
                            value={newAdminRole}
                            onChange={(e) => setNewAdminRole(e.target.value as 'admin' | 'editor')}
                            className="w-full bg-emerald-950/50 border border-emerald-500/30 rounded p-2 text-white focus:border-lime-400 outline-none"
                        >
                            <option value="editor" className="bg-emerald-950 text-white">Edytor</option>
                            <option value="admin" className="bg-emerald-950 text-white">Administrator</option>
                        </select>
                    </div>
                    <SketchyButton type="submit" disabled={!newAdminInput} className="w-full md:w-auto self-end">
                        {newAdminPassword ? 'Zarejestruj' : 'Dodaj'}
                    </SketchyButton>
                </form>
                {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                {success && <p className="text-lime-400 text-sm mt-3">{success}</p>}
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-lime-400" />
                    Obecny Zespół
                </h3>

                {loading ? (
                    <p className="text-emerald-200">Ładowanie...</p>
                ) : (
                    <div className="grid gap-4">
                        {team.map((member) => (
                            <div key={member.id} className="bg-white/5 p-4 rounded-xl border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${member.role === 'admin' ? 'bg-lime-400/20 text-lime-400' : 'bg-emerald-400/20 text-emerald-400'}`}>
                                        {member.role === 'admin' ? <Shield size={20} /> : <User size={20} />}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">{member.email}</p>
                                        <p className="text-xs text-emerald-400 font-mono">{member.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <select
                                        value={member.role}
                                        onChange={(e) => handleChangeRole(member.id, e.target.value as 'admin' | 'editor')}
                                        className="bg-black/20 border border-emerald-500/30 rounded px-3 py-1 text-sm text-emerald-200 focus:border-lime-400 outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="editor" className="bg-emerald-950 text-white">Edytor</option>
                                        <option value="admin" className="bg-emerald-950 text-white">Administrator</option>
                                    </select>

                                    <button
                                        onClick={() => setDeleteId(member.id)}
                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                        title="Usuń z zespołu"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleRemoveMember}
                title="Usunąć użytkownika?"
                description="To trwale usunie konto użytkownika z całego systemu (Logowanie + Uprawnienia). Tej operacji nie można cofnąć."
            />
        </div>
    );
};
