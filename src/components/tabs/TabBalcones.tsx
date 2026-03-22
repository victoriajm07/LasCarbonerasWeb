import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Info, ChevronRight, Users, CheckCircle2, X } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';

interface BalconyFormData {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  category: 'Residencial' | 'Comercial';
}

export const TabBalcones = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, watch } = useForm<BalconyFormData>();
  const phone = watch('phone');
  const email = watch('email');

  const onSubmit = async (data: BalconyFormData) => {
    if (!data.phone && !data.email) {
      alert("Por favor, introduce al menos un teléfono o un correo electrónico.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/register-balcony', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to submit');
      setSubmitSuccess('¡Inscripción al concurso de balcones realizada con éxito!');
      reset();
    } catch (error) {
      alert("Hubo un error al enviar la inscripción. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 relative">
      <SectionTitle subtitle="Rincones con Alma Canaria">Concurso de Balcones</SectionTitle>
      
      {/* Todo el contenido informativo de las bases (lo omito aquí para no hacer eterno el bloque, es copiar y pegar el tuyo de Card "bg-stone-900") */}
      <Card className="bg-stone-900 text-white border-none p-10">
         <div className="flex items-center gap-4 mb-8">
           <Info className="text-stone-300" size={32} />
           <h3 className="text-3xl font-bold">Bases del I Concurso</h3>
         </div>
         {/* ... (tu contenido de las bases) ... */}
      </Card>

      <div className="space-y-8">
        <h3 className="text-4xl font-bold text-center text-stone-900">Formulario de Inscripción</h3>
        
        <Card className="bg-blue-50 border-blue-200 flex items-start gap-4 p-6">
          <Users className="text-blue-700 shrink-0 mt-1" size={28} />
          <div className="text-blue-900 text-lg">
            <p className="font-bold mb-1">¿Necesitas ayuda con la inscripción?</p>
            <p>Si no sabes cómo inscribirte por la web, por favor <strong>contacta con nosotras</strong> directamente en el pueblo o a través de los miembros de la comisión.</p>
          </div>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Nombre y Apellidos *</label>
              <input {...register('fullName', { required: true })} className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all" placeholder="Tu nombre completo..." />
            </div>
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Teléfono {!email && '*'}</label>
              <input {...register('phone')} className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all" placeholder="600 000 000" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Dirección Exacta *</label>
            <input {...register('address', { required: true })} className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all" placeholder="Calle, número, piso..." />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Email {!phone && '*'}</label>
              <input type="email" {...register('email')} className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all" placeholder="tu@email.com" />
            </div>
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Categoría *</label>
              <select {...register('category', { required: true })} className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all appearance-none">
                <option value="Residencial">Balcón Residencial</option>
                <option value="Comercial">Escaparate Comercial</option>
              </select>
            </div>
          </div>
          <button disabled={isSubmitting} type="submit" className="w-full bg-stone-900 text-white py-6 rounded-2xl font-bold text-2xl hover:bg-stone-800 transition-all disabled:opacity-50 shadow-lg">
            {isSubmitting ? "Enviando..." : "Inscribirme ahora"}
          </button>
        </form>
      </div>

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