'use client';

import React, { useState, useEffect } from 'react';
import { Home, Compass, Utensils, Building2, Calendar, MapPin, Footprints, BookOpen, CheckSquare, CloudRain, Menu, X, ChevronRight, ShoppingCart } from 'lucide-react';

export type TabId = 'overzicht' | 'verblijf' | 'culinair' | 'weetjes' | 'dagen' | 'kaarten' | 'wandelen' | 'weer' | 'reisverslag' | 'winkels' | 'praktisch';

interface HeaderProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

// Alle navigatie-items (10 stuks) voor de sidebar
const ALL_ITEMS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'overzicht', label: 'Overzicht', icon: <Home className="w-5 h-5" /> },
  { id: 'verblijf', label: 'Verblijf', icon: <Building2 className="w-5 h-5" /> },
  { id: 'culinair', label: 'Culinair', icon: <Utensils className="w-5 h-5" /> },
  { id: 'weetjes', label: 'Weetjes & Info', icon: <Compass className="w-5 h-5" /> },
  { id: 'dagen', label: 'Dagen', icon: <Calendar className="w-5 h-5" /> },
  { id: 'kaarten', label: 'Kaarten', icon: <MapPin className="w-5 h-5" /> },
  { id: 'winkels', label: 'Boodschappen', icon: <ShoppingCart className="w-5 h-5" /> },
  { id: 'wandelen', label: 'Wandelen', icon: <Footprints className="w-5 h-5" /> },
  { id: 'weer', label: 'Weer', icon: <CloudRain className="w-5 h-5" /> },
  { id: 'reisverslag', label: 'Reisverslag', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'praktisch', label: 'Praktisch', icon: <CheckSquare className="w-5 h-5" /> },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Detecteer scrollen om de header van transparant naar donkergroen te laten overgaan
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navigeren + sidebar sluiten
  const go = (tab: TabId) => {
    setSidebarOpen(false);
    onSelectTab(tab);
  };

  // Slot scrollen wanneer sidebar open is
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const solid = scrolled || sidebarOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid ? 'bg-forest/95 backdrop-blur-md shadow-md' : 'bg-gradient-to-b from-black/40 to-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 h-16">
          {/* Logo / merk — opent de sidebar */}
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="flex items-center gap-2 shrink-0 text-left group"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold text-forest font-bold font-serif text-xl shadow-sm group-hover:scale-105 transition-transform">
              R
            </span>
            <span className="leading-none">
              <span className="block font-bold font-serif text-sm md:text-base tracking-wide text-white">
                Rijnland-Pfalts 2026
              </span>
              <span className="block text-[9px] md:text-[10px] text-white/70 uppercase tracking-widest mt-0.5">
                Menu
              </span>
            </span>
          </button>

          {/* Rechts: alleen een hamburger die de sidebar opent (op alle formaten) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold text-ink font-bold text-xs px-4 py-2.5 rounded-full shadow-sm transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay-dimmer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — schuift van links in */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-forest text-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gold text-forest font-bold font-serif text-lg">
              R
            </span>
            <div className="leading-none">
              <span className="block font-bold font-serif text-white text-sm">Rijnland-Pfalts 2026</span>
              <span className="block text-[10px] text-white/60 uppercase tracking-widest mt-0.5">7–11 september</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Sluit menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigatie-items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {ALL_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-sm transition-colors ${
                  isActive
                    ? 'bg-wine text-white shadow-sm'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-gold' : 'text-gold/80'}>{item.icon}</span>
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center justify-between text-[11px] text-white/50">
            <span>Hunsrück &amp; Moezel · Dhronecken</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </aside>
    </>
  );
};
