'use client';

import React from 'react';
import { Home, Building2, Calendar, MapPin, Footprints, BookOpen, CheckSquare } from 'lucide-react';
import { TabId } from './Header';

interface BottomNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const navItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overzicht', label: 'Overzicht', icon: <Home className="w-4 h-4" /> },
    { id: 'verblijf', label: 'Verblijf', icon: <Building2 className="w-4 h-4" /> },
    { id: 'dagen', label: 'Dagen', icon: <Calendar className="w-4 h-4" /> },
    { id: 'kaarten', label: 'Kaarten', icon: <MapPin className="w-4 h-4" /> },
    { id: 'wandelen', label: 'Wandelen', icon: <Footprints className="w-4 h-4" /> },
    { id: 'reisverslag', label: 'Verslag', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'praktisch', label: 'Praktisch', icon: <CheckSquare className="w-4 h-4" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-line shadow-lg pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center py-2 px-0.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-1 transition-colors ${
                isActive ? 'text-wine font-bold' : 'text-muted hover:text-ink font-medium'
              }`}
            >
              {item.icon}
              <span className="text-[9.5px] tracking-tight">{item.label}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-wine -mt-0.5" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
