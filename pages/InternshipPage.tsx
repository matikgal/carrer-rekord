import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, ArrowRight, Code2, BrainCircuit, Users, Terminal } from 'lucide-react';
import { GlassCard, SectionHeader, SketchyButton, Tag } from '../components/UI';

const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
    {/* Floating Square */}
    <motion.div
      animate={{
        y: [0, -60, 0],
        rotate: [0, 90, 180],
        x: [0, 30, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[15%] left-[10%] w-24 h-24 border-4 border-lime-400/30 rounded-3xl backdrop-blur-sm"
    />
    
    {/* Floating Triangle (CSS Border Hack) */}
    <motion.div
      animate={{
        y: [0, 40, 0],
        rotate: [0, -45, 0],
        x: [0, -20, 0]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[25%] right-[15%] w-0 h-0 border-l-[40px] border-l-transparent border-b-[70px] border-b-emerald-500/20 border-r-[40px] border-r-transparent filter drop-shadow-lg"
    />

    {/* Floating Circle/Donut */}
    <motion.div
      animate={{
        y: [0, -30, 0],
        x: [0, -40, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[20%] left-[20%] w-32 h-32 border-8 border-dashed border-white/10 rounded-full"
    />

    {/* Floating Cross */}
    <motion.div
      animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute top-[40%] left-[50%] -translate-x-1/2 text-9xl font-black text-lime-400/10 font-sans pointer-events-none select-none"
    >
      +
    </motion.div>
  </div>
);

const InternshipPage = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const accordions = [
    { 
      title: "Staż Dział Wdrożeń", 
      subtitle: "SQL, ERP, Kontakt z klientem",
      desc: "Idealny start dla osób, które lubią łączyć wiedzę techniczną z biznesową. Nie tylko kodujemy, ale rozwiązujemy realne problemy klientów.",
      learn: ["Zaawansowany SQL (T-SQL)", "Konfiguracja systemów ERP", "Analiza procesów biznesowych", "Miękkie umiejętności pracy z klientem"],
      stack: ["MS SQL", "Crystal Reports", "Jira", "Excel"],
      icon: Users
    },
    { 
      title: "Staż Frontend", 
      subtitle: "React, Design Systems, UX",
      desc: "Dołącz do zespołu tworzącego nowoczesne interfejsy. Będziesz pracować ramię w ramię z designerami i seniorami nad naszą nową platformą.",
      learn: ["React 18/19 & Hooks", "Tailwind CSS & Framer Motion", "Optymalizacja wydajności", "Praca z REST API"],
      stack: ["React", "TypeScript", "Vite", "Figma"],
      icon: Code2
    },
    { 
      title: "Staż Backend", 
      subtitle: ".NET, Architektura, API",
      desc: "Zanurz się w logice biznesowej i wydajności. Poznasz architekturę mikroserwisów i dowiesz się, jak budować skalowalne systemy.",
      learn: ["C# / .NET Core", "Projektowanie API (REST/GraphQL)", "Wzorce projektowe (SOLID)", "Unit Testing"],
      stack: [".NET 8", "PostgreSQL", "Docker", "RabbitMQ"],
      icon: Terminal
    },
    { 
      title: "Staż DevOps", 
      subtitle: "Cloud, CI/CD, Automatyzacja",
      desc: "Dla fanów infrastruktury i automatyzacji. Pomożesz nam utrzymać chmurę i usprawnić procesy wdrażania oprogramowania.",
      learn: ["Konteneryzacja aplikacji", "Zarządzanie chmurą Azure", "Tworzenie potoków CI/CD", "Monitoring systemów"],
      stack: ["Docker", "Kubernetes", "Terraform", "GitHub Actions"],
      icon: BrainCircuit
    }
  ];

  return (
    <div className="space-y-24">
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center pt-10 perspective-1000">
        <FloatingShapes />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-6 font-hand text-white drop-shadow-[4px_4px_0_#064e3b]"
          >
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

      {/* CRITERIA SECTION */}
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
          {[
            { title: "Czas trwania", val: "6 miesięcy", sub: "Intensywna nauka" },
            { title: "Formuła", val: "Umowa", sub: "Płatny staż" },
            { title: "Zakres godzin", val: "80-100h", sub: "Elastyczny grafik" },
            { title: "Organizacja", val: "Hybrid", sub: "Biuro + Remote" }
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, rotateY: 10 }}
              style={{ perspective: 1000 }}
            >
              <GlassCard className="h-full flex flex-col justify-between border-t-4 border-t-lime-400">
                <h4 className="text-emerald-400 uppercase text-xs tracking-widest font-bold mb-2">{card.title}</h4>
                <div className="text-3xl font-black font-hand text-white mb-1">{card.val}</div>
                <div className="text-sm text-emerald-200/50">{card.sub}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RECRUITMENT TIMELINE (Horizontal/Hybrid) */}
      <section>
        <SectionHeader title="Oś czasu" subtitle="Szybka ścieżka do kariery" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start relative gap-8 md:gap-0">
          {/* Sketchy Line */}
          <div className="hidden md:block absolute top-[23px] left-0 w-full h-1 border-t-2 border-dashed border-lime-400/30 -z-10" />
          
          {[
            { date: "10.08", title: "Aplikacja" },
            { date: "19.08", title: "Analiza" },
            { date: "21.08", title: "Rozmowy" },
            { date: "28.08", title: "Wyniki" },
            { date: "02.09", title: "Start" }
          ].map((step, i) => (
            <div key={i} className="flex md:flex-col items-center gap-4 md:gap-2 group">
              <div className="w-12 h-12 rounded-full bg-emerald-900 border-2 border-lime-400 flex items-center justify-center font-bold text-lime-400 z-10 shadow-[0px_0px_10px_rgba(132,204,22,0.5)] group-hover:scale-110 transition-transform">
                {i + 1}
              </div>
              <div className="md:text-center">
                <div className="font-hand font-bold text-2xl text-white group-hover:text-lime-400 transition-colors">{step.date}</div>
                <div className="text-sm uppercase tracking-wide text-emerald-400">{step.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCORDIONS (The Offers) */}
      <section className="max-w-4xl mx-auto">
        <SectionHeader title="Wybierz ścieżkę" subtitle="Znajdź technologię, w której czujesz się najlepiej." />
        <div className="space-y-6">
          {accordions.map((item, i) => (
            <motion.div 
              key={i}
              initial={false}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activeAccordion === i ? 'bg-emerald-900/40 border-lime-400 shadow-[0_0_20px_rgba(132,204,22,0.1)]' : 'bg-emerald-900/20 border-emerald-500/30 hover:border-lime-400/50'}`}
            >
              <button
                onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                className="w-full p-6 flex flex-col md:flex-row md:items-center justify-between text-left gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${activeAccordion === i ? 'bg-lime-400 text-emerald-950' : 'bg-emerald-800 text-emerald-400'}`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <span className={`text-xl md:text-2xl font-bold font-hand block ${activeAccordion === i ? 'text-lime-400' : 'text-white'}`}>{item.title}</span>
                    <span className="text-sm text-emerald-400/80 font-mono hidden md:block">{item.subtitle}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                   <span className="md:hidden text-sm text-emerald-400/80 font-mono">{item.subtitle}</span>
                   <ChevronDown className={`transition-transform duration-300 ${activeAccordion === i ? 'rotate-180 text-lime-400' : 'text-emerald-500'}`} />
                </div>
              </button>
              
              <AnimatePresence>
                {activeAccordion === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 border-t border-dashed border-emerald-500/30">
                      <div className="grid md:grid-cols-2 gap-8 mt-6">
                         <div>
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2"><ArrowRight size={16} className="text-lime-400"/> O stażu</h4>
                            <p className="text-emerald-200/90 leading-relaxed mb-6">
                              {item.desc}
                            </p>
                            <h4 className="font-bold text-white mb-3">Czego się nauczysz?</h4>
                            <ul className="space-y-2">
                              {item.learn.map((l, idx) => (
                                <li key={idx} className="flex items-start text-sm text-emerald-200">
                                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 mr-2 shrink-0"/>
                                  {l}
                                </li>
                              ))}
                            </ul>
                         </div>
                         
                         <div className="bg-emerald-950/30 rounded-xl p-5 border border-emerald-800/50 flex flex-col justify-between">
                            <div>
                              <h4 className="font-bold text-lime-400 font-hand text-lg mb-4">Tech Stack</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.stack.map(tech => (
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

      {/* RULES / FAQ */}
      <section className="bg-emerald-900/30 p-8 rounded-3xl border border-dashed border-emerald-600">
        <h3 className="text-xl font-bold mb-4 flex items-center text-lime-400">
           Zasady naboru
        </h3>
        <ul className="space-y-3">
          {["Zgłoszenia przyjmujemy tylko przez formularz.", "Odpowiedź otrzymasz niezależnie od wyniku.", "Wymagamy statusu studenta.", "Znajomość angielskiego B2 jest mile widziana."].map((rule, i) => (
            <li key={i} className="flex items-start text-emerald-100">
              <Check className="mr-3 text-lime-400 shrink-0" size={20} />
              <span>{rule}</span>
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
              <SketchyButton primary className="text-xl px-12 py-4 shadow-[8px_8px_0_0_#064e3b] hover:translate-y-[-5px]">
                Aplikuj teraz
              </SketchyButton>
           </GlassCard>
         </motion.div>
      </section>
    </div>
  );
};

export default InternshipPage;