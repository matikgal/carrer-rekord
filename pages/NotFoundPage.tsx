import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 relative">
      
      {/* Decorative Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-400/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h1 className="text-[150px] md:text-[200px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-lime-400 opacity-80 select-none">
          404
        </h1>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 max-w-lg"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ups! Wygląda na to, że ta strona nie istnieje.
        </h2>
        <p className="text-emerald-200/70 text-lg mb-8">
          Być może adres został wpisany błędnie, lub strona została przeniesiona do archiwum.
        </p>

        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-lime-400 text-emerald-950 font-bold rounded-xl hover:bg-lime-300 transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] hover:-translate-y-1"
        >
          
          Wróć na stronę główną
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
