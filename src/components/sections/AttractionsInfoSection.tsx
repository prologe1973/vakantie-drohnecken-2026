'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  History,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Landmark,
  Layers,
  Search,
} from 'lucide-react';
import { ATTRACTIONS_INFO, AttractionDetail } from '@/data/travelData';

interface AttractionsInfoSectionProps {
  onSelectMapLocation?: (locKey: string) => void;
}

export const AttractionsInfoSection: React.FC<AttractionsInfoSectionProps> = ({
  onSelectMapLocation,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTags = [
    { id: 'all', label: 'Alle Bezienswaardigheden' },
    { id: 'dhronecken', label: 'Dhronecken & Omgeving' },
    { id: 'romeins', label: 'Romeins & Trier' },
    { id: 'wijn', label: 'Moezel & Wijn' },
    { id: 'edelsteen', label: 'Edelstenen & Vakwerk' },
    { id: 'natuur', label: 'Toppen & Hangbrug' },
  ];

  const filteredAttractions = ATTRACTIONS_INFO.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.history.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.funFacts.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'dhronecken') return item.id.includes('dhronecken') || item.id.includes('hunolstein');
    if (activeFilter === 'romeins') return item.id.includes('trier');
    if (activeFilter === 'wijn') return item.id.includes('bernkastel');
    if (activeFilter === 'edelsteen') return item.id.includes('idar') || item.id.includes('herrstein');
    if (activeFilter === 'natuur') return item.id.includes('erbeskopf') || item.id.includes('geierlay');
    return true;
  });

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-forest via-forest2 to-wine text-white rounded-3xl p-6 md:p-10 shadow-card">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Achtergronden &amp; Wist-je-datjes</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Bezienswaardigheden &amp; Weetjes
          </h2>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Ontdek de fascinerende verhalen achter onze reis: van 2.000 jaar oude Romeinse poorten en middeleeuwse belastingtrucs tot zingende bergen, roversnesten en eeuwenoude legendes.
          </p>
        </div>

        <div className="absolute right-6 -bottom-8 opacity-10 text-white pointer-events-none hidden md:block">
          <Landmark className="w-64 h-64" />
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {filterTags.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? 'bg-wine text-white shadow-sm'
                    : 'bg-white hover:bg-cream text-muted hover:text-ink border border-line'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Zoek weetje of plek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-line rounded-xl focus:outline-none focus:border-forest text-ink"
            />
          </div>
        </div>
      </div>

      {/* Attractions Grid */}
      <div className="space-y-8">
        {filteredAttractions.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-line overflow-hidden shadow-soft hover:shadow-card transition-all grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image Column */}
            <div className="relative h-64 sm:h-80 lg:h-auto lg:col-span-5 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
              
              <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow border border-white/10">
                {item.tag}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                <span className="text-[11px] font-bold text-gold uppercase tracking-wider">{item.period}</span>
                <h3 className="text-2xl font-bold font-serif">{item.title}</h3>
              </div>
            </div>

            {/* Content Column */}
            <div className="p-6 md:p-8 lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="hidden lg:block">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-wine uppercase tracking-wider">
                      {item.location}
                    </span>
                    <span className="text-xs font-semibold text-muted bg-cream px-2.5 py-0.5 rounded-full border border-line">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-forest mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted font-medium mt-0.5">{item.subtitle}</p>
                </div>

                {/* Historical Background */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-forest uppercase tracking-wide">
                    <History className="w-3.5 h-3.5 text-wine" />
                    <span>Historische Achtergrond</span>
                  </div>
                  <p className="text-xs md:text-sm text-ink leading-relaxed">
                    {item.history}
                  </p>
                </div>

                {/* Key Figures Badges */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {item.keyFigures.map((fig, fIdx) => (
                    <div key={fIdx} className="bg-cream/50 p-2.5 rounded-xl border border-line text-center">
                      <b className="block text-xs md:text-sm font-serif text-forest font-bold">{fig.value}</b>
                      <span className="text-[10px] text-muted block leading-tight">{fig.label}</span>
                    </div>
                  ))}
                </div>

                {/* Leuke Weetjes Box */}
                <div className="bg-[#fff9ea] rounded-2xl p-4 border border-[#fae4a8] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 text-gold fill-gold" />
                    <span>Leuke Weetjes &amp; Geheimen</span>
                  </div>
                  <ul className="space-y-2 text-xs text-amber-950">
                    {item.funFacts.map((fact, factIdx) => (
                      <li key={factIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-gold font-extrabold mt-0.5">✦</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visitor Tip */}
                <div className="bg-[#eef3ee] border-l-4 border-forest p-3 rounded-lg text-xs text-forest">
                  <b>💡 Bezoekers-tip:</b> {item.visitorTip}
                </div>
              </div>

              {/* Action Buttons */}
              {item.mapLocationKey && onSelectMapLocation && (
                <div className="pt-2 border-t border-line flex items-center justify-between">
                  <span className="text-xs text-muted">Locatie &amp; Parkeren bekijken</span>
                  <button
                    onClick={() => onSelectMapLocation(item.mapLocationKey!)}
                    className="inline-flex items-center gap-1.5 bg-forest hover:bg-forest2 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
                  >
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>Open op Kaart &rarr;</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
