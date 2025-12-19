import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, ArrowRight, Code2, BrainCircuit, Users, Terminal, LucideIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { InternshipPath as DBInternshipPath, TimelineEvent, Faq } from '../types/database';
import { GlassCard, SectionHeader, SketchyButton, Tag } from '../components/UI';
import { FloatingShapes } from '../components/FloatingShapes';
import { useAccordion } from '../hooks/useAccordion';

// Mapping utility for icons (since we store icon names in DB)
const ICON_MAP: Record<string, LucideIcon> = {
  Code2, BrainCircuit, Users, Terminal
};

// Hardcoded content removed - fetched from DB


const InternshipPage = () => {
  const accordion = useAccordion(0);
  const [paths, setPaths] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [programGoals, setProgramGoals] = useState<{ title: string, value: string, subtitle: string }[]>([]);
  const [rules, setRules] = useState<{ rule: string }[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const [pathsRes, timelineRes, goalsRes, rulesRes] = await Promise.all([
        supabase.from('internship_paths').select('*').order('created_at', { ascending: true }),
        supabase.from('timeline_events').select('*').eq('category', 'internship').order('date_display', { ascending: true }),
        supabase.from('program_goals').select('*').order('display_order', { ascending: true }),
        supabase.from('internship_rules').select('*').order('display_order', { ascending: true })
      ]);

      if (pathsRes.data) {
        setPaths((pathsRes.data as DBInternshipPath[]).map(p => ({
          ...p,
          icon: ICON_MAP[p.icon_name] || Code2 // Fallback icon
        })));
      }

      if (timelineRes.data) setTimeline(timelineRes.data as TimelineEvent[]);
      if (goalsRes.data) setProgramGoals(goalsRes.data as { title: string, value: string, subtitle: string }[]);
      if (rulesRes.data) setRules(rulesRes.data as { rule: string }[]);
    };
    fetchContent();
  }, []);

  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center pt-10 perspective-1000">
        <FloatingShapes />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.h1 className="text-5xl md:text-7xl font-black mb-6 font-hand text-white drop-shadow-[4px_4px_0_#064e3b]">
            Programy <span className="text-lime-400 italic underline decoration-wavy decoration-emerald-500/50">Stażowe</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-12 max-w-2xl mx-auto font-light">
            Rozpocznij karierę pod okiem ekspertów. Płatny staż, elastyczne godziny i realne projekty.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {["6 miesięcy", "Mentoring", "Praktyczne projekty", "Certyfikaty"].map((text, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 2 : -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="px-6 py-3 rounded-full bg-emerald-900/40 border border-lime-400/30 backdrop-blur-md shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                  <span className="font-bold font-hand text-lg text-lime-400 tracking-wide">{text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CRITERIA */}
      <section className="max-w-4xl mx-auto">
        <GlassCard className="border-l-8 border-l-lime-400 !rounded-none relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-emerald-800/20">
            <Check size={200} />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 font-hand flex items-center">
              <span className="w-8 h-8 rounded-full bg-lime-400 text-black flex items-center justify-center mr-3 text-lg font-black">?</span>
              Kryteria kwalifikacji
            </h3>
            <p className="text-lg leading-relaxed text-emerald-100">
              O możliwość realizacji stażu mogą aplikować studenci ostatnich lat kierunków informatycznych (lub pokrewnych),
              którzy chcą zdobyć pierwsze komercyjne doświadczenie i są dostępni min. 20h tygodniowo.
              Pasja do kodu jest ważniejsza niż wpisy w indeksie!
            </p>
          </div>
        </GlassCard>
      </section>

      {/* GOALS GRID */}
      <section>
        <SectionHeader title="Założenia Programu" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programGoals.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, rotateY: 10 }}
              style={{ perspective: 1000 }}
            >
              <GlassCard className="h-full flex flex-col justify-between border-t-4 border-t-lime-400">
                <h4 className="text-emerald-400 uppercase text-xs tracking-widest font-bold mb-2">{card.title}</h4>
                <div className="text-3xl font-black font-hand text-white mb-1">{card.value}</div>
                <div className="text-sm text-emerald-200/50">{card.subtitle}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      {timeline.length > 0 && (
        <section>
          <SectionHeader title="Oś czasu" subtitle="Szybka ścieżka do kariery" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start relative gap-8 md:gap-0">
            <div className="hidden md:block absolute top-[23px] left-0 w-full h-1 border-t-2 border-dashed border-lime-400/30 -z-10" />
            
            {/* Mobile Vertical Line */}
            <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-lime-400/30 -translate-x-1/2 -z-10" />

            {timeline.map((step, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_1fr] md:flex md:flex-col gap-4 md:gap-2 items-center group w-full md:w-auto">
                
                {/* Mobile Left Text (Odd index) */}
                <div className={`md:hidden text-right ${i % 2 !== 0 ? 'opacity-100' : 'opacity-0'}`}>
                  {i % 2 !== 0 && (
                    <>
                      <div className="font-hand font-bold text-2xl text-white group-hover:text-lime-400 transition-colors">{step.date_display}</div>
                      <div className="text-sm uppercase tracking-wide text-emerald-400">{step.title}</div>
                    </>
                  )}
                </div>

                {/* Circle */}
                <div className="w-12 h-12 rounded-full bg-emerald-900 border-2 border-lime-400 flex items-center justify-center font-bold text-lime-400 z-10 shadow-[0px_0px_10px_rgba(132,204,22,0.5)] group-hover:scale-110 transition-transform flex-shrink-0">
                  {i + 1}
                </div>

                {/* Mobile Right Text (Even index) */}
                <div className={`md:hidden text-left ${i % 2 === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  {i % 2 === 0 && (
                    <>
                      <div className="font-hand font-bold text-2xl text-white group-hover:text-lime-400 transition-colors">{step.date_display}</div>
                      <div className="text-sm uppercase tracking-wide text-emerald-400">{step.title}</div>
                    </>
                  )}
                </div>

                {/* Desktop Text */}
                <div className="hidden md:block md:text-center mt-2">
                  <div className="font-hand font-bold text-2xl text-white group-hover:text-lime-400 transition-colors">{step.date_display}</div>
                  <div className="text-sm uppercase tracking-wide text-emerald-400">{step.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PATHS ACCORDION */}
      {paths.length > 0 && (
        <section className="max-w-4xl mx-auto">
          <SectionHeader title="Wybierz ścieżkę" subtitle="Znajdź technologię, w której czujesz się najlepiej." />
          <div className="space-y-6">
            {paths.map((item, i) => (
              <motion.div
                key={i}
                initial={false}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${accordion.isOpen(i) ? 'bg-emerald-900/40 border-lime-400 shadow-[0_0_20px_rgba(132,204,22,0.1)]' : 'bg-emerald-900/20 border-emerald-500/30 hover:border-lime-400/50'}`}
              >
                <button
                  onClick={() => accordion.toggle(i)}
                  className="w-full p-6 flex flex-col md:flex-row md:items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${accordion.isOpen(i) ? 'bg-lime-400 text-emerald-950' : 'bg-emerald-800 text-emerald-400'}`}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <span className={`text-xl md:text-2xl font-bold font-hand block ${accordion.isOpen(i) ? 'text-lime-400' : 'text-white'}`}>{item.title}</span>
                      <span className="text-sm text-emerald-400/80 font-mono hidden md:block">{item.subtitle}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                    <span className="md:hidden text-sm text-emerald-400/80 font-mono">{item.subtitle}</span>
                    <ChevronDown className={`transition-transform duration-300 ${accordion.isOpen(i) ? 'rotate-180 text-lime-400' : 'text-emerald-500'}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {accordion.isOpen(i) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 border-t border-dashed border-emerald-500/30">
                        <div className="grid md:grid-cols-2 gap-8 mt-6">
                          <div>
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2"><ArrowRight size={16} className="text-lime-400" /> O stażu</h4>
                            <p className="text-emerald-200/90 leading-relaxed mb-6">{item.description}</p>
                            <h4 className="font-bold text-white mb-3">Czego się nauczysz?</h4>
                            <ul className="space-y-2">
                              {item.learn_list?.map((l: string, idx: number) => (
                                <li key={idx} className="flex items-start text-sm text-emerald-200">
                                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 mr-2 shrink-0" />
                                  {l}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-emerald-950/30 rounded-xl p-5 border border-emerald-800/50 flex flex-col justify-between">
                            <div>
                              <h4 className="font-bold text-lime-400 font-hand text-lg mb-4">Tech Stack</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.stack_list?.map((tech: string) => (
                                  <Tag key={tech}>{tech}</Tag>
                                ))}
                              </div>
                            </div>

                            <div className="mt-8">
                              <SketchyButton className="w-full text-center text-sm py-3 justify-center">Aplikuj na {item.title}</SketchyButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* RULES */}
      <section className="bg-emerald-900/30 p-8 rounded-3xl border border-dashed border-emerald-600">
        <h3 className="text-xl font-bold mb-4 flex items-center text-lime-400">
          Zasady naboru
        </h3>
        <ul className="space-y-3">
          {rules.map((r, i) => (
            <li key={i} className="flex items-start text-emerald-100">
              <Check className="mr-3 text-lime-400 shrink-0" size={20} />
              <span>{r.rule}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="text-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="absolute inset-0 bg-lime-400/20 blur-[50px] rounded-full z-[-1]" />
          <GlassCard className="!p-12 border-2 border-lime-400 border-dashed transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <h2 className="text-4xl md:text-5xl font-black font-hand text-white mb-6">Gotowy dołączyć?</h2>
            <p className="text-xl text-emerald-200 mb-8 max-w-lg mx-auto">
              Miejsca szybko znikają. Nie czekaj na ostatnią chwilę – wyślij zgłoszenie już dziś!
            </p>
            <button className="group relative px-12 py-4 bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xl font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 translate-y-[100%] bg-white/30 blur-lg group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out" />
              <span className="relative">Aplikuj teraz</span>
            </button>
          </GlassCard>
        </motion.div>
      </section>
    </div>
  );
};

export default InternshipPage;