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
    if (!data.phone && !data.email) {
      alert("Por favor, introduce al menos un teléfono o un correo electrónico.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/register-talent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSubmitSuccess('¡Inscripción a "Tu hocico me suena" realizada con éxito!');
      reset();
    } catch (error) {
      console.error("Error submitting talent form:", error);
      alert("Hubo un error al enviar la inscripción. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 relative">
      <SectionTitle subtitle="Talento y Humor">Tu Hocico me Suena</SectionTitle>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center">
          <Music className="mx-auto mb-4 text-stone-400" />
          <h4 className="font-medium mb-2">Música</h4>
          <p className="text-sm text-stone-500">Imita a tu artista favorito con humor y talento.</p>
        </Card>
        <Card className="text-center">
          <Users className="mx-auto mb-4 text-stone-400" />
          <h4 className="font-medium mb-2">Pueblo</h4>
          <p className="text-sm text-stone-500">Participación abierta a todos los vecinos.</p>
        </Card>
        <Card className="text-center">
          <Trophy className="mx-auto mb-4 text-stone-400" />
          <h4 className="font-medium mb-2">Premios</h4>
          <p className="text-sm text-stone-500">Reconocimiento a las mejores actuaciones.</p>
        </Card>
      </div>

      <div className="space-y-8">
        <h3 className="text-4xl font-bold text-center text-stone-900">Inscripción al Show</h3>
        
        <div className="grid gap-6">
          <Card className="bg-amber-50 border-amber-300 flex items-start gap-4 p-6">
            <AlertCircle className="text-amber-700 shrink-0 mt-1" size={28} />
            <div className="text-amber-900 text-lg">
              <p className="font-bold mb-1">Aviso importante:</p>
              <p className="italic">La canción para la actuación debe llevarse el mismo día del evento en un pendrive para entregar a la organización.</p>
            </div>
          </Card>

          <Card className="bg-blue-50 border-blue-200 flex items-start gap-4 p-6">
            <Users className="text-blue-700 shrink-0 mt-1" size={28} />
            <div className="text-blue-900 text-lg">
              <p className="font-bold mb-1">¿Necesitas ayuda con la inscripción?</p>
              <p>Si no sabes cómo inscribirte por la web, por favor <strong>contacta con nosotras</strong> directamente en el pueblo o a través de los miembros de la comisión. ¡Estaremos encantadas de ayudarte!</p>
            </div>
          </Card>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Nombre y Apellidos *</label>
              <input 
                {...register('fullName', { required: true })}
                className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                placeholder="Tu nombre..."
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Artista a Imitar *</label>
              <input 
                {...register('actName', { required: true })}
                className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                placeholder="Ej: Raphael, Isabel Pantoja..."
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Teléfono {!email && '*'}</label>
              <input 
                {...register('phone')}
                className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                placeholder="600 000 000"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Email {!phone && '*'}</label>
              <input 
                {...register('email')}
                type="email"
                className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                placeholder="tu@email.com"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Necesidades Técnicas</label>
            <textarea 
              {...register('needs')}
              rows={4}
              className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all resize-none"
              placeholder="Número de micrófonos, atrezzo, etc."
            />
          </div>
          <p className="text-sm text-stone-600 font-medium">* Campos obligatorios. Es necesario aportar al menos un teléfono o un correo electrónico.</p>
          <button 
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-stone-900 text-white py-6 rounded-2xl font-bold text-2xl hover:bg-stone-800 transition-all disabled:opacity-50 shadow-lg"
          >
            {isSubmitting ? "Enviando..." : "Confirmar Inscripción"}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {submitSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <CheckCircle2 className="text-emerald-400" />
            <span>{submitSuccess}</span>
            <button onClick={() => setSubmitSuccess(null)} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};