import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, Banknote, FileText, Code2, CheckCircle2, Play, HelpCircle, Paperclip, UploadCloud } from 'lucide-react';

import { GlassCard, SketchyButton, SectionHeader, StickyNote, Tag } from '../components/UI';

const VideoModal = ({ videoId, onClose }: { videoId: string; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
         initial={{ scale: 0.9, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         exit={{ scale: 0.9, opacity: 0 }}
         transition={{ type: "spring", damping: 25, stiffness: 300 }}
         className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-emerald-500/20"
         onClick={(e) => e.stopPropagation()}
      >
         <button 
           onClick={onClose}
           className="absolute top-4 right-4 z-20 group bg-black/50 hover:bg-lime-400 p-2 rounded-full transition-all duration-300"
         >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:text-emerald-950"><path d="M18 6L6 18M6 6l12 12"/></svg>
         </button>
         <iframe 
           src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
           title="YouTube player" 
           className="w-full h-full"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
           allowFullScreen
         />
      </motion.div>
    </motion.div>,
    document.body
  );
};

const BackgroundGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Subtle Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
    
    {/* Code/Data Accents on sides */}
    <div className="absolute top-1/4 left-0 w-64 h-64 bg-lime-400/5 blur-[80px] rounded-full" />
    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full" />
  </div>
);

const ResponsiveGraph = () => {
    // Data points every 5 years
    const data = [
      { year: 1990, count: 12 },
      { year: 1995, count: 28 },
      { year: 2000, count: 45 },
      { year: 2005, count: 68 },
      { year: 2010, count: 92 },
      { year: 2015, count: 118 },
      { year: 2020, count: 145 },
      { year: 2025, count: 160 }
    ];

    // SVG Dimensions
    const width = 800;
    const height = 300;
    const padding = { top: 20, right: 30, bottom: 40, left: 30 };

    // Scales
    const minYear = data[0].year;
    const maxYear = data[data.length - 1].year;
    const maxCount = 180; 

    // Helper functions for coordinates
    const getX = (year: number) => padding.left + ((year - minYear) / (maxYear - minYear)) * (width - padding.left - padding.right);
    const getY = (count: number) => height - padding.bottom - (count / maxCount) * (height - padding.top - padding.bottom);

    // Generate Path
    const points = data.map(d => ({ x: getX(d.year), y: getY(d.count) }));
    
    // Simple monotone curve approximation
    let d = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        
        // Control points for cubic bezier (Monotone-like smoothing)
        const cp1x = p0.x + (p1.x - p0.x) / 2; // Control point 1 X
        const cp1y = p0.y;                   // Control point 1 Y (flat tangent start)
        const cp2x = p0.x + (p1.x - p0.x) / 2; // Control point 2 X
        const cp2y = p1.y;                   // Control point 2 Y (flat tangent end)
        
        // Use a simpler curve: Cubic Bezier connecting the two points
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
             <defs>
                <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#84cc16" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
                </linearGradient>
             </defs>

            {/* Grid & Axis Lines */}
            <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="white" strokeOpacity="0.1" strokeWidth="2" />
            
            {/* Reference dashed lines */}
            {[50, 100, 150].map(val => (
                <line key={val} x1={padding.left} y1={getY(val)} x2={width - padding.right} y2={getY(val)} stroke="white" strokeOpacity="0.05" strokeDasharray="4" />
            ))}

             {/* Area under curve fill */}
             <path
                d={`${d} L ${width - padding.right} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`}
                fill="url(#gradient-area)"
             />

             {/* The Line */}
            <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
                d={d}
                fill="none"
                stroke="#84cc16"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            
            {/* Data Points */}
            {data.map((point, i) => (
                <g key={i} className="group cursor-pointer">
                    {/* Hit Target (larger invisible circle) */}
                    <circle cx={getX(point.year)} cy={getY(point.count)} r="20" fill="transparent" /> 
                    
                    {/* Visible Point */}
                    <circle 
                        cx={getX(point.year)} 
                        cy={getY(point.count)} 
                        r={i === data.length - 1 ? 6 : 4} 
                        fill={i === data.length - 1 ? "#84cc16" : "white"} 
                        stroke={i === data.length - 1 ? "rgba(132, 204, 22, 0.4)" : "none"}
                        strokeWidth="4"
                        className="transition-all duration-300 group-hover:r-8 group-hover:fill-lime-400 group-hover:stroke-lime-400/30" 
                    />

                    {/* X-Axis Labels (Years) */}
                    <text 
                        x={getX(point.year)} 
                        y={height - 15} 
                        textAnchor="middle" 
                        fill="white" 
                        className={`text-[10px] sm:text-xs font-mono tracking-wider transition-opacity duration-300 ${point.year === 2025 ? 'font-bold text-lime-400 opacity-100' : 'opacity-40 group-hover:opacity-100'}`}
                    >
                        {point.year}
                    </text>
                    
                    {/* Tooltip (visible on hover) */}
                    <foreignObject 
                        x={getX(point.year) - 40} 
                        y={getY(point.count) - 50} 
                        width="80" 
                        height="40" 
                        className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-y-1"
                    >
                         <div className="flex justify-center">
                            <div className="bg-emerald-950 border border-lime-400/50 text-lime-400 text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                {point.count} osób
                            </div>
                         </div>
                    </foreignObject>
                </g>
            ))}
        </svg>
    );
};

const CareerPage = () => {
  /* State */
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  // User provided URLs
  const [videoUrls] = useState([
    "https://www.youtube.com/watch?v=Du-3wCxu87k",
    "https://www.youtube.com/watch?v=LEWwq80nXdU"
  ]);
  const [fetchedVideos, setFetchedVideos] = useState<any[]>([]);

  // Fetch Video Data (Title + ID)
  useEffect(() => {
    const loadVideos = async () => {
      const promises = videoUrls.map(async (url) => {
         try {
           const res = await fetch(`https://noembed.com/embed?url=${url}`);
           const data = await res.json();
           const videoId = url.split('v=')[1]?.split('&')[0];
           
           return {
             id: videoId,
             title: data.title || "Wideo RekordIT",
             author: data.author_name || "RekordSI",
             url: url
           };
         } catch (e) {
           console.error("Video fetch error", e);
           return null;
         }
      });
      
      const results = await Promise.all(promises);
      setFetchedVideos(results.filter(Boolean));
    };
    
    loadVideos();
  }, [videoUrls]);

  // Carousel width
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
      <section className="min-h-[85vh] w-[100vw] ml-[calc(50%-50vw)] flex flex-col justify-center items-center text-center relative overflow-hidden">
        <BackgroundGrid />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl px-6 mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime-400/20 bg-lime-400/5 backdrop-blur-sm mb-10">
            <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"/>
            <span className="text-lime-400 font-mono text-xs font-medium tracking-wide uppercase">
              Rekrutacja Otwarta
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium mb-8 leading-[1.1] tracking-tight text-white">
            <span className="font-serif italic text-emerald-200 block mb-2">Rozwijaj się z</span>
            <span className="font-sans font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-emerald-300">
              Liderem Technologii IT
            </span>
          </h1>

          <p className="text-lg md:text-xl text-emerald-100/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Dołącz do zespołu 160+ ekspertów z <span className="text-white font-semibold">35-letnim doświadczeniem</span> w budowaniu systemów klasy Enterprise.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button 
              className="group relative px-8 py-4 bg-lime-400 hover:bg-lime-300 text-emerald-950 text-base font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 translate-y-[100%] bg-white/20 blur-lg group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Zobacz oferty pracy <ArrowRight size={18} />
              </span>
            </button>
            <button 
              onClick={scrollToContact}
              className="px-8 py-4 border border-emerald-500/30 text-emerald-100 hover:border-lime-400 hover:text-lime-400 font-medium rounded-lg transition-all hover:bg-lime-400/5"
            >
              Porozmawiajmy o karierze
            </button>
          </div>

          {/* Tech Strip */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {[
               {  label: 'Delphi' },
               {  label: 'React' },
               {  label: 'SQL Server' },
               {  label: '.NET Core' },
               {  label: 'Azure' }
             ].map((tech, i) => (
               <div key={i} className="flex items-center gap-2 group cursor-default">
            
                 <span className="text-lg font-mono text-emerald-200/80 font-semibold">{tech.label}</span>
               </div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION (The Graph) */}
      <section className="relative w-full max-w-7xl mx-auto px-6">
        <GlassCard className="border-lime-400/20 bg-emerald-900/40 p-8 md:p-12 min-h-[500px] flex flex-col md:flex-row gap-12 items-center overflow-hidden" noHover>
            {/* Text Content */}
            <div className="md:w-1/3 relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight">
                Stabilny rozwój <br/> przez ponad <span className="text-lime-400 font-sans inline-block transform -rotate-2 decoration-wavy underline decoration-lime-500/30 underline-offset-8">35 lat</span>
              </h3>
              <p className="text-emerald-200/80 mb-10 leading-relaxed text-lg font-light">
                Nie jesteśmy start-upem, który zniknie po roku. Budujemy przyszłość na solidnych fundamentach, stale powiększając nasz zespół ekspertów i bazę technologiczną.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl font-bold text-white mb-2">40+</div>
                  <div className="text-xs font-bold text-lime-400 uppercase tracking-widest">Lat Doświadczenia</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-2">160+</div>
                  <div className="text-xs font-bold text-lime-400 uppercase tracking-widest">Specjalistów IT</div>
                </div>
              </div>
            </div>
            
            {/* Expanded Chart */}
            <div className="md:w-2/3 w-full h-[400px] relative mt-12 md:mt-0 flex items-end">
               {/* Chart Container */}
               <div className="absolute inset-0 w-full h-full">
                  <ResponsiveGraph />
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
                <GlassCard className="h-full flex flex-col justify-start relative overflow-hidden group hover:border-lime-400/60 pt-12">
                   {/* Large Outline Number Background */}
                   <span className="absolute right-[-20px] top-[-40px] text-[14rem] font-black font-hand text-lime-400/5 group-hover:text-lime-400/10 transition-colors select-none pointer-events-none leading-none z-0">
                      0{i + 1}
                   </span>

                   <div className="relative z-10 w-full">
                     <h3 className="text-4xl font-black mb-4 text-white group-hover:text-lime-400 transition-colors">{item.title}</h3>
                     <div className="h-1.5 w-16 bg-lime-400 mb-6 rounded-full" />
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
              <GlassCard className={`group transition-all duration-300 ${activeOffer === i ? 'border-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.1)]' : 'hover:border-lime-400/50'}`} noHover>
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
                              <button 
  onClick={scrollToContact}
  className="w-full md:w-auto px-8 py-3 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(132,204,22,0.3)]   flex justify-center items-center gap-2"
>
  Aplikuj teraz <ArrowRight size={20} />
</button>
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
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="absolute inset-0 bg-lime-400/10 blur-xl rounded-full" />
          <div className="relative border-4 border-dashed border-lime-400/50 rounded-[3rem] p-10 bg-emerald-900/60 backdrop-blur-md transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <h3 className="text-3xl md:text-4xl font-black mb-4">Nie widzisz oferty dla siebie?</h3>
            <p className="text-emerald-200 text-lg mb-8 max-w-2xl mx-auto">
              Ciągle się rozwijamy i chętnie poznajemy talenty. Napisz do nas, wyślij CV, a my odezwiemy się, gdy tylko pojawi się coś dla Ciebie!
            </p>
            <button 
              onClick={scrollToContact}
              className="px-8 py-4 bg-emerald-800 text-lime-400 font-bold rounded-xl border border-lime-400/30 hover:bg-lime-400 hover:text-emerald-950 hover:border-lime-400 transition-all duration-300 shadow-[0_0_20px_rgba(132,204,22,0.2)] hover:shadow-[0_0_30px_rgba(132,204,22,0.6)] hover:-translate-y-1 text-lg"
            >
              Skontaktuj się z nami
            </button>
          </div>
        </motion.div>
      </section>

      {/* PROCESS SECTION */}
      <section>
        <SectionHeader title="Proces rekrutacji" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-0">
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-emerald-700 md:-translate-x-1/2" />
          
          <div className="space-y-12">
            {[
              { step: "01", title: "Aplikacja", desc: "Wyślij do nas swoje CV przez formularz." },
              { step: "02", title: "Selekcja", desc: "Krótka rozmowa telefoniczna z HR." },
              { step: "03", title: "Rozmowa", desc: "Spotkanie techniczne online lub w biurze." },
              { step: "04", title: "Decyzja", desc: "Witamy na pokładzie! (Oferta)." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative flex flex-col md:flex-row items-center w-full min-h-[100px]"
              >
                {/* Marker */}
                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-emerald-900 border-2 border-lime-400 flex items-center justify-center font-bold font-hand text-lg text-lime-400 z-10 shadow-[0_0_15px_rgba(132,204,22,0.3)]">
                  {item.step}
                </div>

                {/* Content */}
                <div 
                  className={`w-full md:w-1/2 pl-24 md:pl-0 pt-1 md:pt-0 ${
                    i % 2 === 0 
                      ? 'md:text-right md:pr-16' 
                      : 'md:ml-auto md:text-left md:pl-16'
                  }`}
                >
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-wide group-hover:text-lime-400 transition-colors">{item.title}</h3>
                  <p className="text-emerald-200/70 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION ("See us in action") */}
      <section>
        <SectionHeader title="Zobacz nas w akcji" subtitle="Trochę kodu, trochę pizzy i dużo pasji." />
        
        {/* Helper to show loading state or error if needed, but we fail silently to static data */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {fetchedVideos.map((vid, i) => (
             <motion.div
               key={i}
               whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
               className="relative group cursor-pointer"
               onClick={() => setSelectedVideo(vid.id)}
             >
                <GlassCard className="!p-0 overflow-hidden relative aspect-video border-2 border-dashed border-emerald-600 group-hover:border-lime-400">
                  {/* Real Youtube Thumbnail */}
                  <div className="absolute inset-0 bg-emerald-900/20" />
                  <img 
                    src={`https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`} 
                    alt={vid.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    onError={(e) => {
                        // Fallback if maxres doesn't exist
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`;
                    }}
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-lime-400 flex items-center justify-center text-emerald-950 shadow-[0_0_20px_rgba(132,204,22,0.6)] group-hover:scale-110 transition-transform">
                      <Play fill="currentColor" size={28} className="ml-1" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-emerald-950/90 to-transparent pt-12">
                    <h4 className="text-white font-bold text-xl drop-shadow-md leading-tight line-clamp-2">{vid.title}</h4>
                    <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded text-white mt-2 inline-block">
                        {vid.date ? new Date(vid.date).toLocaleDateString() : 'Wideo'}
                    </span>
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
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
             >
               <GlassCard noHover className={`!p-0 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'border-lime-400 bg-emerald-900/60' : 'hover:bg-emerald-800/30'}`}>
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
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal 
            videoId={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerPage;