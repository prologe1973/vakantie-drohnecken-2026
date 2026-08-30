'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

interface DaysSectionProps {
  onSelectMapLocation: (locKey: string) => void;
}

interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
  bullets?: string[];
  table?: { act: string; cost: string }[];
}

interface DayPlan {
  num: string;
  title: string;
  sub: string;
  image: string;
  schedule: ScheduleItem[];
  tip?: string;
  mapButtons: { label: string; locKey: string }[];
}

export const DaysSection: React.FC<DaysSectionProps> = ({ onSelectMapLocation }) => {
  const days: DayPlan[] = [
    {
      num: 'DAG 1 · MA 7 SEP',
      title: 'Aankomst & Weinfest',
      sub: 'Burg Dhronecken · Hölzbachklamm · Bernkastel-Kues',
      image: '/images/weinfest_mittelmosel.jpg',
      schedule: [
        {
          time: 'Ochtend',
          title: 'Burg Dhronecken & Hölzbachklamm',
          desc: 'Verken de 13e-eeuwse burchtruïne van de Wildgrafen. Gebruik de ARGO-app voor de 360°-herbouw en beklim de toren voor panorama over de Kleine Dhron. Direct erachter start de mystieke kloofwandeling.',
        },
        {
          time: '13:00',
          title: 'Lunch in rustieke herberg (Thalfang)',
          desc: 'Geniet van traditionele Hunsrück-gerechten: vers geplukte bospaddenstoelen of een boerenbroodplank met streekham.',
        },
        {
          time: 'Middag / Avond',
          title: 'Weinfest der Mittelmosel — Bernkastel-Kues',
          desc: 'Slotavond van dit beroemde Moezelwijnfeest tussen historische vakwerkhuizen met muziek en gastronomie.',
          bullets: ['Flammkuchen (heet uit de oven)', 'Wildzwijn-specialiteiten', 'Riesling van steile leisteenhellingen'],
        },
      ],
      tip: '💶 Neem contant geld mee: niet alle traditionele wijnkraampjes accepteren pinpassen.',
      mapButtons: [
        { label: '🗺️ Burg Dhronecken & Kloof', locKey: 'Dhronecken' },
        { label: '🗺️ Bernkastel-Kues', locKey: 'Bernkastel' },
      ],
    },
    {
      num: 'DAG 2 · DI 8 SEP',
      title: 'Romeins Trier',
      sub: 'De oudste stad van Duitsland · Keizerlijke monumenten',
      image: '/images/trier_hauptmarkt.jpg',
      schedule: [
        {
          time: 'Ochtend',
          title: 'Koffie bij het Dreikönigenhaus (ca. 1200)',
          desc: 'Pauze bij Coffee Fellows in dit iconische vroeggotische woonhuis. De oorspronkelijke voordeur zit op de 2e verdieping tegen middeleeuwse indringers.',
        },
        {
          time: 'Lunch',
          title: 'Hauptmarkt — Terras van de Steipe',
          desc: 'Uitzicht op het mooiste marktplein van Duitsland en de Petrusbrunnen. Bezoek daarna de Dom en raak de historische Romeinse Domstein aan.',
        },
        {
          time: 'Middag',
          title: 'Cultuur & Wijn Excursies',
          desc: 'Bezoek aan de Romeinse UNESCO werelderfgoedlocaties:',
          table: [
            { act: 'Oudste wijnkelder (2000 jr)', cost: '€16 rondleiding' },
            { act: 'Porta Nigra & Kaiserthermen', cost: 'ca. €4 p.p.' },
            { act: 'Panoramaboottocht Moezel', cost: 'ca. €12–15' },
          ],
        },
        {
          time: 'Diner',
          title: 'Romantik Hotel Zur Glocke',
          desc: 'Verfijnd dineren op 2 minuten wandelen van de Hauptmarkt. Tip: ontbijt vooraf in de kapel van Boutiquehotel Kloster Pfalzel.',
        },
      ],
      tip: '🪙 Neem 50-centmuntjes mee voor de verlichte glasvloer (4e-eeuwse resten) in de Liebfrauenkirche.',
      mapButtons: [{ label: '🗺️ Trier centrum & Porta Nigra', locKey: 'Trier' }],
    },
    {
      num: 'DAG 3 · WO 9 SEP',
      title: 'Edelstenen & Vakwerk',
      sub: 'Idar-Oberstein · Felsenkirche · Herrstein',
      image: '/images/steinkaulenberg_gem.jpg',
      schedule: [
        {
          time: 'Lunch',
          title: 'Marktplatz Oberstein & Felsenkirche',
          desc: 'Spectaculair uitzicht op de kerk die tussen 1482 en 1484 direct in de steile rotswand is uitgehakt. Beklim de 234 treden naar het altaar.',
        },
        {
          time: 'Middag',
          title: 'Edelsteenmijn Steinkaulenberg & Herrstein',
          desc: 'Bezoek de enige toegankelijke edelsteenmijn van Europa met glinsterende amethisten. Daarna een tijdreis door het middeleeuwse vakwerkstadje Herrstein met koffie en Kuchen.',
        },
        {
          time: 'Diner',
          title: 'Rustieke herberg (Herrstein of Erbeskopf)',
          desc: 'Heerlijk wildbraad uit de omringende Hunsrück-bossen. Vooraf reserveren aanbevolen.',
        },
      ],
      mapButtons: [
        { label: '🗺️ Idar-Oberstein (Felsenkirche)', locKey: 'Idar' },
        { label: '🗺️ Historisch Herrstein', locKey: 'Herrstein' },
      ],
    },
    {
      num: 'DAG 4 · DO 10 SEP',
      title: 'Toppen & Hangbrug',
      sub: 'Erbeskopf (816 m) · Geierlay hangbrug',
      image: '/images/geierlay_bridge.jpg',
      schedule: [
        {
          time: 'Ochtend',
          title: 'Erbeskopf (816 m) & Windklang',
          desc: 'De hoogste berg van Rijnland-Pfalts. Bij het houten Windklang-kunstwerk bespeelt de wind de klankbuizen. Bezoek ook de interactieve oerbos-expositie.',
        },
        {
          time: 'Lunch',
          title: 'Picknick of Zomerrodelbaan',
          desc: 'Optie A: Picknick met panoramisch vergezicht tot in Frankrijk. Optie B: Terras bij het vrijetijdscentrum en adrenaline op de 1.345 m rodelbaan.',
        },
        {
          time: 'Middag',
          title: 'Geierlay-hangbrug (Mörsdorf)',
          desc: '360 meter lange hangbrug, 100 meter boven het bosdal. Wandel de Geierlayschleife (6 km) die spectaculair ónder de brug door loopt.',
        },
        {
          time: 'Diner',
          title: 'Winzer-restaurant in Mörsdorf',
          desc: 'De perfecte culinaire afsluiter van de reis.',
        },
      ],
      tip: '🅿️ Parkeren Geierlay: Gebruik P1 (Bezoekerscentrum Mörsdorf) voor de kortste looproute van 1,7 km.',
      mapButtons: [
        { label: '🗺️ Erbeskopf & Windklang', locKey: 'Erbeskopf' },
        { label: '🗺️ Geierlay Hangbrug', locKey: 'Geierlay' },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-wine">Dag per dag</span>
        <h2 className="text-3xl font-bold font-serif text-forest">Het Reisschema</h2>
        <p className="text-sm text-muted mt-1">
          Klik op een locatie-knop om direct de plattegrond met parkeerplaatsen te openen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {days.map((day, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-line overflow-hidden shadow-soft flex flex-col justify-between"
          >
            <div>
              {/* Header Image */}
              <div className="relative h-48 w-full">
                <Image src={day.image} alt={day.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <div className="absolute top-3 left-3 bg-forest text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow">
                  {day.num}
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold font-serif leading-tight">{day.title}</h3>
                  <p className="text-xs text-gray-200">{day.sub}</p>
                </div>
              </div>

              {/* Schedule Items */}
              <div className="p-5 space-y-4">
                {day.schedule.map((item, sIdx) => (
                  <div key={sIdx} className="flex gap-3 pb-3 border-b border-line/60 last:border-0 last:pb-0">
                    <span className="w-16 flex-shrink-0 text-xs font-bold text-gold uppercase pt-0.5">
                      {item.time}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-forest">{item.title}</h4>
                      <p className="text-xs text-ink mt-0.5 leading-relaxed">{item.desc}</p>
                      {item.bullets && (
                        <ul className="mt-1.5 space-y-0.5 text-xs text-ink list-disc list-inside text-muted">
                          {item.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      )}
                      {item.table && (
                        <div className="mt-2 overflow-hidden rounded-lg border border-line text-xs">
                          <table className="w-full text-left">
                            <thead className="bg-forest text-white text-[11px]">
                              <tr>
                                <th className="p-2">Activiteit</th>
                                <th className="p-2">Toegang</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-line">
                              {item.table.map((row, rIdx) => (
                                <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-cream/40' : ''}>
                                  <td className="p-2 font-medium">{row.act}</td>
                                  <td className="p-2 text-wine font-semibold">{row.cost}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {day.tip && (
                  <div className="p-3 bg-[#fff6e0] border-l-4 border-gold rounded-md text-xs text-ink">
                    {day.tip}
                  </div>
                )}
              </div>
            </div>

            {/* Map Action Buttons */}
            <div className="p-4 bg-cream/30 border-t border-line flex flex-wrap gap-2">
              {day.mapButtons.map((btn, bIdx) => (
                <button
                  key={bIdx}
                  onClick={() => onSelectMapLocation(btn.locKey)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-wine text-white hover:bg-wine-light transition-colors shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
