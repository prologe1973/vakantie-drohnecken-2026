'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  ExternalLink,
  Sparkles,
  Car,
  Wine,
  Camera,
  Compass,
  Info,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface DaysSectionProps {
  onSelectMapLocation: (locKey: string) => void;
}

interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
  bullets?: string[];
  table?: { act: string; cost: string }[];
  link?: { text: string; url: string };
}

interface DayProgram {
  num: string;
  badge: string;
  title: string;
  sub: string;
  image: string;
  quickStats: { label: string; value: string }[];
  schedule: ScheduleItem[];
  tip?: string;
  mapButtons: { label: string; locKey: string }[];
}


export const DaysSection: React.FC<DaysSectionProps> = ({ onSelectMapLocation }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const toggleDay = (idx: number) => {
    setExpandedDay(expandedDay === idx ? null : idx);
  };

  const days: DayProgram[] = [
    {
      num: 'DAG 1 · MAANDAG 7 SEP',
      badge: 'Aankomst & Wijnfeest',
      title: 'Aankomst, Dhronecken & Weinfest der Mittelmosel',
      sub: 'Falkennest Dhronecken · Bernkastel-Kues · Weinstraße & Moezel',
      image: '/images/weinfest_mittelmosel.jpg',
      quickStats: [
        { label: 'Reisafstand', value: '±25 km naar Moezel' },
        { label: 'Highlight', value: 'Weinfest der Mittelmosel' },
        { label: 'Sfeer', value: 'Romantisch & Feestelijk' },
      ],
      schedule: [
        {
          time: '12:00 – 15:00',
          title: 'Aankomst & Inchecken bij Falkennest (Dhronecken)',
          desc: 'Aankomst in Dhronecken via de Hunsrückhöhenstraße. Sleuteloverdracht en verkenning van ons ruime appartement Falkennest, het zonnige privéterras en de tuin. Maak alvast een korte ontspannen wandeling (200m) naar Burg Dhronecken en de ingang van de Hölzbachklamm.',
          bullets: [
            'Adres: Zum alten Bahnhof 12, 54426 Dhronecken (gratis privéparkeren)',
            'ARGO-app tip: Bekijk de 13e-eeuwse burcht in 360° virtuele reconstructie',
          ],
        },
        {
          time: '15:30 – 17:30',
          title: 'Panoramarit & Verkenning Historisch Bernkastel-Kues',
          desc: 'Prachtige autorit van 25 minuten die via de heuvels spectaculair afdaalt in het Moezeldal. Parkeren aan de Moezeloever en wandelen door de historische Altstadt met haar eeuwenoude vakwerkgevels.',
          bullets: [
            'Marktplatz met het beroemde Spitzhäuschen (1416) en het renaissance Stadhuis (1608)',
            'St. Michaelskirche en de St. Nikolaus-Hospital bibliotheek',
            'Zicht op de hooggelegen kasteelruïne Burg Landshut',
          ],
        },
        {
          time: '17:30 – 22:30',
          title: 'Het Weinfest der Mittelmosel (De Grote Slotavond!)',
          desc: 'Maandag 7 september is de feestelijke slotavond van het wereldberoemde Weinfest der Mittelmosel — een van de grootste en gezelligste wijnfeesten van heel Duitsland!',
          bullets: [
            'Weinstraße: ca. 300 meter lange wijnstraat langs de Moezel met meer dan 20 wijnhuizen (Riesling Trocken, Feinherb, Kabinett, Spätlese & Winzersekt)',
            'Federweißer & Zwiebelkuchen: Proef de allereerste jonge oogstwijn van het seizoen met warme versgebakken uientaart',
            'Live-muziek op het marktplein en langs de kade met een ongedwongen volksfeestsfeer',
            'Grote kermis (Rummelplatz) aan de Kueser Moezeloever met attracties en kraampjes',
          ],
          link: {
            text: 'Officiële website Weinfest der Mittelmosel',
            url: 'https://www.bernkastel.de/weinfest-der-mittelmosel',
          },
        },
      ],
      tip: "🅿️ Parkeertip Bernkastel: Parkeer op de grote parkeerstrook \"Parkplatz an der Mosel\" (B53) direct langs de rivier voor een korte, vlakke wandeling naar de Weinstraße.",
      mapButtons: [
        { label: '🗺️ Bernkastel-Kues & Parkeren', locKey: 'Bernkastel' },
        { label: '🗺️ Falkennest (Dhronecken)', locKey: 'Falkennest' },
      ],
    },
    {
      num: 'DAG 2 · DINSDAG 8 SEP',
      badge: 'Romeins Werelderfgoed',
      title: 'Romeins Trier & Historische Gastronomie',
      sub: 'Porta Nigra · Kaiserthermen · Dom van Trier · Hauptmarkt',
      image: '/images/trier_hauptmarkt.jpg',
      quickStats: [
        { label: 'Reistijd', value: '35 min (34 km)' },
        { label: 'UNESCO sites', value: '9 Romeinse monumenten' },
        { label: 'Ouderdom', value: 'Gesticht 16 v.Chr.' },
      ],
      schedule: [
        {
          time: '09:30 – 12:30',
          title: 'Porta Nigra & De Historische Romeinse As',
          desc: 'Bezoek aan de oudste stad van Duitsland. Beklim de imposante 2000 jaar oude Porta Nigra (Zwarte Poort, ca. 170 n.Chr.) en wandel door de autovrije Simeonstraße naar de bruisende Hauptmarkt.',
          bullets: [
            'Porta Nigra beklimmen (zonder cement gebouwd met stenen tot 6 ton)',
            'Hauptmarkt met het historische Marktkruis (958 n.Chr.) en de Sint-Petrusfontein',
            'Gotische Steipe en renaissance-gevels rondom het marktplein',
          ],
        },
        {
          time: '12:30 – 14:00',
          title: 'Lunch & Wijnproeverij bij Palais Kesselstatt',
          desc: 'Geniet van een ontspannen lunch op het terras van de Hauptmarkt of bij het beroemde wijnhuis Palais Kesselstatt tegenover de Dom, onder het genot van lokale Moezel- en Saarwijnen.',
        },
        {
          time: '14:00 – 17:30',
          title: 'Dom van Trier, Liebfrauenkirche & Kaiserthermen',
          desc: 'Verkenning van het indrukwekkende Romeinse en middeleeuwse erfgoed:',
          table: [
            { act: 'Porta Nigra & Kaiserthermen', cost: 'ca. €4 p.p. (combi-ticket voordelig)' },
            { act: 'Dom van Trier & Schatkamer', cost: 'Gratis toegang (Schatkamer €2)' },
            { act: 'Oudste Wijnkelder van Duitsland (2000 jr)', cost: '€16 rondleiding incl. proeverij' },
            { act: 'Panoramische Boottocht Moezel (optioneel)', cost: 'ca. €12–15 p.p.' },
          ],
          bullets: [
            'Dom van Trier: Oudste kathedraal van Duitsland met de Heilige Tuniek',
            'Liebfrauenkirche: Neem een 50-centmuntje mee voor de verlichte glasvloer met 4e-eeuwse resten',
            'Kaiserthermen: Wandel door de ondergrondse servicegangen van de keizerlijke baden',
          ],
        },
        {
          time: '18:30 – 21:00',
          title: 'Sfeervol Diner in Historisch Trier',
          desc: 'Dineer in Romantik Hotel Zur Glocke (op 2 minuten van de Hauptmarkt) of ontdek een traditionele Weinstube in de binnenstad voor een glas lokale Viez (Trierse appelwijn).',
        },
      ],
      tip: '🅿️ Parkeertip Trier: Parkeergarage Treviris (vlakbij Porta Nigra) of Parkeergarage City Viehmarkt.',
      mapButtons: [{ label: '🗺️ Trier centrum & Porta Nigra', locKey: 'Trier' }],
    },
    {
      num: 'DAG 3 · WOENSDAG 9 SEP',
      badge: 'Edelstenen & Middeleeuwen',
      title: 'Edelstenen, Felsenkirche & Vakwerkdorp Herrstein',
      sub: 'Idar-Oberstein · Steinkaulenberg · 500 jaar vakwerkhuizen',
      image: '/images/steinkaulenberg_gem.jpg',
      quickStats: [
        { label: 'Reistijd', value: '30–35 min' },
        { label: 'Kerkhoogte', value: '60 m in de rots' },
        { label: 'Specialiteit', value: 'Originele Spießbraten' },
      ],
      schedule: [
        {
          time: '10:00 – 12:30',
          title: 'Marktplatz Oberstein & De Felsenkirche (1482)',
          desc: 'Aankomst in Idar-Oberstein. Spectaculair uitzicht op de kerk die tussen 1482 en 1484 direct in een massieve rotsholte is uitgehakt. Beklim de 234 historische treden naar het altaar en bewonder de natuurlijke rotsbron in de kerk.',
          bullets: [
            'Beklimming 234 rotstreden naar de Felsenkirche met weids uitzicht over het Nahedal',
            'Ontdek de tragische ridderlegende van de broers Wyrich en Emich',
            'Wandel over de historische Marktplatz Oberstein met edelsteenwinkeltjes',
          ],
        },
        {
          time: '12:30 – 14:00',
          title: 'Lunch: De Echte Idar-Obersteiner Spießbraten',
          desc: 'Tijd voor de ultieme streekspecialiteit! Dikke, gekruide steaks langzaam geroosterd boven een open beukenhoutvuur op een traditionele Schwenker in een van de herbergen rond het marktplein.',
        },
        {
          time: '14:00 – 15:45',
          title: 'Edelsteenmijn Steinkaulenberg',
          desc: 'Bezoek aan de enige toegankelijke edelsteenmijn van Europa. Wandel met een veiligheidshelm onder begeleiding van een gids door de ondergrondse gangen vol glinsterende agaten, amethisten, bergkristallen en jaspis.',
        },
        {
          time: '16:00 – 18:00',
          title: 'Tijdreis in Middeleeuws Vakwerkdorp Herrstein',
          desc: 'Wandeling over de geplaveide straatjes van Herrstein met meer dan 50 monumentale, gerestaureerde vakwerkhuizen uit de 15e–18e eeuw. Bekijk de Uhrturm en de toren waar de beruchte struikrover Schinderhannes in 1798 gevangen zat.',
          bullets: [
            'Historischer Rundweg langs de Schinderhannes-toren en slotkerk',
            'Koffie met verse Hunsrücker Pflaumenkuchen in een historisch vakwerkcafé',
          ],
        },
        {
          time: '19:00 – 21:30',
          title: 'Rustiek Diner nabij Dhronecken',
          desc: 'Terugkeer naar de Hunsrück voor een heerlijk diner bij Landgasthof Rauland (Bäsch) of Restaurant Am Weiher (Thalfang).',
        },
      ],
      tip: '🧥 Tip Steinkaulenberg: In de edelsteenmijn heerst een constante temperatuur van 9°C. Neem een warme trui of jas mee!',
      mapButtons: [
        { label: '🗺️ Idar-Oberstein (Felsenkirche)', locKey: 'Idar' },
        { label: '🗺️ Historisch Herrstein', locKey: 'Herrstein' },
      ],
    },
    {
      num: 'DAG 4 · DONDERDAG 10 SEP',
      badge: 'Toppen & Sensatie',
      title: 'Toppen & Hangbrug: Erbeskopf & De Geierlay',
      sub: 'Erbeskopf (816 m) · Windklang · 360m Geierlay-hangbrug',
      image: '/images/geierlay_bridge.jpg',
      quickStats: [
        { label: 'Hoogste top', value: '816 m (Erbeskopf)' },
        { label: 'Brug lengte', value: '360 m (100 m hoog)' },
        { label: 'Natuur', value: 'Nationaal Park' },
      ],
      schedule: [
        {
          time: '09:30 – 12:00',
          title: 'Erbeskopf (816 m) & Het Windklang-kunstwerk',
          desc: 'Slechts 10 minuten rijden vanaf Falkennest naar het hoogste punt van Rijnland-Pfalts en heel Duitsland ten westen van de Rijn! Wandel over de Traumschleife Gipfelrauschen naar het monumentale houten beeldhouwwerk Windklang.',
          bullets: [
            'Windklang: Luister hoe de wind door de holle houten structuren muziek maakt',
            'Panoramaplatform met uitzicht tot over de Franse Vogezen en de Eifel',
            'Optioneel: Ritje op de 1.345 meter lange zomerrodelbaan aan de voet van de berg',
          ],
        },
        {
          time: '12:00 – 13:30',
          title: 'Lunch & Rit door het Hunsrück-landschap',
          desc: 'Lichte lunch bij het Hunsrückhaus of gezellige picknick met uitzicht. Vervolgens een ontspannen rit van 45 minuten noordwaarts door het heuvellandschap naar Mörsdorf.',
        },
        {
          time: '13:30 – 17:00',
          title: 'De Geierlay-Hangbrug (Mörsdorf)',
          desc: 'Een van de meest spectaculaire voetgangershangbruggen van Europa! 360 meter lang en zwevend op 100 meter hoogte boven het dichtbeboste dal van de Mörsdorfer Bach.',
          bullets: [
            'Parkeren bij P1 Besucherzentrum Mörsdorf (1,7 km wandelroute naar het brugportaal)',
            'Oversteek van de brug met adembenemend dieptezicht over het ravijn',
            'Geierlayschleife (6 km rondwandeling): Daalt diep af in het dal en loopt direct onder de 100 meter hoge hangbrug door voor unieke fotoperspectieven',
          ],
        },
        {
          time: '18:00 – 21:00',
          title: 'Feestelijk Afsluitend Diner in Mörsdorf',
          desc: 'Gezellig napraten en toosten op een fantastische vakantie in een sfeervol Winzer-restaurant in Mörsdorf of aan de Moezeloever.',
        },
      ],
      tip: "🅿️ Geierlay Navigatie: Stel je navigatie in op \"Besucherzentrum Geierlay, Kastellauner Str. 23, 56290 Mörsdorf\" (P1). Betaald parkeren met automaat/app.",
      mapButtons: [
        { label: '🗺️ Erbeskopf & Windklang', locKey: 'Erbeskopf' },
        { label: '🗺️ Geierlay Hangbrug (Mörsdorf)', locKey: 'Geierlay' },
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-forest via-forest2 to-wine text-white rounded-3xl p-6 md:p-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>4-Daags Vakantieprogramma · 7–11 Sep 2026</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight">
            Het Uitgebreide Reisschema
          </h2>
          <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
            Inclusief gedetailleerde tijdsindelingen, insidertips, entreeprijzen, parkeernavigatie en alle highlights van het <b>Weinfest der Mittelmosel</b>.
          </p>
        </div>

        <a
          href="https://www.bernkastel.de/weinfest-der-mittelmosel"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-ink font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all whitespace-nowrap"
        >
          <Wine className="w-4 h-4 text-wine" />
          <span>Weinfest Info Pagina</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Days List */}
      <div className="space-y-8">
        {days.map((day, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-line overflow-hidden shadow-card transition-all"
          >
            {/* Header Image with Badges */}
            <div className="relative h-56 sm:h-72 w-full">
              <Image src={day.image} alt={day.title} fill priority={idx === 0} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
              
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <div className="bg-forest text-white text-xs font-extrabold px-3.5 py-1.5 rounded-xl shadow-md border border-white/10">
                  {day.num}
                </div>
                <div className="bg-wine text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md">
                  {day.badge}
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white max-w-3xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-tight">
                  {day.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 mt-1">{day.sub}</p>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="bg-cream/60 border-b border-line px-6 py-3 grid grid-cols-3 gap-2 text-center text-xs">
              {day.quickStats.map((st, sIdx) => (
                <div key={sIdx}>
                  <span className="text-[10px] uppercase font-bold text-muted block leading-tight">{st.label}</span>
                  <b className="text-xs text-forest font-semibold block">{st.value}</b>
                </div>
              ))}
            </div>

            {/* Detailed Schedule Items */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-6">
                {day.schedule.map((item, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 bg-white rounded-2xl border border-line/80 shadow-soft hover:shadow-md transition-shadow space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-line/60 pb-2">
                      <h4 className="text-base sm:text-lg font-bold font-serif text-forest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-wine flex-shrink-0" />
                        <span>{item.title}</span>
                      </h4>
                      <span className="inline-flex items-center gap-1 bg-gold/15 text-amber-900 border border-gold/30 px-2.5 py-0.5 rounded-md text-xs font-extrabold w-fit">
                        <Clock className="w-3 h-3 text-gold fill-gold" />
                        <span>{item.time}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-ink leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Bullets */}
                    {item.bullets && (
                      <div className="space-y-1.5 pt-1">
                        {item.bullets.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-xs text-ink">
                            <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{b}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Table for Cost/Activities if present */}
                    {item.table && (
                      <div className="mt-3 overflow-hidden rounded-xl border border-line text-xs shadow-sm">
                        <table className="w-full text-left">
                          <thead className="bg-forest text-white text-[11px] font-bold">
                            <tr>
                              <th className="p-2.5">Activiteit / Bezienswaardigheid</th>
                              <th className="p-2.5 text-right">Toegang / Indicatie</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-line">
                            {item.table.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-cream/30' : 'bg-white'}>
                                <td className="p-2.5 font-medium text-ink">{row.act}</td>
                                <td className="p-2.5 text-right text-wine font-bold">{row.cost}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* External Link button if present */}
                    {item.link && (
                      <div className="pt-2">
                        <a
                          href={item.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#003580] hover:bg-[#00224f] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-colors"
                        >
                          <Wine className="w-3.5 h-3.5 text-gold" />
                          <span>{item.link.text}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Day Tip Alert */}
              {day.tip && (
                <div className="p-4 bg-[#fff9ea] border-l-4 border-gold rounded-xl text-xs text-amber-950 shadow-sm flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium">{day.tip}</div>
                </div>
              )}

              {/* Map & Navigation Action Buttons */}
              <div className="pt-2 border-t border-line flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-muted">Locaties op de kaart bekijken:</span>
                <div className="flex flex-wrap gap-2">
                  {day.mapButtons.map((btn, bIdx) => (
                    <button
                      key={bIdx}
                      onClick={() => onSelectMapLocation(btn.locKey)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-forest hover:bg-forest2 text-white transition-all shadow-sm"
                    >
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span>{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
