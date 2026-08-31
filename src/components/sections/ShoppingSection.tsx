'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ShoppingCart, MapPin, Clock, Navigation, Sparkles, Building2, Utensils, Wine, Store, Maximize2 } from 'lucide-react';
import { SHOPPING_GROUPS, SHOPPING_TIPS } from '@/data/shoppingData';

const DynamicLeafletMap = dynamic(
  () => import('./ShoppingMap').then((mod) => mod.ShoppingMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] bg-cream/70 rounded-xl flex items-center justify-center text-muted text-sm animate-pulse">
        Kaart laden...
      </div>
    ),
  }
);

const TYPE_ICON: Record<string, React.ReactNode> = {
  supermarkt: <ShoppingCart className="w-4 h-4" />,
  discounter: <ShoppingCart className="w-4 h-4" />,
  warenhuis: <Building2 className="w-4 h-4" />,
  winkelstraat: <Store className="w-4 h-4" />,
  speciaalzaak: <Sparkles className="w-4 h-4" />,
  wijnwinkel: <Wine className="w-4 h-4" />,
};

// Filtercategorieën voor de kaart (elke categorie = meerdere shop-types)
const CATEGORIES: { id: string; label: string; emoji: string; color: string }[] = [
  { id: 'boodschappen', label: 'Supermarkten', emoji: '🛒', color: '#1f7a3f' },
  { id: 'winkelen', label: 'Winkelen', emoji: '🛍️', color: '#c22b2b' },
  { id: 'speciaalzaken', label: 'Edelstenen', emoji: '💎', color: '#6b5f8f' },
  { id: 'wijn', label: 'Wijnwinkels', emoji: '🍷', color: '#8e2735' },
];

export const ShoppingSection: React.FC = () => {
  // Welke categorieën op de kaart zichtbaar zijn (standaard allemaal)
  const [activeCategories, setActiveCategories] = useState<string[]>(CATEGORIES.map((c) => c.id));
  const [resetKey, setResetKey] = useState(0);

  const toggleCategory = (id: string) => {
    setActiveCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const resetView = () => {
    setActiveCategories(CATEGORIES.map((c) => c.id));
    setResetKey((k) => k + 1);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-forest via-forest2 to-wine text-white rounded-3xl p-6 md:p-10 shadow-card">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Boodschappen &amp; Winkelen</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Winkelgids Dhronecken &amp; Omgeving
          </h2>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Alle supermarkten voor de dagelijkse boodschappen én de leukste winkelstraten en speciaalzaken rond onze uitstapjes — met adres, openingstijden, afstand en directe navigatie.
          </p>
        </div>
        <div className="absolute right-6 -bottom-6 opacity-10 text-white pointer-events-none hidden md:block">
          <ShoppingCart className="w-64 h-64" />
        </div>
      </div>

      {/* Overview Map */}
      <div className="bg-white rounded-2xl border border-line p-4 md:p-5 shadow-soft">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-wine" />
            <h3 className="text-2xl font-bold font-serif text-forest">Alle winkels &amp; supermarkten op de kaart</h3>
          </div>
          <button
            onClick={resetView}
            className="inline-flex items-center gap-1.5 bg-forest hover:bg-forest2 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Centreren (alle plaatsen)
          </button>
        </div>

        {/* Legenda / filter */}
        <div className="flex flex-wrap items-center gap-2 mt-3 mb-3">
          <span className="inline-flex items-center gap-1.5 mr-1 text-xs font-semibold text-forest bg-cream px-2.5 py-1.5 rounded-lg border border-line">
            <span className="w-3 h-3 rounded-full bg-[#d9a441] inline-block border border-white shadow" /> 🏠 Falkennest <span className="text-muted font-medium">(altijd)</span>
          </span>
          {CATEGORIES.map((cat) => {
            const active = activeCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                  active
                    ? 'text-white border-transparent shadow-sm'
                    : 'text-muted bg-white border-line opacity-50 hover:opacity-80'
                }`}
                style={active ? { backgroundColor: cat.color } : undefined}
                aria-pressed={active}
              >
                <span>{cat.emoji}</span>
                {cat.label}
                {!active && <span className="text-[9px] font-bold">✕</span>}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted mb-3">
          Klik op een categorie om die winkels op de kaart te tonen/verbergen. Ons verblijf Falkennest blijft altijd zichtbaar.
        </p>

        <div className="h-[420px] rounded-xl overflow-hidden border border-line/60">
          <DynamicLeafletMap activeCategories={activeCategories} resetKey={resetKey} />
        </div>
      </div>

      {/* Groups */}
      {SHOPPING_GROUPS.map((group) => (
        <div key={group.id} className="space-y-5">
          {/* Group header */}
          <div className={`relative overflow-hidden rounded-2xl shadow-card ${group.id === 'boodschappen' ? 'bg-forest2' : group.id === 'trier' ? 'bg-[#5a1a25]' : group.id === 'idar-oberstein' ? 'bg-[#3f3550]' : 'bg-[#6b1f2e]'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-90`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
            <div className="relative z-10 p-5 md:p-6">
              <div className="inline-flex items-center gap-2 bg-black/30 border border-white/25 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white">
                <Utensils className="w-3 h-3" />
                <span>{group.area}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif mt-2 leading-tight text-white drop-shadow-sm">{group.title}</h3>
              <p className="text-xs text-gold mt-0.5 font-bold uppercase tracking-wide">{group.subtitle}</p>
              <p className="text-sm text-white mt-2 max-w-2xl leading-relaxed drop-shadow-sm">{group.intro}</p>
            </div>
          </div>

          {/* Shop cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.shops.map((shop) => (
              <div key={shop.id} className="bg-white rounded-2xl border border-line p-5 shadow-soft flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-cream border border-line flex items-center justify-center text-wine flex-shrink-0">
                      {TYPE_ICON[shop.type]}
                    </span>
                    <div>
                      <h4 className="font-bold text-forest leading-tight">{shop.name}</h4>
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-wine">{shop.brand || shop.type}</span>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 mt-4 text-sm text-ink">
                  <MapPin className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" />
                  <span>{shop.address}, {shop.postalCode}</span>
                </div>

                {/* Hours */}
                {shop.hours && (
                  <div className="flex items-start gap-2 mt-2 text-sm">
                    <Clock className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" />
                    <span className="text-ink">{shop.hours}</span>
                  </div>
                )}

                {/* Distance + time */}
                <div className="flex items-center gap-4 mt-3 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1 bg-cream px-2.5 py-1 rounded-lg text-forest">
                    <MapPin className="w-3 h-3" /> {shop.distance}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-cream px-2.5 py-1 rounded-lg text-forest">
                    <Navigation className="w-3 h-3" /> {shop.driveTime}
                  </span>
                </div>

                {/* Why */}
                {shop.why && (
                  <p className="text-xs text-muted mt-3 leading-relaxed border-t border-line/60 pt-3">{shop.why}</p>
                )}

                {/* Navigate button */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-4 inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest2 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  Navigeer hierheen
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Tips */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-3">
          <Sparkles className="w-5 h-5 text-gold" />
          <h3 className="text-2xl font-bold font-serif text-forest">Handige Duitse Winkeltips</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SHOPPING_TIPS.map((tip, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-line p-5 shadow-soft">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xl">{tip.icon}</span>
                <b className="text-sm text-forest">{tip.title}</b>
              </div>
              <p className="text-xs text-muted leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
