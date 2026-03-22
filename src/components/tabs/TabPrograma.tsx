import React from 'react';
import { motion } from 'motion/react';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { PROGRAMA } from '../../data/programa';

export const TabPrograma = () => (
  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-20">
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
);