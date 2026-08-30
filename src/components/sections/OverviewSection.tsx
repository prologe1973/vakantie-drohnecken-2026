'use client';

import React from 'react';
import Image from 'next/image';
import { TabId } from '../layout/Header';

interface OverviewSectionProps {
  onNavigate: (tab: TabId) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigate }) => {
  const highlights = [
    {
      day: 'Ma 7 sep',
      title: 'Aankomst & Weinfest',
      sub: 'Bernkastel-Kues & Burg Dhronecken',
      tag: '📍 Wijnfeest',
      image: '/images/weinfest_mittelmosel.jpg',
    },
    {
      day: 'Di 8 sep',
      title: 'Romeins Trier',
      sub: 'Porta Nigra & Hauptmarkt',
      tag: '🏛️ Romeins',
      image: '/images/trier_hauptmarkt.jpg',
    },
    {
      day: 'Wo 9 sep',
      title: 'Edelstenen & Vakwerk',
      sub: 'Felsenkirche & Herrstein',
      tag: '💎 Edelstenen',
      image: '/images/steinkaulenberg_gem.jpg',
    },
    {
      day: 'Do 10 sep',
      title: 'Toppen & Hangbrug',
      sub: 'Erbeskopf & Geierlay',
      tag: '🥾 Panorama',
      image: '/images/geierlay_bridge.jpg',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative h-[48vh] min-h-[340px] max-h-[500px] w-full rounded-2xl overflow-hidden shadow-card">
        <Image
          src="/images/hero_hunsrueck.jpg"
          alt="Hunsrück & Moezel landschap"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-gold mb-1 block">
            Vakantiegids &amp; Reisverslag
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight text-white mb-2">
            Hunsrück &amp; de Moezel
          </h2>
          <p className="text-sm md:text-base text-gray-200 line-clamp-2">
            4 dagen wandelen, wijn proeven, kastelen ontdekken en herinneringen vastleggen — met uitvalsbasis Falkennest in Dhronecken.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="bg-white p-4 rounded-xl border border-line text-center shadow-soft">
          <b className="block text-2xl md:text-3xl font-serif text-forest">816 m</b>
          <span className="text-xs text-muted">Erbeskopf (hoogste top)</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-line text-center shadow-soft">
          <b className="block text-2xl md:text-3xl font-serif text-forest">360 m</b>
          <span className="text-xs text-muted">Geierlay hangbrug</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-line text-center shadow-soft">
          <b className="block text-2xl md:text-3xl font-serif text-forest">2.000 jr</b>
          <span className="text-xs text-muted">Romeins Trier</span>
        </div>
      </div>

      {/* Programma Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-wine">Programma</span>
            <h3 className="text-2xl font-bold font-serif text-forest">De 4 Vakantiedagen</h3>
          </div>
          <button
            onClick={() => onNavigate('dagen')}
            className="text-xs font-semibold text-wine hover:underline"
          >
            Bekijk schema &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('dagen')}
              className="group bg-white rounded-xl border border-line overflow-hidden shadow-soft hover:shadow-card transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-wine text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                  {item.tag}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-gold uppercase">{item.day}</span>
                  <h4 className="text-base font-bold text-forest group-hover:text-wine transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted mt-1">{item.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Introductie & AR Tip */}
      <div className="bg-white p-6 rounded-2xl border border-line shadow-soft space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-wine">In het kort</span>
        <h3 className="text-2xl font-bold font-serif text-forest">Een reis van uitersten</h3>
        <p className="text-sm text-ink leading-relaxed">
          Van de ruige, stille bossen van het Nationaal Park Hunsrück-Hochwald naar de monumentale Romeinse pracht van Trier en de eeuwenoude wijntradities van de Moezel. Alles ligt op korte rijafstand van je vakantieverblijf in <b>Falkennest, Dhronecken</b>.
        </p>
        <div className="p-3.5 bg-[#eef3ee] border-l-4 border-forest rounded-lg text-xs text-forest">
          <b>ARGO-app tip:</b> Download de gratis ARGO Augmented Reality app vooraf! Bij <b>Burg Dhronecken</b> projecteer je de complete 13e-eeuwse burcht in 360° over de huidige ruïnes heen.
        </div>
      </div>
    </div>
  );
};
