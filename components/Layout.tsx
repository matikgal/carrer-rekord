import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Youtube, Facebook, Linkedin } from 'lucide-react';

// Noise texture SVG
const NoiseOverlay = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.07] mix-blend-overlay">
    <svg width="100%" height="100%">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// Animated Gradient Background
const GradientBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-emerald-950">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-teal-800/40 blur-[100px] rounded-full mix-blend-screen" 
    />
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        x: [0, 100, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] bg-emerald-700/30 blur-[120px] rounded-full mix-blend-screen" 
    />
    <motion.div 
      animate={{ 
        y: [0, -100, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-lime-900/40 blur-[90px] rounded-full mix-blend-screen" 
    />
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Rekrutacja IT' },
    { path: '/internship', label: 'Programy Stażowe' },
    { path: '/practices', label: 'Praktyki Studenckie' },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-emerald-950/80 backdrop-blur-md shadow-lg py-3 border-emerald-800/50' 
          : 'p-4 md:p-6 pointer-events-none border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <div className="bg-white/95 p-1.5 rounded-xl shadow-[4px_4px_0px_0px_#84cc16] border-2 border-lime-400 cursor-pointer">
            <img src="/si.png" alt="RekordIT Logo" className="h-6 w-auto object-contain" />
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 pointer-events-auto">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path}>
              {({ isActive }) => (
                <div
                  className={`px-4 py-2 font-bold text-sm tracking-wide uppercase rounded-lg border-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-lime-400 text-emerald-950 border-emerald-950 shadow-[4px_4px_0px_0px_#022c22]' 
                      : 'bg-emerald-900/40 text-emerald-100 border-emerald-400/30 backdrop-blur hover:bg-emerald-800/60'
                  }`}
                >
                  {link.label}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden pointer-events-auto">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 bg-lime-400 text-emerald-900 rounded-lg shadow-[3px_3px_0px_0px_#000]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 bg-emerald-900/95 backdrop-blur-xl border-2 border-dashed border-lime-400 rounded-2xl p-6 pointer-events-auto flex flex-col gap-4 shadow-[8px_8px_0px_0px_#000]"
        >
          {links.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-lg font-bold p-2 transition-colors ${isActive ? 'text-lime-400' : 'text-white hover:text-lime-400'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen text-white relative flex flex-col">
      <NoiseOverlay />
      <GradientBackground />
      <Navbar />
      <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto relative z-10 w-full flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 bg-emerald-950/40 backdrop-blur-lg border-t-2 border-dashed border-emerald-800/50 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white/95 p-3 rounded-xl shadow-[4px_4px_0px_0px_#84cc16] border-2 border-lime-400 inline-block mb-6">
                <img src="/si.png" alt="RekordIT Logo" className="h-14 w-auto object-contain" />
              </div>
              <p className="text-emerald-200/70 text-sm leading-relaxed font-light">
                Tworzymy innowacyjne oprogramowanie i budujemy zespoły ekspertów od ponad 35 lat. Dołącz do nas i zmieniaj świat IT.
              </p>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-hand text-lime-400 text-xl font-bold mb-6 relative inline-block">
                Firma
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-emerald-600" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10, 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
              </h4>
              <ul className="space-y-3 text-emerald-100/80 text-sm">
                <li><a href="#" className="hover:text-lime-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> O nas</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> Historia</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> Blog Techniczny</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-hand text-lime-400 text-xl font-bold mb-6 relative inline-block">
                Wsparcie
                 <svg className="absolute -bottom-1 left-0 w-full h-2 text-emerald-600" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10, 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
              </h4>
              <ul className="space-y-3 text-emerald-100/80 text-sm">
                <li><a href="#" className="hover:text-lime-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> Kontakt</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> FAQ</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> Polityka Prywatności</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-hand text-lime-400 text-xl font-bold mb-6 relative inline-block">
                Dla kandydatów
                 <svg className="absolute -bottom-1 left-0 w-full h-2 text-emerald-600" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10, 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
              </h4>
              <ul className="space-y-3 text-emerald-100/80 text-sm">
                <li><a href="#/" className="hover:text-lime-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> Oferty pracy</a></li>
                <li><a href="#/internship" className="hover:text-lime-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> Programy Stażowe</a></li>
                <li><a href="#/practices" className="hover:text-lime-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> Praktyki Studenckie</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-emerald-800/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-emerald-500/60 text-sm font-mono text-center md:text-left">
              © 2025 RekordIT Systems. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-emerald-900/50 flex items-center justify-center text-emerald-400 hover:bg-lime-400 hover:text-emerald-950 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">
                <Youtube size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-emerald-900/50 flex items-center justify-center text-emerald-400 hover:bg-lime-400 hover:text-emerald-950 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-emerald-900/50 flex items-center justify-center text-emerald-400 hover:bg-lime-400 hover:text-emerald-950 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};