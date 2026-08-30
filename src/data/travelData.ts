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

export interface AccommodationInfo {
  name: string;
  subtitle: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  bookingUrl: string;
  photosUrl: string;
  rating: number;
  ratingLabel: string;
  reviewCount: number;
  checkIn: string;
  checkOut: string;
  coordinates: { lat: number; lon: number };
  image: string;
  description: string;
  highlights: string[];
  facilities: { category: string; items: string[] }[];
}

export const ACCOMMODATION: AccommodationInfo = {
  name: 'Falkennest',
  subtitle: 'Vakantieappartement in Dhronecken',
  address: 'Zum alten Bahnhof 12',
  postalCode: '54426',
  city: 'Dhronecken',
  country: 'Duitsland',
  bookingUrl: 'https://www.booking.com/hotel/de/falkennest-dhronecken.nl.html',
  photosUrl: 'https://www.booking.com/hotel/de/falkennest-dhronecken.nl.html#tab-photos',
  rating: 9.8,
  ratingLabel: 'Uitzonderlijk',
  reviewCount: 12,
  checkIn: '15:00 – 18:00',
  checkOut: 'Tot 10:00',
  coordinates: { lat: 49.7258, lon: 6.9822 },
  image: '/images/falkennest.jpg',
  description:
    'Falkennest is een sfeervol en ruim vakantieappartement gelegen aan de rand van het bos in Dhronecken. Met een zonnig privéterras, een prachtig verzorgde tuin met barbecuefaciliteiten en moderne voorzieningen is dit de ideale rustieke uitvalsbasis voor onze vakantie in de Hunsrück en Moezelregio.',
  highlights: [
    'Ruim appartement (±85 m²) met 2 slaapkamers en eigen ingang',
    'Zonnig privéterras & verzorgde tuin met barbecuefaciliteiten',
    'Gratis privéparkeergelegenheid direct bij het verblijf',
    'Snel gratis WiFi in het gehele appartement',
    'Wandelpaden & Hölzbachklamm direct vanaf de voordeur bereikbaar',
    'Slechts 10 minuten rijden van de Erbeskopf (hoogste top van Rijnland-Pfalts)'
  ],
  facilities: [
    {
      category: 'Woon- & Slaapcomfort',
      items: [
        'Ruime woonkamer met comfortabele zithoek',
        'Flatscreen-tv met satellietzenders',
        'Geluiddichte, allergievrije en rookvrije ruimtes',
        'Verwarming & fris bergklimaat'
      ]
    },
    {
      category: 'Keuken & Eethoek',
      items: [
        'Volledig uitgeruste keuken met eettafel',
        'Koffiezetapparaat & waterkoker',
        'Koelkast, fornuis, oven & vaatwasser',
        'Keukengerei, servies & glaswerk'
      ]
    },
    {
      category: 'Badkamer',
      items: [
        'Moderne badkamer met inloopdouche',
        'Haardroger & handdoeken inbegrepen',
        'Eigen toilet en wastafel'
      ]
    },
    {
      category: 'Buiten & Tuin',
      items: [
        'Privéterras met comfortabel tuinmeubilair & parasol',
        'Verzorgde groene tuin met ligstoelen',
        'Barbecuefaciliteiten (BBQ)',
        'Mooi uitzicht op het heuvellandschap'
      ]
    }
  ]
};

export const LOCATIONS: Record<string, LocationData> = {
  Falkennest: {
    title: 'Falkennest — Ons Vakantieverblijf',
    desc: 'Zum alten Bahnhof 12, 54426 Dhronecken',
    center: [49.7258, 6.9822],
    zoom: 16,
    poi: { name: 'Falkennest (Vakantieverblijf)', lat: 49.7258, lon: 6.9822 },
    parks: [
      { name: 'Privéparkeerplaats Falkennest', lat: 49.7258, lon: 6.9822, note: 'Gratis parkeren bij de accommodatie' },
      { name: 'Wanderparkplatz Hölzbachklamm', lat: 49.7249, lon: 6.9825, note: 'Op 100m loopafstand' }
    ],
    image: '/images/falkennest.jpg'
  },
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

export interface NearbyRestaurant {
  id: string;
  name: string;
  distance: string;
  driveTime: string;
  category: string;
  cuisine: string;
  location: string;
  address: string;
  description: string;
  source: string;
  tags: string[];
  googleMapsQuery: string;
  phone?: string;
  recommendedDishes?: string[];
}

export interface CulinarySpecialty {
  title: string;
  region: string;
  tag: string;
  desc: string;
  icon: string;
  recommendedWhere: string;
}

export const NEARBY_RESTAURANTS: NearbyRestaurant[] = [
  {
    id: 'am-weiher',
    name: 'Restaurant Am Weiher',
    distance: '3,8 km',
    driveTime: '± 5 min',
    category: 'Restaurant & Café',
    cuisine: 'Duits / Regionaal & Vis',
    location: 'Thalfang (bij het meer)',
    address: 'Am Weiher 1, 54424 Thalfang',
    description: 'Sfeervol restaurant prachtig gelegen aan het recreatiemeer in Thalfang. Populair vanwege het zonnige terras aan het water, verse forel en seizoensgebonden Duitse vlees- en wildgerechten.',
    source: 'Booking.com vermelding bij Falkennest',
    tags: ['Terras aan het water', 'Verse vis & forel', 'Seizoensgerechten', 'Gezellig terras'],
    googleMapsQuery: 'Restaurant Am Weiher Thalfang',
    phone: '+49 6504 95590',
    recommendedDishes: ['Hunsrücker Forel Müllerin Art', 'Schnitzel met bospaddenstoelen', 'Koffie & vers gebak aan het meer']
  },
  {
    id: 'vus-wok',
    name: "Restaurant Vu's Wok",
    distance: '3,9 km',
    driveTime: '± 5 min',
    category: 'Restaurant & Afhaal',
    cuisine: 'Aziatisch / Vietnamees & Wok',
    location: 'Thalfang centrum',
    address: 'Hauptstraße 34, 54424 Thalfang',
    description: 'Geliefd Aziatisch restaurant en wok-specialist in het centrum van Thalfang. Biedt een brede keuze aan verse wokgerechten, knapperige eend, noedels en Vietnamese specialiteiten. Ook ideaal voor snelle afhaal naar Falkennest.',
    source: 'Booking.com vermelding bij Falkennest',
    tags: ['Aziatische wok', 'Snelle afhaal & diner', 'Verse groenten', 'Vietnamese gerechten'],
    googleMapsQuery: "Vu's Wok Thalfang",
    phone: '+49 6504 955373',
    recommendedDishes: ['Knapperige eend met gewokte groenten', 'Pad Thai & gebakken noedels', 'Vietnamese loempia’s']
  },
  {
    id: 'landgasthof-rauland',
    name: 'Restaurant Landgasthof Rauland',
    distance: '4,1 km',
    driveTime: '± 6 min',
    category: 'Traditioneel Gasthof & Biergarten',
    cuisine: 'Klassiek Duits & Hunsrücker Streekgerechten',
    location: 'Thalfang / Bäsch',
    address: 'Kobusweg 4, 54424 Thalfang-Bäsch',
    description: 'Authentiek familie-landgasthof met een rijke traditie in de Hunsrück. Bekend om royale porties klassieke Duitse kost, malse steaks, lokale wildspecialiteiten en een heerlijke rustieke Biergarten.',
    source: 'Booking.com vermelding bij Falkennest',
    tags: ['Traditioneel Gasthof', 'Hunsrücker gastvrijheid', 'Biergarten', 'Malse steaks & wild'],
    googleMapsQuery: 'Landgasthof Rauland Thalfang Bäsch',
    phone: '+49 6504 91400',
    recommendedDishes: ['Hunsrücker Spießbraten', 'Wildgoulash uit lokale bossen', 'Huisgemaakte schnitzels & lokaal getapt bier']
  }
];

export const CULINARY_SPECIALTIES: CulinarySpecialty[] = [
  {
    title: 'Idar-Obersteiner Spießbraten',
    region: 'Hunsrück / Naheland',
    tag: '🥩 Vleestraditie',
    icon: 'Flame',
    desc: 'Dikke, gekruide varkens- of runderribeye langzaam geroosterd boven een open beukenhoutvuur (op de karakteristieke Schwenker). De legende gaat terug naar edelsteenslijpers die het recept uit Zuid-Amerika meebrachten.',
    recommendedWhere: 'Historische herbergen rond Idar-Oberstein en traditionele Hunsrücker Gasthöfe.'
  },
  {
    title: 'Moezel Riesling & Steillagen Wijnen',
    region: 'Moezelvallei / Bernkastel',
    tag: '🍷 Wijntraditie',
    icon: 'Wine',
    desc: 'De steilste wijngaarden ter wereld op leisteenbodems produceren ongeëvenaarde minerale Rieslings: van fris droog (Trocken) tot fruitig-edelzoet (Kabinett, Spätlese) en mousserende Winzersekt.',
    recommendedWhere: 'Weinfest der Mittelmosel in Bernkastel-Kues en historische wijnhuizen (Straußwirtschaften).'
  },
  {
    title: 'Döppekooche (Schales)',
    region: 'Hunsrück & Eifel',
    tag: '🥔 Boerentraditie',
    icon: 'Utensils',
    desc: 'Een eeuwenoude stevige aardappelovenschotel van geraspte aardappelen, gerookt spek, uien en verse kruiden, langzaam gebakken in een gietijzeren pot tot er een heerlijk knapperige korst ontstaat.',
    recommendedWhere: 'Lokale eetcafés en dorpsfeesten in de Hunsrück.'
  },
  {
    title: 'Hunsrücker Beekforel & Vers Wild',
    region: 'Nationaal Park Hunsrück',
    tag: '🐟 Natuurproducten',
    icon: 'Fish',
    desc: 'Kristalheldere beekjes zoals de Dhron leveren boterzachte forel (gebakken met amandelen of gerookt). De uitgestrekte bossen leveren vers hert en wildzwijn van topkwaliteit.',
    recommendedWhere: 'Restaurant Am Weiher (Thalfang) en Landgasthöfe rond Dhronecken.'
  },
  {
    title: 'Federweißer & Zwiebelkuchen',
    region: 'Moezel (September Oogst)',
    tag: '🍇 Seizoensicoon',
    icon: 'Sparkles',
    desc: 'In september start de druivenoogst! Federweißer is jonge, gistende troebele wijn vol sprankelend fruit, traditiegetrouw geserveerd met een warm stuk versgebakken hartige uientaart (Zwiebelkuchen).',
    recommendedWhere: 'Wijnkramen langs de Moezelboulevard van Bernkastel-Kues.'
  }
];

export interface AttractionDetail {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  tag: string;
  period: string;
  image: string;
  history: string;
  funFacts: string[];
  keyFigures: { label: string; value: string }[];
  visitorTip: string;
  mapLocationKey?: string;
}

export const ATTRACTIONS_INFO: AttractionDetail[] = [
  {
    id: 'dhronecken-hoelzbach',
    title: 'Burg Dhronecken & Hölzbachklamm',
    subtitle: '13e-eeuwse burchtruïne & oeroude kwartsietkloof',
    location: 'Dhronecken (bij onze accommodatie)',
    tag: '🏰 Middeleeuwen & Natuur',
    period: 'Gesticht ca. 1300',
    image: '/images/dhronecken.jpg',
    history: 'De burcht van Dhronecken werd voor het eerst vermeld in 1309 als residentie van de ridders van Dhronecken en diende als strategisch steunpunt van de graven van Salm. De burcht doorstond vele belegeringen totdat Franse troepen hem in 1679 tijdens de Hollandse Oorlog verwoestten. Direct achter de burcht slingert de Hölzbach door een indrukwekkende kloof met kwartsietrotsen die meer dan 380 miljoen jaar oud zijn.',
    funFacts: [
      '📱 ARGO Augmented Reality: Met de gratis ARGO-app richt je je smartphone op de ruïne en zie je de burcht in volle glorie in 360° virtueel herrijzen.',
      '🌲 Bosrand: Onze accommodatie Falkennest ligt op nog geen 200 meter wandelen van de burchttoren!',
      '💧 De Hölzbachklamm heeft een natuurlijk bergklimaat en blijft op warme zomerdagen heerlijk koel.'
    ],
    keyFigures: [
      { label: 'Bouwjaar', value: 'ca. 1300' },
      { label: 'Ouderdom rotsen', value: '380 mln jr' },
      { label: 'Afstand Falkennest', value: '200 m' }
    ],
    visitorTip: 'Wandel de Hölzbachklamm in de ochtend wanneer het zonlicht prachtig door het bladerdek en het kabbelende beekje schijnt.',
    mapLocationKey: 'Dhronecken'
  },
  {
    id: 'bernkastel-moezel',
    title: 'Bernkastel-Kues & Weinfest',
    subtitle: 'Historische Marktplatz, vakwerkparels & Riesling-steillagen',
    location: 'Moezelvallei',
    tag: '🍷 Wijn & Vakwerk',
    period: 'Stadsrechten sinds 1291',
    image: '/images/weinfest_mittelmosel.jpg',
    history: 'Bernkastel-Kues is het kloppende hart van de Midden-Moezel. De stad staat wereldwijd bekend om haar romantische marktplein met renaissance-vakwerkhuizen en de steile wijngaarden die recht uit de leisteenbodem oprijzen. De burchtruïne Landshut (uit de 4e eeuw n.Chr. Romeins fundament) waakt hoog boven de stad over de meanderende rivier.',
    funFacts: [
      '📐 Belastingtruc in 1416: Het beroemde Spitzhäuschen heeft een piepkleine begane grond en brede bovenverdieping omdat belasting vroeger werd berekend naar het vloeroppervlak op de grond!',
      '🩺 De Bernkasteler Doctor: De legende wil dat aartsbisschop Boemund II in de 14e eeuw genas van een zware koorts door het drinken van lokale wijn. Uit dankbaarheid doopte hij de wijngaard officieel Doctor.',
      '⛰️ Steilste wijngaarden: Sommige wijnhellingen rond de Moezel hebben een hellingshoek van maar liefst 70%, waardoor alles met de hand moet worden geoogst.'
    ],
    keyFigures: [
      { label: 'Spitzhäuschen', value: 'Anno 1416' },
      { label: 'Steilste helling', value: 'Tot 70%' },
      { label: 'Afstand', value: '±25 km' }
    ],
    visitorTip: 'Bezoek tijdens het Weinfest de wijnstands van lokale familiebedrijven langs de oever en proef een glas koude Federweißer met warme Zwiebelkuchen.',
    mapLocationKey: 'Bernkastel'
  },
  {
    id: 'trier-romeins',
    title: 'Trier — Oudste Stad van Duitsland',
    subtitle: 'Porta Nigra, Kaiserthermen & 2000 jaar UNESCO Werelderfgoed',
    location: 'Trier centrum',
    tag: '🏛️ Romeins Werelderfgoed',
    period: 'Gesticht 16 v.Chr. door keizer Augustus',
    image: '/images/trier_hauptmarkt.jpg',
    history: 'Trier (Augusta Treverorum) werd gesticht door keizer Augustus in 16 v.Chr. en groeide uit tot de hoofdstad van het West-Romeinse Rijk ("het Tweede Rome"). Keizers zoals Constantijn de Grote bestuurden hier vandaan een wereldrijk. De stad herbergt het best bewaarde ensemble van Romeinse bouwwerken ten noorden van de Alpen.',
    funFacts: [
      '🧱 Bouwen zonder cement: De gigantische zandstenen blokken van de Porta Nigra (tot 6 ton zwaar) zijn zonder een druppel specie op elkaar gestapeld en werden vastgezet met ijzeren krammen en vloeibaar lood.',
      '⛪ Gered door een kluizenaar: De Porta Nigra is bewaard gebleven omdat de Griekse monnik Simeon zich er in 1028 liet inmetselen als kluizenaar. Na zijn heiligverklaring werd de poort een dubbelkerk, waardoor hij niet als steengroeve werd gesloopt.',
      '🪙 Glazen vloer: In de gotische Liebfrauenkirche (naast de Dom) kun je met een 50-centmuntje de glasvloer verlichten om 4e-eeuwse Romeinse fundamenten te bekijken.'
    ],
    keyFigures: [
      { label: 'Ouderdom stad', value: '2.040+ jaar' },
      { label: 'Zwaarste stenen', value: 'Tot 6 ton' },
      { label: 'UNESCO sites', value: '9 monumenten' }
    ],
    visitorTip: 'Wandel vanaf de Porta Nigra door de voetgangerszone naar de Hauptmarkt en bewonder het historische standbeeld van Sint-Petrus op de fontein (1595).',
    mapLocationKey: 'Trier'
  },
  {
    id: 'idar-felsenkirche',
    title: 'Idar-Oberstein & De Felsenkirche',
    subtitle: 'In de rotswand uitgehakte kerk (1482) & Europese edelsteenhoofdstad',
    location: 'Idar-Oberstein / Nahetal',
    tag: '💎 Rotskerk & Edelstenen',
    period: 'Kerk gebouwd 1482–1484',
    image: '/images/steinkaulenberg_gem.jpg',
    history: 'Idar-Oberstein is wereldberoemd om haar edelsteenslijperijen en de adembenemende Felsenkirche, die 60 meter boven het dal letterlijk in een natuurlijke rotsholte is gebouwd. Al in de 15e eeuw werden in de omliggende heuvels agaten, amethisten en jaspis gevonden. Toen lokale mijnen uitgeput raakten, trokken slijpers naar Brazilië en verscheepten enorme ruwe edelstenen terug naar de Nahe.',
    funFacts: [
      '⚔️ De broederlegende: Volgens de overlevering ruzieden de ridderbroers Wyrich en Emich om de mooie jonkvrouw Bertha van Lichtenberg. Wyrich wierp zijn broer uit het kasteelraam de diepte in. Uit berouw bouwde hij eigenhandig de kerk op de exacte plek van de val.',
      '💧 Bron in de kerk: Binnenin de kerk ontspringt een natuurlijke waterbron die rechtstreeks uit de massieve rotswand stroomt.',
      '🪜 234 treden: Om de kerk te bereiken beklim je een historische rotstrap van 234 treden vanaf het marktplein.'
    ],
    keyFigures: [
      { label: 'Hoogte boven dal', value: '60 meter' },
      { label: 'Aantal treden', value: '234 treden' },
      { label: 'Bouwjaar kerk', value: '1482' }
    ],
    visitorTip: 'Bezoek de edelsteenmijn Steinkaulenberg — de enige edelsteenmijn in Europa waar je met helm door glinsterende agaat- en amethistaders wandelt.',
    mapLocationKey: 'Idar'
  },
  {
    id: 'herrstein-vakwerk',
    title: 'Historisch Vakwerkdorp Herrstein',
    subtitle: '500 jaar vakwerkarchitectuur & de legende van rover Schinderhannes',
    location: 'Herrstein (Deutsche Edelsteinstraße)',
    tag: '🏘️ Middeleeuws Erfgoed',
    period: '15e – 18e eeuw',
    image: '/images/herrstein.jpg',
    history: 'Herrstein is een sprookjesachtig bewaard gebleven middeleeuws stadje met meer dan 50 monumentale vakwerkhuizen, een 13e-eeuwse kasteeltoren en een geplaveide dorpskern. Het stadje lag strategisch op de grens van verschillende vorstendommen en behield dankzij zorgvuldige restauraties haar unieke historische karakter.',
    funFacts: [
      '🦹 Rover Schinderhannes: De legendarische Duitse struikrover Johannes Bückler (bijgenaamd Schinderhannes) zat in 1798 gevangen in de toren van Herrstein voordat hij via een spectaculaire ontsnapping wist te vluchten.',
      '🪵 Symbolen in het hout: Veel vakwerkbalken bevatten ingekerfde андraski-kruisen en zonnewielen om boze geesten, bliksem en ziekten buitenshuis te houden.',
      '🔔 De Uhrturm: De karakteristieke klokkentoren fungeerde tevens als verdedigingspoort van het stadje.'
    ],
    keyFigures: [
      { label: 'Monumenten', value: '50+ panden' },
      { label: 'Oudste vakwerk', value: 'ca. 1450' },
      { label: 'Afstand Falkennest', value: '±30 km' }
    ],
    visitorTip: 'Wandel het Historische Rundweg met de informatieborden en strijk neer bij een lokaal café voor traditionele Pflaumenkuchen met koffie.',
    mapLocationKey: 'Herrstein'
  },
  {
    id: 'erbeskopf-windklang',
    title: 'Erbeskopf (816 m) & De Windklang',
    subtitle: 'Hoogste berg van Rijnland-Pfalts & Nationaal Park Hunsrück-Hochwald',
    location: 'Nationaal Park Hunsrück',
    tag: '⛰️ Hoogste Top & Natuur',
    period: 'Nationaal Park opgericht 2015',
    image: '/images/windklang_erbeskopf.jpg',
    history: 'De Erbeskopf is met 816 meter de hoogste berg van Rijnland-Pfalts en het hoogste punt van Duitsland ten westen van de Rijn. Op de top staat het monumentale houten beeldhouwwerk Windklang, ontworpen door kunstenaar Christoph Mancke. Het omringende Nationaal Park Hunsrück-Hochwald is een van de jongste en ruigste oerbosreservaten van Duitsland.',
    funFacts: [
      '🌬️ De Zingende Berg: De houten Windklang-sculptuur werkt als een natuurlijk akoestisch instrument; bij harde wind hoor je diepe tonen door de buizen en holtes zingen.',
      '🔭 Uitzicht tot Frankrijk: Bij helder weer reikt het panorama vanaf het platform tot aan de Vogezen in Frankrijk en het Eifelgebergte.',
      '🐱 Rijk van de Wilde Kat: In de dichte beukenbossen rondom de Erbeskopf leeft de grootste populatie Europese wilde katten van Centraal-Europa.'
    ],
    keyFigures: [
      { label: 'Hoogste top', value: '816 meter' },
      { label: 'Rodelbaan lengte', value: '1.345 m' },
      { label: 'Afstand Falkennest', value: '10 min (8 km)' }
    ],
    visitorTip: 'Combineer de topwandeling (Traumschleife Gipfelrauschen) met een ritje op de 1.345 meter lange zomerrodelbaan aan de voet van de berg.',
    mapLocationKey: 'Erbeskopf'
  },
  {
    id: 'geierlay-hangbrug',
    title: 'Geierlay-Hangbrug (Mörsdorf)',
    subtitle: '360 meter lange spectaculaire voetgangershangbrug, 100 m boven het dal',
    location: 'Mörsdorf / Hunsrück',
    tag: '🌁 Hangbrug & Sensatie',
    period: 'Geopend in 2015',
    image: '/images/geierlay_bridge.jpg',
    history: 'De Geierlay-hangbrug werd geopend in 2015 en was op dat moment de langste hangbrug van Duitsland. De brug overspant het beboste dal van de Mörsdorfer Bach tussen de dorpen Mörsdorf en Sosberg. Het ontwerp is gebaseerd op traditionele Nepalese touwbruggen en trekt jaarlijks honderdduizenden wandelaars uit heel Europa.',
    funFacts: [
      '🦅 Waar komt de naam vandaan? Geierlay is vernoemd naar de oude veldnaam van het rotsplateau: Geier (buizerds/roofvogels) die nestelden op de Lay (leisteenrots).',
      '⚓ Diepe rotsankers: De vier hoofddraagkabels (40 mm dik staal) zijn verankerd met 25 meter diepe ankers in de massieve rotsbodem.',
      '👥 Reusachtige draagkracht: De brug weegt 57 ton en kan het gewicht van circa 600 volwassen personen gelijktijdig veilig dragen.'
    ],
    keyFigures: [
      { label: 'Lengte', value: '360 meter' },
      { label: 'Hoogte boven dal', value: '100 meter' },
      { label: 'Brugdek breedte', value: '85 cm' }
    ],
    visitorTip: 'Wandel de Geierlayschleife (6 km). Deze rondwandeling daalt af in het diepe dal en loopt direct onder de 100 meter hoge brug door voor fantastische foto’s!',
    mapLocationKey: 'Geierlay'
  },
  {
    id: 'hunolstein-zuescher',
    title: 'Burg Hunolstein & Züscher Hammer',
    subtitle: 'Rotsburcht over de Dhronvallei & historische 17e-eeuwse ijzersmelterij',
    location: 'Dhronvallei & Züsch',
    tag: '⚒️ Kasteel & Industrieel Erfgoed',
    period: '12e – 17e eeuw',
    image: '/images/hunolstein_castle.jpg',
    history: 'Burg Hunolstein werd gebouwd op een steile kwartsietkam door de Vögte van Hunolstein. Vanaf de burchtruïne heb je een schitterend uitzicht over het dal van de Dhron. Enkele kilometers verderop ligt de Züscher Hammer, het grootste historische met waterkracht aangedreven ijzerpletterij-monument van de regio.',
    funFacts: [
      '🌊 Reusachtig waterrad: Het gerestaureerde houten waterrad van de Züscher Hammer heeft een diameter van ruim 5 meter en dreef vroeger gigantische smeedhamers aan.',
      '🦅 Vogelperspectief: Vanaf de top van de Hunolstein-rots kijk je loodrecht naar beneden op de meanderende Dhron.',
      '🥾 Rustieke wandelpaden: Beide locaties liggen aan bekroonde Traumschleifen-wandelpaden met houten vlonders en picknickbanken.'
    ],
    keyFigures: [
      { label: 'Bouwjaar Hunolstein', value: 'ca. 1190' },
      { label: 'Diameter waterrad', value: '5,2 meter' },
      { label: 'Karakter', value: 'Rustiek & stil' }
    ],
    visitorTip: 'Ideaal voor een rustige middagwandeling zonder massatoerisme, gecombineerd met een stop bij een lokale dorpsbakkerij.',
    mapLocationKey: 'Dhronecken'
  }
];
