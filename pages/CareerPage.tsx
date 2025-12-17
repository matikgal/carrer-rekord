import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, Banknote, FileText, Code2, CheckCircle2, Play, HelpCircle, Paperclip, UploadCloud } from 'lucide-react';
import { GlassCard, SketchyButton, SectionHeader, StickyNote, Tag } from '../components/UI';

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

     {/* Small Particles */}
     {[...Array(5)].map((_, i) => (
       <motion.div
         key={i}
         className="absolute w-3 h-3 bg-lime-400/40 rounded-full"
         initial={{ 
           top: `${Math.random() * 100}%`, 
           left: `${Math.random() * 100}%` 
         }}
         animate={{ 
           y: [0, -100, 0], 
           opacity: [0, 1, 0] 
         }}
         transition={{ 
           duration: Math.random() * 5 + 5, 
           repeat: Infinity, 
           delay: Math.random() * 2 
         }}
       />
     ))}
  </div>
);

const CareerPage = () => {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const values = [
    { title: "Rozwój", desc: "Ciągłe podnoszenie kompetencji i nauka nowych technologii." },
    { title: "Innowacyjność", desc: "Szukamy nieszablonowych rozwiązań dla trudnych problemów." },
    { title: "Współpraca", desc: "Gramy do jednej bramki. Wspieramy się i dzielimy wiedzą." },
    { title: "Jakość", desc: "Czysty kod, testy i dbałość o architekturę to u nas standard." },
    { title: "Pasja", desc: "Programowanie to dla nas coś więcej niż praca. To styl życia." },
    { title: "Równowaga", desc: "Work-life balance. Wypoczęty umysł to kreatywny umysł." }
  ];

  const offers = [
    { 
      title: "Programista Delphi", 
      tags: ["#Remote", "#Bielsko-Biała", "#Legacy"],
      salary: "12 000 - 18 000 PLN netto",
      location: "Bielsko-Biała / 100% Remote",
      contract: "B2B / UoP",
      description: "Poszukujemy doświadczonego programisty do rozwoju naszego flagowego systemu ERP. Praca przy dużym, stabilnym projekcie z wykorzystaniem nowoczesnych wzorców w środowisku Delphi.",
      techStack: ["Delphi 11", "MS SQL Server", "REST API", "Git"],
      responsibilities: [
        "Rozwój i utrzymanie systemów ERP",
        "Optymalizacja zapytań SQL",
        "Tworzenie dokumentacji technicznej",
        "Code review i mentoring młodszych programistów"
      ]
    },
    { 
      title: "Frontend Developer", 
      tags: ["#Hybrid", "#React", "#Tailwind"],
      salary: "10 000 - 16 000 PLN netto",
      location: "Hybrydowo (2 dni w biurze)",
      contract: "B2B",
      description: "Dołącz do zespołu tworzącego nową platformę chmurową. Tworzymy nowoczesne UI z naciskiem na UX i wydajność. Brak legacy code!",
      techStack: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      responsibilities: [
        "Tworzenie komponentów w React",
        "Współpraca z działem UX/UI",
        "Integracja z REST API",
        "Dbanie o wydajność aplikacji (Core Web Vitals)"
      ]
    },
    { 
      title: "Specjalista ds. wsparcia IT", 
      tags: ["#Bielsko-Biała", "#Hardware", "#Helpdesk"],
      salary: "6 000 - 8 000 PLN brutto",
      location: "Stacjonarnie (Bielsko-Biała)",
      contract: "Umowa o pracę",
      description: "Szukamy osoby do wsparcia naszego zespołu w codziennych problemach ze sprzętem i oprogramowaniem. Jeśli lubisz pomagać ludziom i rozwiązywać zagadki techniczne - to praca dla Ciebie.",
      techStack: ["Windows 10/11", "Active Directory", "Office 365", "Hardware"],
      responsibilities: [
        "Konfiguracja stacji roboczych",
        "Wsparcie użytkowników (Helpdesk)",
        "Diagnostyka awarii sprzętowych",
        "Zarządzanie inwentarzem IT"
      ]
    }
  ];

  const faqs = [
    { question: "Jak szybko otrzymam odpowiedź?", answer: "Staramy się odpowiadać na wszystkie zgłoszenia w ciągu 3 dni roboczych, niezależnie od decyzji." },
    { question: "Czy sprzęt jest zapewniany?", answer: "Tak, każdy pracownik otrzymuje wysokiej klasy laptopa (Dell/MacBook), dwa monitory i niezbędne akcesoria." },
    { question: "Czy praca zdalna jest możliwa w 100%?", answer: "Zależy to od stanowiska. Programiści często pracują 100% zdalnie, wsparcie IT wymaga obecności w biurze." },
    { question: "Jak wygląda onboarding?", answer: "Pierwszy tydzień to szkolenia i wdrożenie. Otrzymasz też 'Buddy'ego', który pomoże Ci w pierwszych krokach w firmie." }
  ];

  const toggleOffer = (index: number) => {
    setActiveOffer(activeOffer === index ? null : index);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="space-y-24">
      {/* HERO SECTION */}
      <section className="min-h-[75vh] flex flex-col justify-center items-center text-center relative perspective-1000">
        <FloatingShapes />
        
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <span className="inline-block mb-8 px-6 py-2 rounded-full border border-lime-400/50 bg-lime-400/10 text-lime-400 font-hand font-bold text-lg tracking-wider animate-pulse shadow-[0_0_15px_rgba(132,204,22,0.3)]">
            We are hiring!
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-loose tracking-widest drop-shadow-2xl">
            Rozwijaj się z <br/>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300 filter drop-shadow-md">
              liderem IT
              <svg className="absolute -bottom-6 left-0 w-full h-6 text-lime-400 z-[-1] opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00026 6.99997C52.0003 2.99999 150.003 -3.00001 198.003 4.99999" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 10"/></svg>
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-emerald-100/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
            Dołącz do zespołu ekspertów z <span className="font-hand text-lime-400 font-bold text-4xl mx-2 relative top-1">35-letnim</span> doświadczeniem.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <SketchyButton primary className="text-xl px-10 py-4 shadow-[8px_8px_0px_0px_#064e3b]">Zobacz oferty pracy</SketchyButton>
            <SketchyButton className="text-xl px-10 py-4" onClick={scrollToContact}>Wyślij CV</SketchyButton>
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION (The Graph) */}
      <section className="relative">
        <GlassCard className="border-lime-400/20 bg-emerald-900/40">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 tracking-wide">Stabilny rozwój przez ponad <span className="text-lime-400 font-hand text-5xl">35 lat</span></h3>
              <p className="text-emerald-200 mb-8 leading-loose text-lg">Nie jesteśmy start-upem. Budujemy przyszłość na solidnych fundamentach.</p>
              <div className="flex flex-wrap gap-8">
                {[
                  { label: 'lat doświadczenia', val: '4+' },
                  { label: 'specjalistów', val: '160' },
                  { label: 'lokalizacja', val: '1' }
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-4xl font-black font-hand text-lime-300">{stat.val}</span>
                    <span className="text-sm uppercase tracking-wider text-emerald-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="h-64 relative flex items-end p-4 border-l-2 border-b-2 border-white/20">
              {/* Hand-drawn sketchy chart */}
              <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d="M0,100 C50,90 80,60 120,50 C160,40 200,60 240,20 L300,5"
                  fill="none"
                  stroke="#84cc16"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="8 4"
                />
                {/* Points */}
                <circle cx="0" cy="100" r="4" fill="white" />
                <circle cx="120" cy="50" r="4" fill="white" />
                <circle cx="240" cy="20" r="4" fill="white" />
                <circle cx="300" cy="5" r="6" fill="#84cc16" />
                
                <text x="0" y="120" fill="white" className="text-[10px] font-hand">1990</text>
                <text x="280" y="120" fill="#84cc16" className="text-[12px] font-hand font-bold">2025</text>
              </svg>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* VALUES CAROUSEL SECTION */}
      <section>
        <SectionHeader title="Nasze wartości" subtitle="To co nas definiuje i napędza każdego dnia." />
        
        <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden p-4 -m-4">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-8"
          >
            {values.map((item, i) => (
              <motion.div 
                key={i} 
                className="min-w-[300px] md:min-w-[350px] h-[320px]"
                whileHover={{ scale: 1.02, rotate: 0 }}
                initial={{ rotate: i % 2 === 0 ? 1 : -1 }}
              >
                <GlassCard className="h-full flex flex-col justify-end relative overflow-hidden group hover:border-lime-400/60">
                   {/* Large Outline Number Background */}
                   <span className="absolute -right-4 -top-8 text-[10rem] font-black font-hand text-lime-400/5 group-hover:text-lime-400/10 transition-colors select-none pointer-events-none leading-none">
                      0{i + 1}
                   </span>

                   <div className="relative z-10">
                     <h3 className="text-3xl font-black mb-4 text-white group-hover:text-lime-400 transition-colors">{item.title}</h3>
                     <div className="h-1 w-12 bg-lime-400 mb-4 rounded-full" />
                     <p className="text-emerald-200/90 text-lg leading-relaxed">{item.desc}</p>
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

      {/* OFFERS ACCORDION SECTION */}
      <section>
        <SectionHeader title="Oferty pracy" subtitle="Znajdź swoje miejsce w naszym zespole." />
        <div className="space-y-4 max-w-5xl mx-auto mb-16">
          {offers.map((offer, i) => (
            <motion.div 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className={`group transition-all duration-300 ${activeOffer === i ? 'border-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.1)]' : 'hover:border-lime-400/50'}`}>
                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
                  onClick={() => toggleOffer(i)}
                >
                  <div className="flex-1">
                    <h3 className={`text-xl md:text-2xl font-bold transition-colors tracking-wide flex items-center gap-3 ${activeOffer === i ? 'text-lime-400' : 'text-white group-hover:text-emerald-200'}`}>
                      {offer.title}
                      {activeOffer === i && <span className="text-xs font-hand text-emerald-400 border border-emerald-500/50 px-2 py-0.5 rounded-full">Rekrutujemy</span>}
                    </h3>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      {offer.tags.map(t => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6 min-w-[200px]">
                    <div className="text-right hidden md:block">
                       <p className="text-sm text-emerald-400 font-bold">{offer.salary}</p>
                       <p className="text-xs text-emerald-500/60">{offer.contract}</p>
                    </div>
                    <motion.div 
                      animate={{ rotate: activeOffer === i ? 180 : 0 }}
                      className={`p-2 rounded-full border-2 ${activeOffer === i ? 'border-lime-400 bg-lime-400/10 text-lime-400' : 'border-emerald-800 text-emerald-600'}`}
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {activeOffer === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 border-t border-dashed border-emerald-800/50 mt-6 grid md:grid-cols-3 gap-8">
                        
                        {/* Left Column: Details */}
                        <div className="md:col-span-2 space-y-6">
                           <div>
                             <h4 className="text-lime-400 font-hand text-xl font-bold mb-2 flex items-center gap-2">
                               <FileText size={18} /> O projekcie
                             </h4>
                             <p className="text-emerald-100/80 leading-relaxed">{offer.description}</p>
                           </div>
                           
                           <div>
                             <h4 className="text-lime-400 font-hand text-xl font-bold mb-3 flex items-center gap-2">
                               <CheckCircle2 size={18} /> Twoje zadania
                             </h4>
                             <ul className="space-y-2">
                               {offer.responsibilities.map((task, idx) => (
                                 <li key={idx} className="flex items-start text-emerald-200/90 text-sm">
                                   <span className="w-1.5 h-1.5 bg-lime-500 rounded-full mt-2 mr-3 shrink-0" />
                                   {task}
                                 </li>
                               ))}
                             </ul>
                           </div>
                           
                           <div className="pt-4">
                              <SketchyButton primary onClick={scrollToContact} className="w-full md:w-auto text-center flex justify-center items-center gap-2 group-hover:gap-4 transition-all">
                                Aplikuj teraz <ArrowRight size={20} />
                              </SketchyButton>
                           </div>
                        </div>

                        {/* Right Column: Meta & Tech */}
                        <div className="bg-emerald-900/30 p-6 rounded-2xl border border-emerald-800/50 space-y-6">
                           
                           {/* Info Block */}
                           <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <MapPin className="text-lime-400 mt-1" size={20} />
                                <div>
                                  <p className="text-xs text-emerald-500 uppercase font-bold">Lokalizacja</p>
                                  <p className="text-emerald-100 font-semibold">{offer.location}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <Banknote className="text-lime-400 mt-1" size={20} />
                                <div>
                                  <p className="text-xs text-emerald-500 uppercase font-bold">Wynagrodzenie</p>
                                  <p className="text-emerald-100 font-semibold">{offer.salary}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <FileText className="text-lime-400 mt-1" size={20} />
                                <div>
                                  <p className="text-xs text-emerald-500 uppercase font-bold">Umowa</p>
                                  <p className="text-emerald-100 font-semibold">{offer.contract}</p>
                                </div>
                              </div>
                           </div>

                           {/* Tech Stack */}
                           <div>
                             <h4 className="text-lime-400 font-hand text-lg font-bold mb-3 flex items-center gap-2">
                               <Code2 size={18} /> Tech Stack
                             </h4>
                             <div className="flex flex-wrap gap-2">
                               {offer.techStack.map(tech => (
                                 <span key={tech} className="px-3 py-1 bg-emerald-950 border border-emerald-700/50 rounded text-xs font-mono text-emerald-300">
                                   {tech}
                                 </span>
                               ))}
                             </div>
                           </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* CTA SECTION: No Offer? */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="absolute inset-0 bg-lime-400/10 blur-xl rounded-full" />
          <div className="relative border-4 border-dashed border-lime-400/50 rounded-[3rem] p-10 bg-emerald-900/60 backdrop-blur-md transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <h3 className="text-3xl md:text-4xl font-black mb-4">Nie widzisz oferty dla siebie?</h3>
            <p className="text-emerald-200 text-lg mb-8 max-w-2xl mx-auto">
              Ciągle się rozwijamy i chętnie poznajemy talenty. Napisz do nas, wyślij CV, a my odezwiemy się, gdy tylko pojawi się coś dla Ciebie!
            </p>
            <SketchyButton onClick={scrollToContact} className="text-lime-400 hover:bg-lime-400 hover:text-emerald-950 border-lime-400 shadow-[4px_4px_0px_0px_#84cc16]">
              Skontaktuj się z nami
            </SketchyButton>
          </div>
        </motion.div>
      </section>

      {/* PROCESS SECTION */}
      <section>
        <SectionHeader title="Proces rekrutacji" />
        <div className="relative max-w-2xl mx-auto pl-8 border-l-4 border-dashed border-emerald-700">
          {[
            { step: "01", title: "Aplikacja", desc: "Wyślij do nas swoje CV przez formularz." },
            { step: "02", title: "Selekcja", desc: "Krótka rozmowa telefoniczna z HR." },
            { step: "03", title: "Rozmowa", desc: "Spotkanie techniczne online lub w biurze." },
            { step: "04", title: "Decyzja", desc: "Witamy na pokładzie! (Oferta)." },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="mb-12 relative"
            >
              <div className="absolute -left-[42px] top-0 w-8 h-8 rounded-full bg-emerald-900 border-2 border-lime-400 flex items-center justify-center font-bold text-xs text-lime-400">
                {item.step}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">{item.title}</h3>
              <p className="text-emerald-200/70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VIDEO SECTION ("See us in action") */}
      <section>
        <SectionHeader title="Zobacz nas w akcji" subtitle="Trochę kodu, trochę pizzy i dużo pasji." />
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Hackathon 2023", duration: "02:30", color: "bg-purple-900" },
            { title: "Dzień z życia Dev Teamu", duration: "04:15", color: "bg-blue-900" }
          ].map((vid, i) => (
             <motion.div
               key={i}
               whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
               className="relative group cursor-pointer"
             >
                <GlassCard className="!p-0 overflow-hidden relative aspect-video border-2 border-dashed border-emerald-600 group-hover:border-lime-400">
                  {/* Fake Video Thumbnail */}
                  <div className={`absolute inset-0 ${vid.color} opacity-40 mix-blend-overlay`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-lime-400 flex items-center justify-center text-emerald-950 shadow-[0_0_20px_rgba(132,204,22,0.6)] group-hover:scale-110 transition-transform">
                      <Play fill="currentColor" size={28} className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-xl drop-shadow-md">{vid.title}</h4>
                    <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded text-white">{vid.duration}</span>
                  </div>
                </GlassCard>
             </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto">
         <SectionHeader title="FAQ" subtitle="Najczęściej zadawane pytania" />
         <div className="space-y-4">
           {faqs.map((faq, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
               <GlassCard className={`!p-0 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'border-lime-400 bg-emerald-900/60' : 'hover:bg-emerald-800/30'}`}>
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full text-left p-6 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <HelpCircle className={`text-lime-400 transition-transform ${activeFaq === i ? 'rotate-12' : ''}`} size={24} />
                      <span className="text-lg font-bold text-white">{faq.question}</span>
                    </div>
                    <ChevronDown className={`text-emerald-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                         <div className="p-6 pt-0 pl-16 text-emerald-200/90 leading-relaxed border-t border-dashed border-emerald-700/50">
                           {faq.answer}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </GlassCard>
             </motion.div>
           ))}
         </div>
      </section>

      {/* FOOTER / CONTACT */}
      <section className="pb-20" ref={contactRef}>
        <StickyNote title="Masz pytania? Napisz do nas!">
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

            {/* Styled File Input */}
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
      </section>
    </div>
  );
};

export default CareerPage;