'use client';

import React from 'react';
import {
  Utensils,
  MapPin,
  Car,
  Phone,
  ExternalLink,
  Navigation,
  Wine,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { NEARBY_RESTAURANTS, CULINARY_SPECIALTIES } from '@/data/travelData';

export const CulinarySection: React.FC = () => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero / Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-forest via-forest2 to-wine text-white rounded-3xl p-6 md:p-10 shadow-card">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" />
            <span>Gastronomie &amp; Wijnen</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Culinaire Gids &amp; Restaurants
          </h2>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Van knusse dorpsrestaurants om de hoek in Thalfang tot wereldberoemde Riesling-wijngaarden aan de Moezel en traditionele Hunsrücker Spießbraten. Ontdek hier waar je heerlijk eet en drinkt tijdens onze vakantie.
          </p>
        </div>

        <div className="absolute right-6 -bottom-6 opacity-10 text-white pointer-events-none hidden md:block">
          <Wine className="w-64 h-64" />
        </div>
      </div>

      {/* Booking.com Nearby Restaurants Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-wine" />
              <h3 className="text-2xl font-bold font-serif text-forest">
                Restaurants &amp; Cafés in de Buurt
              </h3>
            </div>
            <p className="text-xs text-muted mt-1">
              Officieel vermeld bij accommodatie <b>Falkennest (Dhronecken)</b> op Booking.com · Binnen 5–6 minuten rijden!
            </p>
          </div>
          <span className="self-start sm:self-auto bg-[#003580] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <ExternalLink className="w-3 h-3" />
            Booking.com vermelding
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {NEARBY_RESTAURANTS.map((rest) => (
            <div
              key={rest.id}
              className="bg-white rounded-2xl border border-line p-6 shadow-soft hover:shadow-card transition-all flex flex-col justify-between space-y-5 relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-wine uppercase tracking-wider">
                    {rest.category}
                  </span>
                  <div className="bg-forest text-white px-2.5 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
                    <Car className="w-3.5 h-3.5 text-gold" />
                    <span>{rest.distance}</span>
                    <span className="text-[10px] text-gray-300 font-normal">({rest.driveTime})</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold font-serif text-forest group-hover:text-wine transition-colors">
                    {rest.name}
                  </h4>
                  <p className="text-xs text-muted flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{rest.address}</span>
                  </p>
                  <div className="mt-1.5 inline-block bg-cream px-2 py-0.5 rounded text-[11px] font-semibold text-ink">
                    {rest.cuisine}
                  </div>
                </div>

                <p className="text-xs text-ink leading-relaxed">
                  {rest.description}
                </p>

                {rest.recommendedDishes && (
                  <div className="bg-cream/50 rounded-xl p-3 border border-line/60 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-wine block">
                      Aanraders op de kaart:
                    </span>
                    <ul className="space-y-1 text-xs text-ink">
                      {rest.recommendedDishes.map((dish, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-forest flex-shrink-0" />
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {rest.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-[#f0f4f1] text-forest text-[10px] font-medium px-2 py-0.5 rounded-full border border-forest/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-line flex flex-wrap gap-2">
                <a
                  href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(rest.googleMapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-forest hover:bg-forest2 text-white text-xs font-semibold py-2.5 px-3 rounded-xl shadow-sm transition-colors text-center"
                >
                  <Navigation className="w-3.5 h-3.5 text-gold" />
                  <span>Route &amp; Kaart</span>
                </a>

                {rest.phone && (
                  <a
                    href={'tel:' + rest.phone.replace(/\s+/g, '')}
                    className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-cream border border-line text-ink text-xs font-semibold py-2.5 px-3 rounded-xl shadow-sm transition-colors"
                    title="Bellen voor reservering"
                  >
                    <Phone className="w-3.5 h-3.5 text-wine" />
                    <span>Bellen</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Culinary Specialties Section */}
      <div className="space-y-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-wine">Streekcultuur</span>
          <h3 className="text-2xl font-bold font-serif text-forest">
            Traditionele Hunsrück &amp; Moezel Specialiteiten
          </h3>
          <p className="text-xs text-muted mt-0.5">
            Wat je beslist moet proeven tijdens ons verblijf in Rijnland-Pfalts!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CULINARY_SPECIALTIES.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-line p-5 shadow-soft space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-wine uppercase tracking-wider">
                    {item.region}
                  </span>
                  <span className="text-xs font-bold bg-cream px-2 py-0.5 rounded-full text-ink">
                    {item.tag}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-serif text-forest">
                  {item.title}
                </h4>

                <p className="text-xs text-ink leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-line/60">
                <span className="text-[10px] font-bold uppercase text-muted block">Waar te proeven:</span>
                <span className="text-xs font-medium text-forest block mt-0.5">{item.recommendedWhere}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Culinary Guide / Per Day Itinerary Tips */}
      <div className="bg-white rounded-3xl border border-line p-6 md:p-8 shadow-card space-y-6">
        <div className="flex items-center gap-2.5">
          <Wine className="w-6 h-6 text-wine" />
          <div>
            <h3 className="text-2xl font-bold font-serif text-forest">
              Culinaire Hoogtepunten per Vakantiedag
            </h3>
            <p className="text-xs text-muted">
              Hoe gastronomie perfect aansluit op ons 4-daagse programma
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-cream/50 rounded-2xl border border-line space-y-2">
            <div className="flex items-center justify-between">
              <b className="text-xs text-gold uppercase font-bold">Maandag 7 sep</b>
              <span className="text-[11px] bg-wine text-white font-bold px-2 py-0.5 rounded-full">Weinfest Moezel</span>
            </div>
            <h4 className="text-base font-bold font-serif text-forest">Bernkastel-Kues &amp; Riesling</h4>
            <p className="text-xs text-ink leading-relaxed">
              Dineer langs de sfeervolle Moezel-oever of proef bij de vele wijnstands op de historische Marktplatz. Neem een glas frisse Riesling met verse Zwiebelkuchen of een Flammkuchen.
            </p>
          </div>

          <div className="p-4 bg-cream/50 rounded-2xl border border-line space-y-2">
            <div className="flex items-center justify-between">
              <b className="text-xs text-gold uppercase font-bold">Dinsdag 8 sep</b>
              <span className="text-[11px] bg-forest text-white font-bold px-2 py-0.5 rounded-full">Historisch Trier</span>
            </div>
            <h4 className="text-base font-bold font-serif text-forest">Romeinse Kelders &amp; Hauptmarkt</h4>
            <p className="text-xs text-ink leading-relaxed">
              Strijk neer op de Hauptmarkt bij het beroemde <i>Palais Kesselstatt</i> voor een wijnproeverij, of ontdek een traditionele Weinstube in het centrum voor een glas lokale <i>Viez</i> (appelwijn).
            </p>
          </div>

          <div className="p-4 bg-cream/50 rounded-2xl border border-line space-y-2">
            <div className="flex items-center justify-between">
              <b className="text-xs text-gold uppercase font-bold">Woensdag 9 sep</b>
              <span className="text-[11px] bg-gold text-ink font-bold px-2 py-0.5 rounded-full">Edelsteen &amp; Vakwerk</span>
            </div>
            <h4 className="text-base font-bold font-serif text-forest">De Echte Spießbraten Experience</h4>
            <p className="text-xs text-ink leading-relaxed">
              Idar-Oberstein is de geboorteplaats van de Spießbraten. Bestel een authentiek boven beukenhout geroosterd stuk vlees in een van de traditionele herbergen rond de Felsenkirche of in vakwerkstad Herrstein.
            </p>
          </div>

          <div className="p-4 bg-cream/50 rounded-2xl border border-line space-y-2">
            <div className="flex items-center justify-between">
              <b className="text-xs text-gold uppercase font-bold">Donderdag 10 sep</b>
              <span className="text-[11px] bg-forest2 text-white font-bold px-2 py-0.5 rounded-full">Toppen &amp; Hangbrug</span>
            </div>
            <h4 className="text-base font-bold font-serif text-forest">Erbeskopf Panorama &amp; Geierlay Café</h4>
            <p className="text-xs text-ink leading-relaxed">
              Geniet van koffie en taart in het Hunsrückhaus / Gipfelrestaurant op 816m hoogte, en sluit de wandeldag af bij het gezellige bezoekerscafé in Mörsdorf bij de Geierlay-hangbrug.
            </p>
          </div>
        </div>
      </div>

      {/* Practical Restaurant Tips Box */}
      <div className="bg-[#eef3ee] border-l-4 border-forest p-5 rounded-2xl space-y-2 text-xs text-forest">
        <div className="flex items-center gap-2 font-bold text-sm">
          <Info className="w-4 h-4 text-wine" />
          <span>Praktische tips voor uit eten in Duitsland &amp; de Hunsrück</span>
        </div>
        <ul className="space-y-1.5 text-xs text-ink list-disc list-inside">
          <li><b>Ruhetag:</b> Veel Duitse restaurants in dorpen hebben op maandag of dinsdag een vaste sluitingsdag (<i>Ruhetag</i>). Controleer dit vooraf of bel even.</li>
          <li><b>Reserveren:</b> Vooral in het weekend of rond 18:30–20:00 uur is reserveren in traditionele Gasthöfe aan te bevelen.</li>
          <li><b>Betaalmethoden:</b> In kleinere Gasthöfe en wijnkramen op dorpsfeesten is contant geld (<i>Barzahlung</i>) nog altijd zeer handig.</li>
          <li><b>Fooi (Trinkgeld):</b> In Duitsland is 5% tot 10% gebruikelijk; rond het bedrag af bij het overhandigen van de betaling.</li>
        </ul>
      </div>
    </div>
  );
};
