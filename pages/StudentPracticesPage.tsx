import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, SectionHeader, StickyNote, SketchyButton } from '../components/UI';
import { AlertTriangle, Quote, ChevronDown, HelpCircle, UploadCloud, Paperclip } from 'lucide-react';

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

const StudentPracticesPage = () => {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const howWeDoIt = [
    { title: "Tryb pracy", desc: "50% Stacjonarnie / 50% Zdalnie. Uczymy się współpracy w obu modelach." },
    { title: "Mentoring", desc: "Twój kod sprawdzają Seniorzy. Code Review to nasza codzienna rutyna." },
    { title: "Team Projects", desc: "Praca w grupach 3-4 osobowych metodą Scrum. Daily, Sprinty, Retro." },
    { title: "Demo Day", desc: "Prezentacja efektów końcowych przed całym działem IT i Zarządem." },
    { title: "Stack", desc: "Korzystamy z tych samych narzędzi co w projektach komercyjnych (Jira, Git, CI/CD)." },
  ];

  const testimonials = [
    { name: "Kamil", role: "Student Informatyki", quote: "Najlepsze wakacje! Nauczyłem się więcej gita przez miesiąc niż na studiach przez 3 lata." },
    { name: "Marta", role: "Junior Dev", quote: "Po praktykach dostałam ofertę pracy. Atmosfera jest niesamowita, wszyscy są pomocni." },
    { name: "Tomek", role: "Backend Intern", quote: "Zero nudy. Od pierwszego dnia kodowaliśmy prawdziwe ficzery do aplikacji." },
    { name: "Ania", role: "UX/UI Intern", quote: "Mogłam wdrażać własne pomysły, a nie tylko 'kolorować' makiety. Super doświadczenie." },
    { name: "Piotr", role: "DevOps", quote: "Dostęp do chmury Azure i realnej infrastruktury. To nie była zabawa na localhost." },
  ];

  const faqs = [
    { question: "Czy praktyki są płatne?", answer: "Tak, oferujemy wynagrodzenie stażowe za każdą przepracowaną godzinę." },
    { question: "Czy muszę mieć status studenta?", answer: "Tak, program skierowany jest do studentów studiów dziennych i zaocznych." },
    { question: "Czy jest szansa na stałe zatrudnienie?", answer: "Zdecydowanie! Ponad 70% naszych praktykantów zostaje z nami jako Junior Developerzy." },
    { question: "Jak wygląda proces rekrutacji?", answer: "Przesyłasz CV, rozwiązujesz krótkie zadanie online i spotykamy się na rozmowie." }
  ];

  const memories = [
    { year: "2023", label: "Hackathon Zwycięzcy", rotate: -2 },
    { year: "2022", label: "Wyjazd Integracyjny", rotate: 2 },
    { year: "2021", label: "Pierwsze Demo Day", rotate: -1 },
    { year: "2020", label: "Praktyki Remote", rotate: 3 },
  ];

  return (
    <div className="space-y-24">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center text-center pt-8 min-h-[50vh] justify-center perspective-1000">
        <FloatingShapes />
        {/* Warning Tape Badge */}
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

        <motion.h1 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="text-5xl md:text-7xl font-black mb-6 relative z-10"
        >
          Praktyki Studenckie
        </motion.h1>
        <p className="text-xl text-emerald-200 max-w-xl relative z-10">
          Zdobądź doświadczenie w IT na ul. Kasprowicza 5. <br/>
          <span className="font-hand text-lime-400 text-3xl font-bold">Coding is fun!</span>
        </p>
      </section>

      {/* TIMELINE (Specific Dates) */}
      <section>
        <SectionHeader title="Kalendarz praktyk" />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime-400 to-transparent dashed-line" />
          {[
            { date: "Do 5 maja", event: "Aplikacja", align: "left" },
            { date: "Do 16 maja", event: "Analiza CV", align: "right" },
            { date: "23 maja", event: "Informacja zwrotna", align: "left" },
            { date: "26-30 maja", event: "Spotkania online", align: "right" },
            { date: "Lipiec/Sierpień", event: "Realizacja praktyk", align: "center", special: true },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: item.align === 'left' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`flex items-center mb-8 ${item.align === 'right' ? 'md:flex-row-reverse' : ''} ${item.align === 'center' ? 'flex-col md:flex-col justify-center' : ''}`}
            >
              <div className={`w-full md:w-1/2 px-4 ${item.align === 'right' ? 'text-left' : item.align === 'center' ? 'text-center' : 'text-right'}`}>
                <div className={`inline-block p-4 rounded-xl border-2 ${item.special ? 'bg-lime-400 text-black border-black shadow-[4px_4px_0_0_#fff]' : 'bg-emerald-900/50 border-lime-400/30'}`}>
                  <div className="text-xl font-black font-hand">{item.date}</div>
                  <div className={`text-sm uppercase font-bold ${item.special ? 'text-emerald-900' : 'text-emerald-400'}`}>{item.event}</div>
                </div>
              </div>
              <div className="hidden md:block w-4 h-4 rounded-full bg-lime-400 border-4 border-emerald-900 z-10" />
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW WE DO IT (Draggable Carousel) */}
      <section>
        <SectionHeader title="Jak to robimy?" subtitle="Konkrety, zero parzenia kawy." />
        
        <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden p-4 -m-4">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-8"
          >
            {howWeDoIt.map((item, i) => (
              <motion.div 
                key={i} 
                className="min-w-[300px] md:min-w-[350px] h-[250px]"
                whileHover={{ scale: 1.02 }}
                initial={{ rotate: i % 2 === 0 ? 1 : -1 }}
              >
                <GlassCard className="h-full flex flex-col justify-center relative overflow-hidden group hover:border-lime-400/60">
                   {/* Background Number */}
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
              className={`relative ${i >= 3 ? 'md:hidden lg:block' : ''}`} // Hide extra on medium screens to keep grid nice
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

      {/* GALLERY (Wspomnienia) */}
      <section>
         <SectionHeader title="Wspomnienia" subtitle="Dzieje się u nas!" />
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
            {memories.map((mem, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
                 className="relative bg-white p-3 pt-3 pb-12 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform transition-transform duration-300"
                 style={{ rotate: mem.rotate }}
               >
                  {/* Tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-sm shadow-sm rotate-1 z-20"></div>

                  <div className="bg-emerald-900 w-full aspect-square relative overflow-hidden group">
                     {/* Placeholder Image Effect */}
                     <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center">
                        <span className="text-4xl font-black text-white/10">{mem.year}</span>
                     </div>
                     <div className="absolute inset-0 bg-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                     <p className="font-hand font-bold text-xl text-emerald-950">{mem.year}</p>
                     <p className="font-hand text-sm text-emerald-800">{mem.label}</p>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto">
         <SectionHeader title="FAQ" subtitle="Pytania o praktyki" />
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

      {/* FOOTER / CONTACT FORM */}
      <section className="pb-20">
        <StickyNote title="Chcesz zapytać o praktyki?">
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

export default StudentPracticesPage;