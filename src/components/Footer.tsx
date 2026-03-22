import React from 'react';
import { Star } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-stone-900 text-white py-20 px-6">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
          <Star size={24} />
        </div>
        <span className="font-sans text-2xl font-bold">Comisión de Fiestas</span>
      </div>
      <p className="text-stone-400 font-light max-w-md mx-auto">
        Trabajando con ilusión para mantener vivas nuestras tradiciones en Las Carboneras.
      </p>
      <div className="flex justify-center gap-8 pt-8 border-t border-white/10">
        <div className="text-left">
          <span className="block text-xs uppercase tracking-widest text-stone-400 mb-1 font-bold">Contacto</span>
          <p className="text-lg">comision@lascarboneras.es</p>
        </div>
        <div className="text-left">
          <span className="block text-xs uppercase tracking-widest text-stone-400 mb-1 font-bold">Ubicación</span>
          <p className="text-lg">Las Carboneras, Anaga</p>
        </div>
      </div>
      <p className="text-xs text-stone-500 pt-12 uppercase tracking-widest font-medium">
        © 2026 Comisión de Fiestas Las Carboneras. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);