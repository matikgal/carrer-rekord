import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, SectionHeader } from '../components/UI';
import { AlertTriangle, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { FloatingShapes } from '../components/FloatingShapes';
import { ContactForm } from '../components/ContactForm';
import { FaqSection } from '../components/FaqSection';
import { useCarouselDrag } from '../hooks/useCarouselDrag';
import { useAccordion } from '../hooks/useAccordion';
import { TimelineEvent, Testimonial, Faq } from '../types/database';

const HOW_WE_DO_IT = [
  { title: "Tryb pracy", desc: "50% Stacjonarnie / 50% Zdalnie. Uczymy się współpracy w obu modelach." },
  { title: "Mentoring", desc: "Twój kod sprawdzają Seniorzy. Code Review to nasza codzienna rutyna." },
  { title: "Team Projects", desc: "Praca w grupach 3-4 osobowych metodą Scrum. Daily, Sprinty, Retro." },
  { title: "Demo Day", desc: "Prezentacja efektów końcowych przed całym działem IT i Zarządem." },
  { title: "Stack", desc: "Korzystamy z tych samych narzędzi co w projektach komercyjnych (Jira, Git, CI/CD)." },
];

const MEMORIES = [
  { year: "2023", label: "Hackathon Zwycięzcy", rotate: -2 },
  { year: "2022", label: "Wyjazd Integracyjny", rotate: 2 },
  { year: "2021", label: "Pierwsze Demo Day", rotate: -1 },
  { year: "2020", label: "Praktyki Remote", rotate: 3 },
];

const StudentPracticesPage = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragConstraint = useCarouselDrag(carouselRef);
  const faqAccordion = useAccordion();

  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [memories, setMemories] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [recruitmentOpen, setRecruitmentOpen] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const [timelineRes, testimonialsRes, faqsRes, memoriesRes, settingsRes, projectsRes] = await Promise.all([
        supabase.from('timeline_events').select('*').eq('category', 'practices').order('created_at', { ascending: true }),
        supabase.from('testimonials').select('*'),
        supabase.from('faqs').select('*').eq('category', 'practices'),
        supabase.from('memories').select('*').order('year', { ascending: false }),
        supabase.from('app_settings').select('value').eq('key', 'recruitment_status').single(),
        supabase.from('internship_projects').select('*').order('created_at', { ascending: true })
      ]);

      if (timelineRes.data) setTimeline(timelineRes.data as TimelineEvent[]);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data as Testimonial[]);
      if (faqsRes.data) setFaqs(faqsRes.data as Faq[]);
      if (memoriesRes.data) setMemories(memoriesRes.data as any[]);
      if (settingsRes.data?.value) setRecruitmentOpen(settingsRes.data.value.isOpen);
      if (projectsRes.data) setProjects(projectsRes.data as any[]);
    };
    fetchContent();
  }, []);

  useEffect(() => {
    if (projects.length > 0 && !activeYear) {
      const years = Array.from(new Set(projects.map(p => p.year))).sort((a, b) => Number(b) - Number(a));
      if (years.length > 0) setActiveYear(years[0]);
    }
  }, [projects, activeYear]);

  // Reset slide when year changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeYear]);

  const nextSlide = () => {
    if (!activeYear) return;
    const yearProjects = projects.filter(p => p.year === activeYear);
    const maxSlides = Math.ceil(yearProjects.length / 2);
    setCurrentSlide(prev => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    if (!activeYear) return;
    const yearProjects = projects.filter(p => p.year === activeYear);
    const maxSlides = Math.ceil(yearProjects.length / 2);
    setCurrentSlide(prev => (prev - 1 + maxSlides) % maxSlides);
  };

  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="relative flex flex-col items-center text-center pt-8 min-h-[50vh] justify-center perspective-1000">
        <FloatingShapes />
        {!recruitmentOpen && (
          <motion.div
            initial={{ rotate: -5, y: -20, opacity: 0 }}
            animate={{ rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 bg-yellow-400 text-black font-black text-sm uppercase tracking-widest px-6 py-2 shadow-lg flex items-center gap-2 transform -rotate-2 relative z-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #facc15, #facc15 10px, #000 10px, #000 20px)'
            }}
          >
            <span className="bg-yellow-400 px-2 flex items-center gap-2 border border-black">
              <AlertTriangle size={16} /> Rekrutacja obecnie zamknięta
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl md:text-7xl font-black mb-6 relative z-10"
        >
          Praktyki Studenckie
        </motion.h1>
        <p className="text-xl text-emerald-200 max-w-xl relative z-10">
          Zdobądź doświadczenie w IT na ul. Kasprowicza 5. <br />
          <span className="font-hand text-lime-400 text-3xl font-bold">Coding is fun!</span>
        </p>
      </section>

      {/* TIMELINE */}
      {timeline.length > 0 && (
        <section>
          <SectionHeader title="Kalendarz praktyk" />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime-400 to-transparent dashed-line" />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.align === 'left' ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex items-center mb-8 ${item.align === 'right' ? 'md:flex-row-reverse' : ''} ${item.align === 'center' ? 'flex-col md:flex-col justify-center' : ''}`}
              >
                <div className={`w-full md:w-1/2 px-4 ${item.align === 'right' ? 'text-left' : item.align === 'center' ? 'text-center' : 'text-right'}`}>
                  <div className={`inline-block p-4 rounded-xl border-2 ${item.align === 'center' ? 'bg-lime-400 text-black border-black shadow-[4px_4px_0_0_#fff]' : 'bg-emerald-900/50 border-lime-400/30'}`}>
                    <div className="text-xl font-black font-hand">{item.date_display}</div>
                    <div className={`text-sm uppercase font-bold ${item.align === 'center' ? 'text-emerald-900' : 'text-emerald-400'}`}>{item.title}</div>
                  </div>
                </div>
                <div className="hidden md:block w-4 h-4 rounded-full bg-lime-400 border-4 border-emerald-900 z-10" />
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CAROUSEL */}
      <section>
        <SectionHeader title="Jak to robimy?" subtitle="Konkrety, zero parzenia kawy." />

        <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden p-4 -m-4">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -dragConstraint }}
            className="flex gap-8"
          >
            {HOW_WE_DO_IT.map((item, i) => (
              <motion.div
                key={i}
                className="min-w-[300px] md:min-w-[350px] h-[250px]"
                whileHover={{ scale: 1.02 }}
                initial={{ rotate: i % 2 === 0 ? 1 : -1 }}
              >
                <GlassCard className="h-full flex flex-col justify-center relative overflow-hidden group hover:border-lime-400/60">
                  <span className="absolute -right-4 -bottom-8 text-[8rem] font-black font-hand text-white/5 group-hover:text-lime-400/10 transition-colors select-none pointer-events-none leading-none">
                    0{i + 1}
                  </span>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-4 text-white group-hover:text-lime-400 transition-colors font-hand tracking-wide border-b-2 border-dashed border-white/10 pb-2 inline-block">
                      {item.title}
                    </h3>
                    <p className="text-emerald-200/90 text-lg leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <div className="text-center mt-6 text-emerald-500/50 text-sm font-hand">
          ← Przesuń, aby zobaczyć więcej →
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section>
          <SectionHeader title="Opinie uczestników" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                className="relative"
              >
                <div className="bg-white text-emerald-950 p-6 rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-sm shadow-[8px_8px_0_0_rgba(6,78,59,0.5)] relative z-10 font-hand text-lg leading-tight border-2 border-emerald-900">
                  <Quote className="text-lime-400 mb-2 opacity-50 absolute top-2 right-2" size={40} />
                  "{t.quote}"
                </div>
                <div className="mt-4 pl-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-lime-400 border-2 border-emerald-900 flex items-center justify-center font-bold text-emerald-900 shadow-md">
                    {t.name[0]}
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-xs text-lime-400 uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}


      {/* GALLERY (MEMORIES) */}
      {memories.length > 0 && (
        <section>
          <SectionHeader title="Wspomnienia" subtitle="Dzieje się u nas!" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
            {memories.map((mem, i) => (
              <motion.div
                key={mem.id || i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
                onMouseEnter={() => setActiveYear(mem.year)}
                className="relative bg-white p-3 pb-6 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform transition-transform duration-300 transform-gpu flex flex-col cursor-pointer"
                style={{ rotate: (i % 2 === 0 ? -2 : 2) }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-sm shadow-sm rotate-1 z-20"></div>

                <div className="bg-emerald-900 w-full aspect-square relative overflow-hidden group flex-shrink-0">
                  {mem.image_url ? (
                    <img src={mem.image_url} alt={mem.label} className="w-full h-full object-cover transition-all duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center">
                      <span className="text-4xl font-black text-white/10">{mem.year}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="pt-4 pb-2 text-center px-1 flex-grow flex flex-col justify-center">
                  <p className="font-hand font-bold text-2xl text-emerald-950 leading-none mb-1">{mem.year}</p>
                  <p className="font-hand text-sm text-emerald-800 leading-tight">{mem.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Projects History */}
          <AnimatePresence mode='wait'>
            {projects.length > 0 && activeYear && (
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-20"
              >
                <h3 className="text-3xl font-bold text-center text-white mb-12 font-hand">
                  Realizowane Projekty <span className="text-lime-400">{activeYear}</span>
                </h3>

                <div className="relative max-w-6xl mx-auto px-12">
                  {/* Navigation Buttons */}
                  {projects.filter(p => p.year === activeYear).length > 2 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-emerald-900/50 hover:bg-lime-400/20 rounded-full text-lime-400 transition-colors z-10"
                      >
                        <ChevronLeft size={32} />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-emerald-900/50 hover:bg-lime-400/20 rounded-full text-lime-400 transition-colors z-10"
                      >
                        <ChevronRight size={32} />
                      </button>
                    </>
                  )}

                  <div className="grid md:grid-cols-2 gap-8 relative overflow-hidden">
                    <motion.div
                      className="col-span-2 grid md:grid-cols-2 gap-8 cursor-grab active:cursor-grabbing"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = offset.x; // Distance swiped

                        if (swipe < -50) {
                          // Swiped left -> Next Slide
                          nextSlide();
                        } else if (swipe > 50) {
                          // Swiped right -> Prev Slide
                          prevSlide();
                        }
                      }}
                    >
                      {projects
                        .filter(p => p.year === activeYear)
                        .slice(currentSlide * 2, currentSlide * 2 + 2)
                        .map((project, i) => (
                          <GlassCard key={`${activeYear}-${i}`} className="flex flex-col h-full border-t-4 border-t-lime-400 min-h-[400px]">
                            <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                            <p className="text-emerald-200/80 mb-4 text-sm uppercase tracking-wide">{project.goal}</p>

                            <div className="mt-auto space-y-4">
                              {project.tools && (
                                <div>
                                  <span className="text-lime-400 text-xs font-bold uppercase block mb-1">Narzędzia</span>
                                  <p className="text-emerald-100 text-sm">{project.tools}</p>
                                </div>
                              )}
                              {project.skills && (
                                <div>
                                  <span className="text-lime-400 text-xs font-bold uppercase block mb-1">Zdobyte Umiejętności</span>
                                  <p className="text-emerald-100 text-sm">{project.skills}</p>
                                </div>
                              )}
                              <div className="pt-4 border-t border-emerald-500/30">
                                <span className="text-emerald-400 text-xs uppercase block mb-1">Zespół</span>
                                <p className="text-white font-hand text-lg">{project.team}</p>
                              </div>
                            </div>
                          </GlassCard>
                        ))}
                    </motion.div>
                  </div>
                </div>

                {/* Fallback if no projects for selected year */}
                {projects.filter(p => p.year === activeYear).length === 0 && (
                  <div className="text-center text-emerald-200/50 italic mt-8">
                    Brak projektów do wyświetlenia dla roku {activeYear}.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )
      }

      {/* FAQ */}
      {
        faqs.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <SectionHeader title="FAQ" subtitle="Pytania o praktyki" />
            <FaqSection
              items={faqs}
              activeIndex={faqAccordion.activeIndex}
              onToggle={faqAccordion.toggle}
            />
          </section>
        )
      }

      {/* CONTACT FORM */}
      <section className="pb-20">
        <ContactForm title="Chcesz zapytać o praktyki?" />
      </section>
    </div >
  );
};

export default StudentPracticesPage;