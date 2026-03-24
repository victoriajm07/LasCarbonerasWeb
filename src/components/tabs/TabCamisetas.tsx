// src/components/tabs/TabCamisetas.tsx

import React from 'react';
import { motion } from 'motion/react';
import { Shirt, Mail, Phone, Info, MessageCircle } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';

export const TabCamisetas = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-12"
    >
      <SectionTitle subtitle="Llévate un recuerdo">Camisetas Oficiales 2026</SectionTitle>
      
      {/* Aviso de cómo comprar */}
      <Card className="bg-stone-900 text-white border-none p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center shrink-0">
          <Info size={32} className="text-stone-300" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">¿Cómo consigo mi camiseta?</h3>
          <p className="text-stone-300 text-lg leading-relaxed">
            Las camisetas <strong>no se venden por la web</strong>. Para hacerte con la tuya, ponte en contacto directo con cualquier miembro de la Comisión de Fiestas en el pueblo, escríbenos por correo o llámanos. ¡No te quedes sin ella!
          </p>
        </div>
      </Card>

      {/* Escaparate de la Camiseta */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Imagen de la camiseta (Placeholder) */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden h-full min-h-[400px]">
          <img 
            src="https://res.cloudinary.com/danlaueus/image/upload/v1774197858/camiseta_venta_bq9y5w.webp" 
            alt="Camiseta Fiestas Las Carboneras 2026" 
            loading="lazy"
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Detalles y Contacto */}
        <Card className="h-full flex flex-col justify-between">
          <div>
            <h4 className="text-3xl font-black text-stone-900 mb-2">Camiseta Fiestas 2026</h4>
            <p className="text-stone-500 text-lg mb-6">Diseño exclusivo de esta edición.</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-stone-100">
                <span className="font-bold text-stone-600 uppercase tracking-wider text-sm">Precio</span>
                <span className="text-2xl font-bold text-stone-900">10,00 €</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-stone-100">
                <span className="font-bold text-stone-600 uppercase tracking-wider text-sm">Tallas Disponibles</span>
                <span className="text-lg font-medium text-stone-900">12-14, XS, S, M, L, XL, XXL</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-stone-100">
                <span className="font-bold text-stone-600 uppercase tracking-wider text-sm">Color</span>
                <span className="text-lg font-medium text-stone-900">Blanco </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 mb-4">Vías de contacto:</h4>
            <div className="space-y-3">
              <a className="flex items-center gap-3 w-full bg-stone-100 text-stone-800 py-3 px-4 rounded-xl font-medium">
                <Mail size={20} className="text-stone-500 shrink-0" />
                <span className="truncate"> fiestaslascarbo@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 w-full bg-stone-100 text-stone-800 py-3 px-4 rounded-xl font-medium">
                <MessageCircle size={20} className="text-stone-500 shrink-0" />
                <span>Habla con la comisión</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.section>
  );
};