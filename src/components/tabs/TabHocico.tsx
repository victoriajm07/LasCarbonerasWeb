import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Music, Users, Trophy, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';

interface TalentFormData {
  fullName: string;
  actName: string;
  phone: string;
  email: string;
  needs: string;
}

export const TabHocico = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, watch } = useForm<TalentFormData>();
  const phone = watch('phone');
  const email = watch('email');

  const onSubmit = async (data: TalentFormData) => {
    // ... misma lógica de validación y fetch que pusiste en tu App.tsx ...
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 relative">
      <SectionTitle subtitle="Talento y Humor">Tu Hocico me Suena</SectionTitle>
      
      {/* Contenido de las tarjetas superiores (Música, Pueblo, Premios) y formulario... */}
      {/* ... (pega aquí tu formulario exacto de App.tsx) ... */}

      <AnimatePresence>
        {submitSuccess && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <CheckCircle2 className="text-emerald-400" />
            <span>{submitSuccess}</span>
            <button onClick={() => setSubmitSuccess(null)} className="ml-4 opacity-50 hover:opacity-100"><X size={18} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};