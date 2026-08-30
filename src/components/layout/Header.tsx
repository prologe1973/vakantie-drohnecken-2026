'use client';

import React from 'react';
import { Home, Calendar, MapPin, Footprints, BookOpen, CheckSquare } from 'lucide-react';

export type TabId = 'overzicht' | 'dagen' | 'kaarten' | 'wandelen' | 'reisverslag' | 'praktisch';

interface HeaderProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  const navItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overzicht', label: 'Overzicht', icon: <Home className="w-4 h-4" /> },
    { id: 'dagen', label: 'Dagen', icon: <Calendar className="w-4 h-4" /> },
    { id: 'kaarten', label: 'Kaarten', icon: <MapPin className="w-4 h-4" /> },
    { id: 'wandelen', label: 'Wandelen', icon: <Footprints className="w-4 h-4" /> },
    { id: 'reisverslag', label: 'Reisverslag', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'praktisch', label: 'Praktisch', icon: <CheckSquare className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-forest text-white px-4 md:px-8 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-serif tracking-wide leading-tight">
              Rijnland-Pfalts 2026
            </h1>
            <p className="text-[11px] text-gray-300 uppercase tracking-widest">
              Hunsrück &amp; Moezel · Dhronecken
            </p>
          </div>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-wine text-white shadow-sm'
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Date badge */}
        <div className="bg-gold text-ink font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
          7–11 SEP 2026
        </div>
      </div>
    </header>
  );
};
