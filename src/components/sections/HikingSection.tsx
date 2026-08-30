'use client';

import React from 'react';
import Image from 'next/image';
import { HIKING_TRAILS } from '@/data/travelData';
import { ExternalLink, Camera } from 'lucide-react';

export const HikingSection: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-wine">Wandelpaspoorten</span>
        <h2 className="text-3xl font-bold font-serif text-forest">De Mooiste Wandelroutes</h2>
        <p className="text-sm text-muted mt-1">
          Navigeer direct met de Komoot-app. Sla de wandelingen vooraf offline op voor optimaal bereik in de valleien.
        </p>
      </div>

      {/* Grid of Trails */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HIKING_TRAILS.map((trail, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-line overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image */}
              <div className="relative h-44 w-full">
                <Image src={trail.image} alt={trail.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <h3 className="absolute bottom-3 left-4 right-4 text-xl font-bold font-serif text-white leading-tight">
                  {trail.title}
                </h3>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {trail.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cream border border-line text-forest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-ink leading-relaxed">{trail.desc}</p>

                {trail.photoTip && (
                  <div className="flex items-start gap-2 p-2.5 bg-cream/60 rounded-lg text-xs text-wine font-medium">
                    <Camera className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{trail.photoTip}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Komoot Button */}
            <div className="p-4 pt-0">
              <a
                href={trail.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-cream border border-line text-forest text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
              >
                <span>Komoot Route Openen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Photography Golden Hours Box */}
      <div className="p-5 bg-white rounded-2xl border border-line shadow-soft space-y-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center gap-2">
          ✨ Gouden Uurtjes &amp; Fotolocaties
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-ink pt-1">
          <div className="p-3 bg-cream/40 rounded-xl border border-line/60">
            <b className="text-forest block mb-1">1. Hölzbachklamm</b>
            Vroege ochtend (8:00–10:00) voor magische mist en zonnestralen door het bladerdak.
          </div>
          <div className="p-3 bg-cream/40 rounded-xl border border-line/60">
            <b className="text-forest block mb-1">2. Windklang Erbeskopf</b>
            Rond zonsondergang (19:30) voor een gouden gloed over de Hunsrück-valleien.
          </div>
          <div className="p-3 bg-cream/40 rounded-xl border border-line/60">
            <b className="text-forest block mb-1">3. Trier Hauptmarkt</b>
            Avondschemering met sfeervol verlichte gevels en de Steipe terrassen.
          </div>
        </div>
      </div>
    </div>
  );
};
