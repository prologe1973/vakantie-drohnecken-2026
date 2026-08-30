'use client';

import React from 'react';
import Image from 'next/image';
import { ACCOMMODATION } from '@/data/travelData';
import {
  Home,
  Camera,
  Images,
  MapPin,
  Clock,
  ExternalLink,
  Wifi,
  Car,
  CheckCircle2,
  Navigation,
  Star,
  Coffee,
  Tv,
  Utensils
} from 'lucide-react';

import { TabId } from '@/components/layout/Header';

interface AccommodationSectionProps {
  onNavigateToMap: (locKey: string) => void;
  onNavigateTab?: (tab: TabId) => void;
}

export const AccommodationSection: React.FC<AccommodationSectionProps> = ({ onNavigateToMap, onNavigateTab }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-wine">Vakantieverblijf</span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest">
          {ACCOMMODATION.name} · Dhronecken
        </h2>
        <p className="text-sm text-muted mt-1">
          Alle informatie, faciliteiten en boekingsgegevens voor ons verblijf in de Hunsrück.
        </p>
      </div>

      {/* Main Feature Card */}
      <div className="bg-white rounded-3xl border border-line overflow-hidden shadow-card grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Image with Badges */}
        <div className="relative h-64 sm:h-80 lg:h-auto lg:col-span-6 w-full">
          <Image
            src={ACCOMMODATION.image}
            alt={ACCOMMODATION.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent lg:hidden" />
          
          {/* Photos Button Overlay */}
          <a
            href={ACCOMMODATION.photosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-lg border border-white/20 transition-all hover:scale-105"
          >
            <Camera className="w-4 h-4 text-gold" />
            <span>Bekijk Foto's (Booking)</span>
            <ExternalLink className="w-3 h-3 text-gray-300" />
          </a>
          
          {/* Booking Rating Badge */}
          <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg border border-white/10">
            <div className="bg-gold text-ink font-extrabold text-sm px-2 py-0.5 rounded-lg flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-ink" />
              <span>{ACCOMMODATION.rating}</span>
            </div>
            <div>
              <span className="text-xs font-bold block leading-tight">{ACCOMMODATION.ratingLabel}</span>
              <span className="text-[10px] text-gray-300">Booking.com</span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
            <span className="text-xs font-bold text-gold uppercase">{ACCOMMODATION.subtitle}</span>
            <h3 className="text-2xl font-bold font-serif">{ACCOMMODATION.name}</h3>
          </div>
        </div>

        {/* Right: Key Details & Quick Actions */}
        <div className="p-6 md:p-8 lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="hidden lg:block">
              <span className="text-xs font-bold text-wine uppercase tracking-wider">
                {ACCOMMODATION.subtitle}
              </span>
              <h3 className="text-3xl font-bold font-serif text-forest mt-0.5">
                {ACCOMMODATION.name}
              </h3>
            </div>

            <p className="text-sm text-ink leading-relaxed">
              {ACCOMMODATION.description}
            </p>

            {/* Address & Check-in Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-cream/50 rounded-xl border border-line flex items-start gap-3">
                <MapPin className="w-5 h-5 text-wine flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-muted uppercase block">Adres</span>
                  <b className="text-xs text-forest block">{ACCOMMODATION.address}</b>
                  <span className="text-xs text-ink">{ACCOMMODATION.postalCode} {ACCOMMODATION.city}</span>
                </div>
              </div>

              <div className="p-3.5 bg-cream/50 rounded-xl border border-line flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-muted uppercase block">In- &amp; Uitchecken</span>
                  <span className="text-xs text-ink block">Inchecken: <b>{ACCOMMODATION.checkIn}</b></span>
                  <span className="text-xs text-ink block">Uitchecken: <b>{ACCOMMODATION.checkOut}</b></span>
                </div>
              </div>
            </div>

            {/* Highlights bullet points */}
            <div className="space-y-1.5 pt-1">
              {ACCOMMODATION.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-ink font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons: Booking.com & Navigatie */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={ACCOMMODATION.photosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-wine hover:bg-wine-light text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02]"
            >
              <Camera className="w-4 h-4 text-gold" />
              <span>Foto's & Galerij</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={ACCOMMODATION.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#003580] hover:bg-[#00224f] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-md transition-colors"
            >
              <span>Booking.com</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${ACCOMMODATION.coordinates.lat},${ACCOMMODATION.coordinates.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest2 text-white text-xs sm:text-sm font-semibold py-3 px-5 rounded-xl shadow-md transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Route Navigatie</span>
            </a>

            <button
              onClick={() => onNavigateToMap('Falkennest')}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-cream border border-line text-forest text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl shadow-sm transition-colors"
            >
              <MapPin className="w-4 h-4 text-wine" />
              <span>Op kaart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-wine" />
          <h3 className="text-2xl font-bold font-serif text-forest">
            Voorzieningen &amp; Faciliteiten
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACCOMMODATION.facilities.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-line shadow-soft space-y-3 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-wine border-b border-line pb-2">
                  {cat.category}
                </h4>
                <ul className="space-y-2 text-xs text-ink pt-2">
                  {cat.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Restaurants from Booking */}
      <div className="bg-white rounded-3xl border border-line p-6 md:p-8 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-3">
          <div className="flex items-center gap-2.5">
            <Utensils className="w-5 h-5 text-wine" />
            <div>
              <h3 className="text-xl font-bold font-serif text-forest">
                Restaurants &amp; Cafés in de Buurt (Booking.com)
              </h3>
              <p className="text-xs text-muted">Dichtbij Falkennest (Dhronecken) · Binnen 5–6 minuten rijden</p>
            </div>
          </div>
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('culinair')}
              className="inline-flex items-center gap-1 text-xs font-bold text-wine hover:underline"
            >
              <span>Volledige Culinaire Gids openen &rarr;</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-cream/40 rounded-2xl border border-line space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-wine">3,8 km</span>
              <span className="text-[10px] bg-forest text-white px-2 py-0.5 rounded-md font-semibold">± 5 min</span>
            </div>
            <h4 className="text-sm font-bold text-forest">Restaurant Am Weiher</h4>
            <p className="text-xs text-muted">Aan het meer in Thalfang · Forel &amp; terras</p>
          </div>

          <div className="p-4 bg-cream/40 rounded-2xl border border-line space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-wine">3,9 km</span>
              <span className="text-[10px] bg-forest text-white px-2 py-0.5 rounded-md font-semibold">± 5 min</span>
            </div>
            <h4 className="text-sm font-bold text-forest">Restaurant Vu's Wok</h4>
            <p className="text-xs text-muted">Aziatisch &amp; Wok · Thalfang centrum</p>
          </div>

          <div className="p-4 bg-cream/40 rounded-2xl border border-line space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-wine">4,1 km</span>
              <span className="text-[10px] bg-forest text-white px-2 py-0.5 rounded-md font-semibold">± 6 min</span>
            </div>
            <h4 className="text-sm font-bold text-forest">Landgasthof Rauland</h4>
            <p className="text-xs text-muted">Klassiek Hunsrücker Gasthof &amp; Biergarten</p>
          </div>
        </div>
      </div>

      {/* Direct Booking Reminder Banner */}
      <div className="p-6 bg-gradient-to-r from-forest to-forest-light text-white rounded-3xl shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold block">
            Reservering &amp; Bevestiging
          </span>
          <h4 className="text-xl md:text-2xl font-bold font-serif mt-0.5">
            Falkennest, Dhronecken via Booking.com
          </h4>
          <p className="text-xs text-gray-200 mt-1 max-w-xl">
            Bekijk je boekingsbevestiging, kamerdetails, voorwaarden en contactgegevens van de eigenaar rechtstreeks op Booking.com.
          </p>
        </div>

        <a
          href={ACCOMMODATION.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-ink font-bold text-xs md:text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
        >
          <span>Open Booking.com Pagina</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
