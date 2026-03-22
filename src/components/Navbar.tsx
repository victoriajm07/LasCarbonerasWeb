import React, { useState } from 'react';
import { Star, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NavbarProps {
  activeTab: 'programa' | 'balcones' | 'hocico';
  setActiveTab: (tab: 'programa' | 'balcones' | 'hocico') => void;
}

export const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'programa', label: 'Programa' },
    { id: 'balcones', label: 'Concurso Balcones' },
    { id: 'hocico', label: 'Tu Hocico me Suena' },
  ] as const;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#f5f5f0]/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white">
              <Star size={20} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Las Carboneras</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "text-base font-bold transition-colors", 
                  activeTab === item.id ? "text-stone-900 underline underline-offset-8 decoration-2" : "text-stone-600 hover:text-stone-900"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden text-stone-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#f5f5f0] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-sans">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};