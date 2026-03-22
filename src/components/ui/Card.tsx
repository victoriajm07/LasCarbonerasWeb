import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("bg-white rounded-3xl p-8 shadow-sm border border-stone-100", className)}>
    {children}
  </div>
);