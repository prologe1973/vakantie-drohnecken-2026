'use client';

import React from 'react';
import Image from 'next/image';
import { TabId } from '../layout/Header';
import { ACCOMMODATION } from '@/data/travelData';
import { ExternalLink, Star, MapPin, Camera } from 'lucide-react';

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

      {/* Featured Accommodation Card */}
      <div className="bg-white rounded-2xl border border-line overflow-hidden shadow-soft p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="relative h-48 md:h-full md:min-h-[220px] md:col-span-5 rounded-xl overflow-hidden">
          <Image
            src={ACCOMMODATION.image}
            alt={ACCOMMODATION.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2.5 left-2.5 bg-forest/90 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span>{ACCOMMODATION.rating}</span>
            <span className="text-[10px] text-gray-300">({ACCOMMODATION.ratingLabel})</span>
          </div>
        </div>

        <div className="md:col-span-7 space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-wine">
              Ons Vakantieverblijf
            </span>
            <h3 className="text-2xl font-bold font-serif text-forest">
              {ACCOMMODATION.name} · Dhronecken
            </h3>
            <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-gold" />
              <span>{ACCOMMODATION.address}, {ACCOMMODATION.postalCode} {ACCOMMODATION.city}</span>
            </p>
          </div>

          <p className="text-xs text-ink line-clamp-2 leading-relaxed">
            {ACCOMMODATION.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => onNavigate('verblijf')}
              className="bg-forest hover:bg-forest2 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              Bekijk Alle Verblijf Details &rarr;
            </button>
            <a
              href={ACCOMMODATION.photosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-wine hover:bg-wine-light text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-sm"
            >
              <Camera className="w-3.5 h-3.5 text-gold" />
              <span>Bekijk Foto's</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={ACCOMMODATION.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#003580] hover:bg-[#00224f] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-sm"
            >
              <span>Booking.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
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
