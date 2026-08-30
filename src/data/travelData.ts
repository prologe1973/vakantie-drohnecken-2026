export interface POI {
  name: string;
  lat: number;
  lon: number;
}

export interface Park {
  name: string;
  lat: number;
  lon: number;
  note: string;
}

export interface LocationData {
  title: string;
  desc: string;
  center: [number, number];
  zoom: number;
  poi: POI;
  parks: Park[];
  image: string;
}

export const LOCATIONS: Record<string, LocationData> = {
  Dhronecken: {
    title: 'Burg Dhronecken & Hölzbachklamm',
    desc: '13e-eeuwse burchtruïne + mystieke kloofwandeling',
    center: [49.7260, 6.9835],
    zoom: 15,
    poi: { name: 'Burg Dhronecken', lat: 49.7260, lon: 6.9840 },
    parks: [
      { name: 'Wanderparkplatz Hölzbachklamm', lat: 49.7249, lon: 6.9825, note: 'Start kloofwandeling' },
      { name: 'Parkeren dorp / Burg', lat: 49.7263, lon: 6.9828, note: 'Centraal in Dhronecken' }
    ],
    image: '/images/dhronecken.jpg'
  },
  Bernkastel: {
    title: 'Bernkastel-Kues — Weinfest',
    desc: 'Historische Marktplatz, Moezel-oever & Riesling wijngaarden',
    center: [49.9160, 7.0770],
    zoom: 15,
    poi: { name: 'Marktplatz (Weinfest)', lat: 49.9159, lon: 7.0763 },
    parks: [
      { name: 'Parkplatz an der Mosel', lat: 49.9185, lon: 7.0765, note: 'Aan de rivier, korte wandeling naar markt' },
      { name: 'P Bernkastel (centrum)', lat: 49.9151, lon: 7.0780, note: 'Dichtst bij het feestplein' }
    ],
    image: '/images/weinfest_mittelmosel.jpg'
  },
  Trier: {
    title: 'Trier — Porta Nigra & Hauptmarkt',
    desc: 'Romeinse keizerstad, oudste stad van Duitsland',
    center: [49.7580, 6.6430],
    zoom: 15,
    poi: { name: 'Porta Nigra', lat: 49.7596, lon: 6.6439 },
    parks: [
      { name: 'P Viehmarkt / centrum', lat: 49.7550, lon: 6.6400, note: 'Parkeergarage nabij Hauptmarkt' },
      { name: 'P Treviris / Porta Nigra', lat: 49.7605, lon: 6.6445, note: 'Dichtst bij de Romeinse poort' }
    ],
    image: '/images/trier_hauptmarkt.jpg'
  },
  Idar: {
    title: 'Idar-Oberstein — Felsenkirche',
    desc: 'Kerk in de rotswand (1482) & edelstenenstad',
    center: [49.7035, 7.3260],
    zoom: 15,
    poi: { name: 'Felsenkirche', lat: 49.7033, lon: 7.3257 },
    parks: [
      { name: 'P Zentrum / Stadttheater', lat: 49.7038, lon: 7.3275, note: 'Parkeergarage bij de markt' },
      { name: 'P Marktplatz Oberstein', lat: 49.7030, lon: 7.3268, note: 'Dichtst bij de 234 treden naar altaar' }
    ],
    image: '/images/steinkaulenberg_gem.jpg'
  },
  Herrstein: {
    title: 'Herrstein — Vakwerkstad',
    desc: 'Middeleeuwse tijdreis door 500 jaar vakwerkarchitectuur',
    center: [49.7797, 7.3380],
    zoom: 16,
    poi: { name: 'Historischer Ortskern', lat: 49.7797, lon: 7.3380 },
    parks: [
      { name: 'Parkplatz Ortsmitte', lat: 49.7804, lon: 7.3385, note: 'Aan de rand van de oude kern' }
    ],
    image: '/images/herrstein.jpg'
  },
  Erbeskopf: {
    title: 'Erbeskopf (816 m)',
    desc: 'Hoogste berg van Rijnland-Pfalts met de Windklang',
    center: [49.7330, 7.0860],
    zoom: 15,
    poi: { name: 'Windklang-sculptuur', lat: 49.7304, lon: 7.0906 },
    parks: [
      { name: 'Wanderparkplatz Erbeskopf', lat: 49.7372, lon: 7.0821, note: 'Startpunt Gipfelrauschen & zomerrodelbaan' }
    ],
    image: '/images/windklang_erbeskopf.jpg'
  },
  Geierlay: {
    title: 'Geierlay-hangbrug (Mörsdorf)',
    desc: 'Spectaculaire voetgangershangbrug: 360 m lang, 100 m hoog',
    center: [50.1044, 7.3540],
    zoom: 15,
    poi: { name: 'Geierlay-hangbrug', lat: 50.1035, lon: 7.3520 },
    parks: [
      { name: 'P1 Besucherzentrum Mörsdorf', lat: 50.1041, lon: 7.3481, note: 'Kortste route (1,7 km) · betaald' },
      { name: 'P2 Windorferstr.', lat: 50.1060, lon: 7.3400, note: 'Reserve parkeerplaats' },
      { name: 'P3 Treiser Str.', lat: 50.1010, lon: 7.3450, note: 'Reserve parkeerplaats' }
    ],
    image: '/images/geierlay_bridge.jpg'
  }
};

export const DISTANCES = [
  { destination: 'Erbeskopf', distance: '±8 km', time: '10 min', highlight: 'Hoogste top' },
  { destination: 'Bernkastel-Kues', distance: '±25 km', time: '25 min', highlight: 'Wijnfeest & Moezel' },
  { destination: 'Trier (centrum)', distance: '34 km', time: '35 min', highlight: 'Romeinse pracht' },
  { destination: 'Herrstein', distance: '±30 km', time: '30 min', highlight: 'Vakwerkstad' },
  { destination: 'Idar-Oberstein', distance: '±35 km', time: '35 min', highlight: 'Felsenkirche & Edelstenen' },
  { destination: 'Geierlay (Mörsdorf)', distance: '±55 km', time: '50 min', highlight: 'Hangbrugavontuur' },
];

export const HIKING_TRAILS = [
  {
    title: 'Hölzbachklamm',
    tags: ['Avontuurlijk', 'Mystiek', 'Vanuit Dhronecken'],
    desc: 'Kloofwandeling direct achter Burg Dhronecken langs kabbelende beekjes, houten vlonders en met mos begroeide rotsformaties.',
    photoTip: 'Statief meenemen voor prachtige long-exposure opnames van het stromende water.',
    link: 'https://www.komoot.com/highlight/147024',
    image: '/images/hoelzbach.jpg'
  },
  {
    title: "Traumschleife 'Gipfelrauschen'",
    tags: ['Panorama', 'Educatief', 'Erbeskopf 816m'],
    desc: 'Panoramawandeling over de hoogste berg van Rijnland-Pfalts met adembenemende vergezichten over het Nationaal Park Hunsrück-Hochwald.',
    photoTip: 'Prachtige 360° panorama-opnames vanaf het platform van de Windklang rond zonsondergang.',
    link: 'https://www.komoot.com/highlight/646440',
    image: '/images/windklang_erbeskopf.jpg'
  },
  {
    title: 'Geierlayschleife (Rondwandeling)',
    tags: ['Spectaculair', '±6 km', 'Onder de brug'],
    desc: 'Rondwandeling die diep in het beboste beekdal afdaalt en direct onder de 100 meter hoge hangbrug door loopt voor unieke perspectieven.',
    photoTip: 'Groothoeklens gebruiken aan het begin van de brug om de immense diepte vast te leggen.',
    link: 'https://www.komoot.com/discover/Geierlay_Suspension_Bridge/@50.1044430,7.3408330/tours?max_distance=2000',
    image: '/images/geierlay_bridge.jpg'
  },
  {
    title: 'Burg Hunolstein',
    tags: ['Kasteelruïne', 'Uitzichtpunt', 'Dhronvallei'],
    desc: 'Romantische burchtruïne op een steile rotskam met weids uitzicht over de vallei van de Dhron.',
    photoTip: 'Mooi strijklicht op de middeleeuwse stenen bogen in de late namiddag.',
    link: 'https://www.komoot.com/highlight/288556',
    image: '/images/hunolstein_castle.jpg'
  },
  {
    title: 'Züscher Hammer',
    tags: ['Historisch', 'Waterrad', 'Erfgoed'],
    desc: 'Grootste historische ijzersmelterij in de Hunsrück met een imposant draaiend houten waterrad en rustige bospaden.',
    photoTip: 'Korte sluitertijd voor spattend water rondom het monumentale rad.',
    link: 'https://www.komoot.com/highlight/219232',
    image: '/images/zuescher_hammer.jpg'
  }
];
