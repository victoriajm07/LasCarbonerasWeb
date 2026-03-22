import React from 'react';

export const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">{children}</h2>
    {subtitle && <p className="text-stone-600 font-bold uppercase tracking-widest text-base">{subtitle}</p>}
    <div className="w-24 h-1 bg-stone-800 mx-auto mt-6" />
  </div>
);