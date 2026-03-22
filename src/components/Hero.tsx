import React from 'react';
import { motion } from 'motion/react';

export const Hero = () => (
  <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://picsum.photos/seed/village/1920/1080" 
        alt="Las Carboneras" 
        className="w-full h-full object-cover opacity-40 grayscale"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f0]/20 to-[#f5f5f0]" />
    </div>
    
    <div className="relative z-10 text-center px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <span className="uppercase tracking-[0.3em] text-base font-bold text-stone-700 mb-4 block">Comisión de Fiestas</span>
        <h1 className="text-6xl md:text-8xl text-stone-900 font-black mb-6 leading-tight">
          Las Carboneras <br /> 2026
        </h1>
        <p className="max-w-xl mx-auto text-stone-800 text-xl md:text-2xl font-medium leading-relaxed">
          Celebrando nuestras tradiciones, nuestra gente y el alma de nuestro pueblo en el corazón de Anaga.
        </p>
      </motion.div>
    </div>
  </header>
);