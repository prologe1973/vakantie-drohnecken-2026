'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { LOCATIONS } from '@/data/travelData';
import { Navigation } from 'lucide-react';

const DynamicLeafletMap = dynamic(
  () => import('./LeafletMap').then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] bg-cream/70 rounded-xl flex items-center justify-center text-muted text-sm animate-pulse">
        Kaart laden...
      </div>
    ),
  }
);

interface MapSectionProps {
  initialLocationKey?: string;
}

export const MapSection: React.FC<MapSectionProps> = ({ initialLocationKey = 'Dhronecken' }) => {
  const [selectedKey, setSelectedKey] = useState<string>(initialLocationKey);
  const locationKeys = Object.keys(LOCATIONS);
  const activeLocation = LOCATIONS[selectedKey] || LOCATIONS['Dhronecken'];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-wine">Plattegronden</span>
        <h2 className="text-3xl font-bold font-serif text-forest">Locaties &amp; Parkeren</h2>
        <p className="text-sm text-muted mt-1">
          Blauwe <b>P</b> = parkeerplaats. Rode pin = bezienswaardigheid. Navigeer direct via Google Maps.
        </p>
      </div>

      {/* Location Selector Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {locationKeys.map((key) => {
          const loc = LOCATIONS[key];
          const isSelected = selectedKey === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedKey(key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
                isSelected
                  ? 'bg-forest text-white shadow-sm scale-102'
                  : 'bg-white text-ink border border-line hover:bg-cream'
              }`}
            >
              {loc.title.split(' — ')[0]}
            </button>
          );
        })}
      </div>

      {/* Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-line p-4 shadow-soft flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold font-serif text-forest">{activeLocation.title}</h3>
              <p className="text-xs text-muted">{activeLocation.desc}</p>
            </div>
          </div>

          <div className="h-[380px] w-full rounded-xl overflow-hidden border border-line/60">
            <DynamicLeafletMap location={activeLocation} />
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 text-xs text-muted pt-1">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-wine inline-block" />
              Bezienswaardigheid
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-[#1d5fa8] text-white text-[9px] font-bold flex items-center justify-center">
                P
              </span>
              Parkeerplaats
            </span>
          </div>
        </div>

        {/* Parkings List */}
        <div className="bg-white rounded-2xl border border-line p-5 shadow-soft flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-3">
              🅿️ Parkeerplaatsen ({activeLocation.parks.length})
            </h4>
            <div className="divide-y divide-dashed divide-line">
              {activeLocation.parks.map((park, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-7 h-7 rounded-md bg-[#1d5fa8] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      P
                    </span>
                    <div>
                      <b className="text-sm text-forest block leading-tight">{park.name}</b>
                      <span className="text-xs text-muted">{park.note}</span>
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${park.lat},${park.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-forest hover:bg-forest2 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-colors shadow-sm"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Navigeer</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-cream/50 rounded-xl border border-line text-xs text-muted">
            Tip: Klik op <b>Navigeer</b> om direct je navigatie-app (Google Maps / Apple Maps) te starten met de exacte GPS-coördinaten.
          </div>
        </div>
      </div>
    </div>
  );
};
