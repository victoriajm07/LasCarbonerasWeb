import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// Layout Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';

// Tab Components
import { TabPrograma } from './components/tabs/TabPrograma';
import { TabBalcones } from './components/tabs/TabBalcones';
import { TabHocico } from './components/tabs/TabHocico';
import { TabCamisetas } from './components/tabs/TabCamisetass';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'programa' | 'balcones' | 'hocico'>('programa');

  useEffect(() => {
    setLoading(false);
  }, []);

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
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <Hero />

      <main className="max-w-4xl mx-auto px-6 pb-32 mt-12">
        {activeTab === 'programa' && <TabPrograma />}
        {activeTab === 'balcones' && <TabBalcones />}
        {activeTab === 'hocico' && <TabHocico />}
        {activeTab === 'camisetas' && <TabCamisetas />}
      </main>

      <Footer />
    </div>
  );
}