import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { supabase } from '../supabaseClient';
import { SectionHeader, SketchyButton, GlassCard } from '../components/UI';
import { BackgroundGrid } from '../components/BackgroundGrid';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { session } = useAuth();

    React.useEffect(() => {
        if (session) {
            navigate('/admin');
        }
    }, [session, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <BackgroundGrid />
            <div className="w-full max-w-md px-4 relative z-10">
                <GlassCard className="p-8 border-2 border-emerald-500/30">
                    <SectionHeader title="Panel Admina" subtitle="Zaloguj się, aby zarządzać treścią." />

                    <form onSubmit={handleLogin} className="space-y-6 mt-6">
                        <div>
                            <label className="block text-emerald-100 font-bold mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-lime-400 outline-none"
                                placeholder="admin@rekord.pl"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-emerald-100 font-bold mb-2">Hasło</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-lime-400 outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        <SketchyButton
                            primary
                            className="w-full justify-center"
                            disabled={loading}
                        >
                            {loading ? 'Logowanie...' : 'Zaloguj się'}
                        </SketchyButton>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
};

export default LoginPage;
