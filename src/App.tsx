import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Music, 
  Users, 
  Star, 
  Flower2, 
  Info, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Menu,
  X,
  LogIn,
  LogOut,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface BalconyFormData {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  category: 'Residencial' | 'Comercial';
}

interface TalentFormData {
  fullName: string;
  actName: string;
  phone: string;
  email: string;
  needs: string;
}

// --- Data ---
const PROGRAMA = {
  religiosos: [
    {
      fecha: 'SÁBADO 27 DE JUNIO',
      eventos: [{ hora: '20.30', titulo: 'Santo Rosario' }]
    },
    {
      fecha: 'DOMINGO 28 DE JUNIO',
      eventos: [{ hora: '13.30', titulo: 'Función Religiosa' }]
    }
  ],
  populares: [
    {
      fecha: 'DOMINGO 21 DE JUNIO',
      eventos: [
        { hora: '9.00', titulo: 'IX Circular Carboneras Trail', desc: 'A su término, verbena amenizada por DAVID PÉREZ.' }
      ]
    },
    {
      fecha: 'VIERNES 26 DE JUNIO',
      eventos: [
        { hora: '20.00', titulo: 'Elección de ROMERA ADULTA', desc: 'Actuaciones de SONIA GIL, PARRANDA MALVASÍA DE TAGANANA y humorista. Reconocimiento a vecinos.' }
      ]
    },
    {
      fecha: 'SÁBADO 27 DE JUNIO',
      eventos: [
        { hora: '22.00', titulo: 'Exhibición pirotécnica', desc: 'Por HERMANOS TOSTES. Luego, gran verbena por las orquestas ACAPULCO y MALIBÚ BAND.' }
      ]
    },
    {
      fecha: 'DOMINGO 28 DE JUNIO',
      eventos: [
        { hora: '14.00', titulo: 'XCVI Paseo Romero' },
        { hora: '16.00', titulo: 'Verbena', desc: 'Amenizada por LOS KDTES y Orquesta REVELACIÓN.' }
      ]
    },
    {
      fecha: 'SÁBADO 4 DE JULIO',
      eventos: [
        { hora: '12.00', titulo: 'Partido de fútbol femenino', desc: 'CARBONERAS vs ROQUE NEGRO' },
        { hora: '13.00', titulo: 'Partido de fútbol masculino', desc: 'SOLTEROS vs CASADOS' },
        { hora: '14.00', titulo: 'Paella en la plaza', desc: 'Para los asistentes.' },
        { hora: '15.00', titulo: 'Día del niño', desc: 'Diferentes actividades.' },
        { hora: '18.00', titulo: '1ª edición de “Tu hocico me suena”', desc: 'Participación de personas del pueblo.' },
        { hora: '19.00', titulo: 'Verbena', desc: 'Amenizada por Orquesta TENERIFE y LATIN SOUND.' }
      ]
    },
    {
      fecha: 'DOMINGO 5 DE JULIO',
      eventos: [
        { hora: '9.00', titulo: 'Excursión de los mayores', desc: 'A diferentes puntos de la isla.' }
      ]
    }
  ]
};

// --- Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">{children}</h2>
    {subtitle && <p className="text-stone-600 font-bold uppercase tracking-widest text-base">{subtitle}</p>}
    <div className="w-24 h-1 bg-stone-800 mx-auto mt-6" />
  </div>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("bg-white rounded-3xl p-8 shadow-sm border border-stone-100", className)}>
    {children}
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'programa' | 'balcones' | 'hocico'>('programa');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const { register: regBalcony, handleSubmit: handleBalcony, reset: resetBalcony, watch: watchBalcony } = useForm<BalconyFormData>();
  const { register: regTalent, handleSubmit: handleTalent, reset: resetTalent, watch: watchTalent } = useForm<TalentFormData>();

  const balconyPhone = watchBalcony('phone');
  const balconyEmail = watchBalcony('email');
  const talentPhone = watchTalent('phone');
  const talentEmail = watchTalent('email');

  const onBalconySubmit = async (data: BalconyFormData) => {
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
      resetBalcony();
    } catch (error) {
      console.error("Error submitting balcony form:", error);
      alert("Hubo un error al enviar la inscripción. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onTalentSubmit = async (data: TalentFormData) => {
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
      resetTalent();
    } catch (error) {
      console.error("Error submitting talent form:", error);
      alert("Hubo un error al enviar la inscripción. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-stone-300 border-t-stone-800 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] font-sans text-stone-800 selection:bg-stone-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#f5f5f0]/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white">
              <Star size={20} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Las Carboneras</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setActiveTab('programa')}
              className={cn("text-base font-bold transition-colors", activeTab === 'programa' ? "text-stone-900 underline underline-offset-8 decoration-2" : "text-stone-600 hover:text-stone-900")}
            >
              Programa
            </button>
            <button 
              onClick={() => setActiveTab('balcones')}
              className={cn("text-base font-bold transition-colors", activeTab === 'balcones' ? "text-stone-900 underline underline-offset-8 decoration-2" : "text-stone-600 hover:text-stone-900")}
            >
              Concurso Balcones
            </button>
            <button 
              onClick={() => setActiveTab('hocico')}
              className={cn("text-base font-bold transition-colors", activeTab === 'hocico' ? "text-stone-900 underline underline-offset-8 decoration-2" : "text-stone-600 hover:text-stone-900")}
            >
              Tu Hocico me Suena
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-stone-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#f5f5f0] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-sans">
              <button onClick={() => { setActiveTab('programa'); setMobileMenuOpen(false); }}>Programa</button>
              <button onClick={() => { setActiveTab('balcones'); setMobileMenuOpen(false); }}>Concurso Balcones</button>
              <button onClick={() => { setActiveTab('hocico'); setMobileMenuOpen(false); }}>Tu Hocico me Suena</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
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

      <main className="max-w-4xl mx-auto px-6 pb-32">
        {/* Success Message */}
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

        {/* --- PROGRAMA --- */}
        {activeTab === 'programa' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-20"
          >
            <div>
              <SectionTitle subtitle="Tradición y Devoción">Actos Religiosos</SectionTitle>
              <div className="grid gap-6">
                {PROGRAMA.religiosos.map((dia, i) => (
                  <Card key={i} className="flex flex-col md:flex-row gap-6 items-start border-2 border-stone-200">
                    <div className="md:w-56 shrink-0">
                      <span className="text-2xl text-stone-900 font-bold">{dia.fecha}</span>
                    </div>
                    <div className="space-y-4 flex-1">
                      {dia.eventos.map((ev, j) => (
                        <div key={j} className="flex gap-4 items-center">
                          <span className="font-mono text-lg font-bold text-stone-600 bg-stone-100 px-2 py-1 rounded">{ev.hora}</span>
                          <h3 className="text-2xl font-bold text-stone-900">{ev.titulo}</h3>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle subtitle="Cultura y Diversión">Actos Populares</SectionTitle>
              <div className="grid gap-6">
                {PROGRAMA.populares.map((dia, i) => (
                  <Card key={i} className="flex flex-col md:flex-row gap-6 items-start border-2 border-stone-200">
                    <div className="md:w-56 shrink-0">
                      <span className="text-2xl text-stone-900 font-bold">{dia.fecha}</span>
                    </div>
                    <div className="space-y-8 flex-1">
                      {dia.eventos.map((ev, j) => (
                        <div key={j} className="flex gap-4 items-start">
                          <span className="font-mono text-lg font-bold text-stone-600 bg-stone-100 px-2 py-1 rounded mt-1">{ev.hora}</span>
                          <div>
                            <h3 className="text-2xl font-bold text-stone-900 mb-1">{ev.titulo}</h3>
                            {ev.desc && <p className="text-stone-700 text-lg leading-relaxed font-medium">{ev.desc}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* --- BALCONES --- */}
        {activeTab === 'balcones' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <SectionTitle subtitle="Rincones con Alma Canaria">Concurso de Balcones</SectionTitle>
            
            <Card className="bg-stone-900 text-white border-none p-10">
              <div className="flex items-center gap-4 mb-8">
                <Info className="text-stone-300" size={32} />
                <h3 className="text-3xl font-bold">Bases del I Concurso</h3>
              </div>
              <div className="space-y-8 text-stone-200 text-lg leading-relaxed">
                <p className="font-medium">El objetivo es incentivar la participación ciudadana en el embellecimiento de Las Carboneras, poniendo en valor la arquitectura tradicional y la identidad canaria.</p>
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm border-b border-white/20 pb-2">Participantes</h4>
                    <p>Personas mayores de edad residentes en el barrio. Viviendas particulares y establecimientos comerciales.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm border-b border-white/20 pb-2">Temática</h4>
                    <p>Exclusivamente canaria: flora autóctona, artesanía (calados, cestería), utensilios tradicionales.</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Criterios de Valoración</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <li className="flex items-center gap-3 font-medium"><ChevronRight size={20} className="text-stone-400" /> Canariedad (0-10)</li>
                    <li className="flex items-center gap-3 font-medium"><ChevronRight size={20} className="text-stone-400" /> Originalidad (0-10)</li>
                    <li className="flex items-center gap-3 font-medium"><ChevronRight size={20} className="text-stone-400" /> Dificultad (0-10)</li>
                    <li className="flex items-center gap-3 font-medium"><ChevronRight size={20} className="text-stone-400" /> Integración Floral (0-10)</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              <h3 className="text-4xl font-bold text-center text-stone-900">Formulario de Inscripción</h3>
              
              <Card className="bg-blue-50 border-blue-200 flex items-start gap-4 p-6">
                <Users className="text-blue-700 shrink-0 mt-1" size={28} />
                <div className="text-blue-900 text-lg">
                  <p className="font-bold mb-1">¿Necesitas ayuda con la inscripción?</p>
                  <p>Si eres una persona mayor y no sabes cómo inscribirte por la web, por favor <strong>contacta con nosotras</strong> directamente en el pueblo o a través de los miembros de la comisión. ¡Estaremos encantadas de ayudarte!</p>
                </div>
              </Card>

              <form onSubmit={handleBalcony(onBalconySubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Nombre y Apellidos *</label>
                    <input 
                      {...regBalcony('fullName', { required: true })}
                      className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                      placeholder="Tu nombre completo..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Teléfono {!balconyEmail && '*'}</label>
                    <input 
                      {...regBalcony('phone')}
                      className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                      placeholder="600 000 000"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Dirección Exacta *</label>
                  <input 
                    {...regBalcony('address', { required: true })}
                    className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                    placeholder="Calle, número, piso..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Email {!balconyPhone && '*'}</label>
                    <input 
                      {...regBalcony('email')}
                      type="email"
                      className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Categoría *</label>
                    <select 
                      {...regBalcony('category', { required: true })}
                      className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all appearance-none"
                    >
                      <option value="Residencial">Balcón Residencial</option>
                      <option value="Comercial">Escaparate Comercial</option>
                    </select>
                  </div>
                </div>
                <p className="text-sm text-stone-600 font-medium">* Campos obligatorios. Es necesario aportar al menos un teléfono o un correo electrónico.</p>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-stone-900 text-white py-6 rounded-2xl font-bold text-2xl hover:bg-stone-800 transition-all disabled:opacity-50 shadow-lg"
                >
                  {isSubmitting ? "Enviando..." : "Inscribirme ahora"}
                </button>
              </form>
            </div>
          </motion.section>
        )}

        {/* --- HOCICO --- */}
        {activeTab === 'hocico' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
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

              <form onSubmit={handleTalent(onTalentSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Nombre y Apellidos *</label>
                    <input 
                      {...regTalent('fullName', { required: true })}
                      className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                      placeholder="Tu nombre..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Artista a Imitar *</label>
                    <input 
                      {...regTalent('actName', { required: true })}
                      className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                      placeholder="Ej: Raphael, Isabel Pantoja..."
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Teléfono {!talentEmail && '*'}</label>
                    <input 
                      {...regTalent('phone')}
                      className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                      placeholder="600 000 000"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Email {!talentPhone && '*'}</label>
                    <input 
                      {...regTalent('email')}
                      type="email"
                      className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-stone-300 text-xl focus:outline-none focus:border-stone-800 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm uppercase tracking-widest font-bold text-stone-700">Necesidades Técnicas</label>
                  <textarea 
                    {...regTalent('needs')}
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
          </motion.section>
        )}
      </main>

      {/* Footer */}
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
    </div>
  );
}
