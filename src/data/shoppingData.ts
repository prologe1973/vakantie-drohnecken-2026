export interface Shop {
  id: string;
  name: string;
  type: 'supermarkt' | 'discounter' | 'warenhuis' | 'winkelstraat' | 'speciaalzaak' | 'wijnwinkel';
  brand?: string;
  area: string; // plaats/gemeente
  address: string;
  postalCode: string;
  hours?: string;
  hoursNote?: string;
  distance: string;
  driveTime: string;
  lat: number;
  lon: number;
  why?: string;
  category: string; // boodschappen / winkelen
}

export interface ShoppingGroup {
  id: string;
  title: string;
  subtitle: string;
  area: string;
  intro: string;
  color: string;
  shops: Shop[];
}

export const SHOPPING_GROUPS: ShoppingGroup[] = [
  {
    id: 'boodschappen',
    title: 'Dagelijkse Boodschappen',
    subtitle: 'Supermarkten nabij Dhronecken',
    area: 'Thalfang · Hermeskeil · Morbach',
    intro:
      'Dhronecken zelf is een rustig dorp zonder winkels. Voor de dagelijkse boodschappen wijken we uit naar Thalfang (dichtstbij) of de grotere gemeenten Hermeskeil en Morbach voor grote inkopen.',
    color: 'from-forest via-forest2 to-forest2',
    shops: [
      {
        id: 'edeka-thalfang',
        name: 'EDEKA Diehl',
        type: 'supermarkt',
        brand: 'EDEKA',
        area: 'Thalfang',
        address: 'Bahnhofstraße 3-7',
        postalCode: '54424 Thalfang',
        hours: 'Ma–Za 08:00–20:00 · Zo gesloten',
        distance: '3,8 km',
        driveTime: '± 5 min',
        lat: 49.7527543,
        lon: 6.9990405,
        why: 'Beste en meest veelzijdige supermarkt in de buurt: uitstekende versafdeling (kaas- & vleestheke), eigen bakkerij, biologische producten en streekproducten onder het label "Ebbes von Hei!". Ideaal na aankomst.',
        category: 'boodschappen',
      },
      {
        id: 'norma-thalfang',
        name: 'Norma',
        type: 'discounter',
        brand: 'Norma',
        area: 'Thalfang',
        address: 'Poststraße 1',
        postalCode: '54424 Thalfang',
        hours: 'Ma–Za 08:00–20:00 · Zo gesloten',
        distance: '3,8 km',
        driveTime: '± 5 min',
        lat: 49.7523779,
        lon: 7.0012946,
        why: 'Voordelige discounter voor de dagelijkse boodschappen.',
        category: 'boodschappen',
      },
      {
        id: 'kaufland-hermeskeil',
        name: 'Kaufland',
        type: 'supermarkt',
        brand: 'Kaufland',
        area: 'Hermeskeil',
        address: 'An der Römerstraße 1',
        postalCode: '54411 Hermeskeil',
        hours: 'Ma–Za 07:00–22:00 · Zo gesloten',
        distance: '11 km',
        driveTime: '± 11 min',
        lat: 49.6787659,
        lon: 6.9521193,
        why: 'Gigantische XXL-hypermarkt: levensmiddelen, drogisterij, kleding en huishouden. Ideaal voor de grote inkopen.',
        category: 'boodschappen',
      },
      {
        id: 'wasgau-hermeskeil',
        name: 'WASGAU Frischemarkt',
        type: 'supermarkt',
        brand: 'WASGAU',
        area: 'Hermeskeil',
        address: 'Am Dörrenbach 11',
        postalCode: '54411 Hermeskeil',
        hours: 'Ma–Za 08:00–20:00 · Zo gesloten',
        distance: '11 km',
        driveTime: '± 11 min',
        lat: 49.6593225,
        lon: 6.9337425,
        why: 'Dichtstbijzijnde alternatief voor de gesloten WASGAU in Thalfang. Uitstekende verse groenten, kwaliteitsvlees en Rijnland-Paltse specialiteiten.',
        category: 'boodschappen',
      },
      {
        id: 'rewe-hermeskeil',
        name: 'REWE',
        type: 'supermarkt',
        brand: 'REWE',
        area: 'Hermeskeil',
        address: 'Trierer Straße 6',
        postalCode: '54411 Hermeskeil',
        hours: 'Ma–Za 07:00–22:00 · Zo gesloten',
        distance: '11 km',
        driveTime: '± 11 min',
        lat: 49.6548138,
        lon: 6.9469062,
        why: 'Grote REWE-supermarkt met breed assortiment.',
        category: 'boodschappen',
      },
      {
        id: 'aldi-morbach',
        name: 'ALDI SÜD',
        type: 'discounter',
        brand: 'ALDI',
        area: 'Morbach',
        address: 'Bremerwiese 4',
        postalCode: '54497 Morbach',
        hours: 'Ma–Za 08:00–20:00 · Zo gesloten',
        distance: '11 km',
        driveTime: '± 11 min',
        lat: 49.8139105,
        lon: 7.1225077,
        why: 'Goedkope discounter voor basisboodschappen.',
        category: 'boodschappen',
      },
      {
        id: 'lidl-morbach',
        name: 'Lidl',
        type: 'discounter',
        brand: 'Lidl',
        area: 'Morbach',
        address: 'Am Dreieck 1',
        postalCode: '54497 Morbach',
        hours: 'Ma–Za 07:00–21:00 · Zo gesloten',
        distance: '11 km',
        driveTime: '± 11 min',
        lat: 49.8149954,
        lon: 7.1249139,
        why: 'Bekende discounter met wisselend aanbod.',
        category: 'boodschappen',
      },
      {
        id: 'rewe-morbach',
        name: 'REWE',
        type: 'supermarkt',
        brand: 'REWE',
        area: 'Morbach',
        address: 'Bremer Wiese 2',
        postalCode: '54497 Morbach',
        hours: 'Ma–Za 07:00–22:00 · Zo gesloten',
        distance: '11 km',
        driveTime: '± 11 min',
        lat: 49.813746,
        lon: 7.1233146,
        why: 'Grote REWE met ruime versafdeling.',
        category: 'boodschappen',
      },
    ],
  },
  {
    id: 'trier',
    title: 'Sfeervol Winkelen · Trier',
    subtitle: 'Dinsdag — Cultuur & Shoppen',
    area: 'Trier',
    intro:
      'Trier is een bruisende winkelstad. Naast de bekende winkelstraten (Simeonstraße, Brotstraße, Fleischstraße) herbergt de historische binnenstad verborgen pareltjes.',
    color: 'from-[#7a2431] via-[#8e2735] to-wine',
    shops: [
      {
        id: 'neustrasse-trier',
        name: 'De Neustraße',
        type: 'winkelstraat',
        area: 'Trier',
        address: 'Neustraße',
        postalCode: '54290 Trier',
        hours: 'Doorgaans Di–Za 10:00–18:00 / 18:30',
        distance: '25 km',
        driveTime: '± 35 min',
        lat: 49.7507275,
        lon: 6.637538,
        why: 'Onze absolute tip! De meest sfeervolle straat van Trier, parallel aan de grote winkelstraten. Charmante zelfstandige boetiekjes, speciaalzaken, kunstgalerijen, antiekwinkeltjes en delicatessenzaken.',
        category: 'winkelen',
      },
      {
        id: 'trier-galerie',
        name: 'Trier Galerie',
        type: 'warenhuis',
        area: 'Trier',
        address: 'Fleischstraße 62',
        postalCode: '54290 Trier',
        hours: 'Ma–Za 09:30–20:00',
        distance: '25 km',
        driveTime: '± 35 min',
        lat: 49.7561228,
        lon: 6.6376715,
        why: 'Modern overdekt winkelcentrum met 3 etages en ca. 56 winkels. Handig voor een snack/lunch in de Food Court. In het souterrain een grote REWE Frischemarkt voor koud drinken & proviand.',
        category: 'winkelen',
      },
      {
        id: 'galeria-trier',
        name: 'GALERIA Trier',
        type: 'warenhuis',
        brand: 'GALERIA',
        area: 'Trier',
        address: 'Simeonstraße 53',
        postalCode: '54290 Trier',
        hours: 'Ma–Za 10:00–19:00 · Zo gesloten',
        distance: '25 km',
        driveTime: '± 35 min',
        lat: 49.7585427,
        lon: 6.6422923,
        why: 'Klassiek groot warenhuis direct aan de hoofdstraat met merkkleding, cosmetica en reisartikelen.',
        category: 'winkelen',
      },
    ],
  },
  {
    id: 'idar-oberstein',
    title: 'Edelstenen & Sieraden · Idar-Oberstein',
    subtitle: 'Woensdag — Edelstenen & Sieraden',
    area: 'Idar-Oberstein',
    intro:
      'Idar-Oberstein is wereldwijd de hoofdstad van de edelsteenbewerkers. Rondom het marktplein en de Hauptmarkt vind je talloze winkeltjes.',
    color: 'from-[#4a3f5f] via-[#5b4f77] to-[#6b5f8f]',
    shops: [
      {
        id: 'goudsmederij-stein',
        name: 'Goudsmederij Stein',
        type: 'speciaalzaak',
        area: 'Idar-Oberstein',
        address: 'Marktplatz',
        postalCode: '55743 Idar-Oberstein',
        hours: 'Doorgaans Di–Za',
        distance: '25 km',
        driveTime: '± 35 min',
        lat: 49.7047848,
        lon: 7.3278211,
        why: 'Atelier van Hagen Stein & Stefanie Dingel, direct onder de Felsenkirche. Prachtige handgemaakte sieraden en bekroonde designstukken (Duitse Sieraden- en Edelsteenprijs). Stenen lokaal geslepen naar eigen ontwerp.',
        category: 'winkelen',
      },
      {
        id: 'hauptstrasse-oberstein',
        name: 'Voetgangerszone Oberstein (Hauptstraße)',
        type: 'winkelstraat',
        area: 'Idar-Oberstein',
        address: 'Hauptstraße (voetgangerszone)',
        postalCode: '55743 Idar-Oberstein',
        hours: 'Doorgaans Di–Za',
        distance: '25 km',
        driveTime: '± 35 min',
        lat: 49.7033,
        lon: 7.3257,
        why: 'Aaneenschakeling van tientallen kleine edelsteenwinkeltjes, slijperijen en ateliers. Van ruwe geodes, amethisten en bergkristallen tot verfijnd geslepen sieraden. Winkeliers vertellen met passie over hun mineralen.',
        category: 'winkelen',
      },
    ],
  },
  {
    id: 'bernkastel',
    title: 'Wijnwinkels · Bernkastel-Kues',
    subtitle: 'Moezelwijn meenemen voor thuis',
    area: 'Bernkastel-Kues',
    intro:
      'Ideaal om op maandagavond (tijdens het Wijnfeest) of op doorreis een uitstekende fles Moezelwijn mee te nemen voor thuis.',
    color: 'from-[#8e2735] via-[#a33040] to-[#b03a4b]',
    shops: [
      {
        id: 'weinkeller-kilburg',
        name: 'Historischer Weinkeller (Weingut Kilburg)',
        type: 'wijnwinkel',
        area: 'Bernkastel-Kues',
        address: 'Burgstraße 81',
        postalCode: '54470 Bernkastel-Kues',
        hours: 'Dagelijks 11:30–17:30 · Di gesloten',
        distance: '25 km',
        driveTime: '± 25 min',
        lat: 49.9140965,
        lon: 7.077997,
        why: 'Unieke 400 jaar oude stollen uit de leisteenrotsen gehakt, achter restaurant Alt Bernkastel. Ooit door schatzoekers gegraven, nu een sfeervol verlichte wijnkelder om te proeven en wijn voor thuis te kopen.',
        category: 'winkelen',
      },
      {
        id: 'vinothek-moselland',
        name: 'Vinothek der Moselland eG',
        type: 'wijnwinkel',
        area: 'Bernkastel-Kues',
        address: 'Bornwiese 2',
        postalCode: '54470 Bernkastel-Kues',
        hours: 'Ma–Vr 09:00–17:00 · Za 10:00–13:00 · Zo gesloten',
        distance: '25 km',
        driveTime: '± 25 min',
        lat: 49.9278628,
        lon: 7.0611889,
        why: 'Grootste wijncoöperatie van Rijnland-Palts. Enorme selectie kwaliteitswijnen en uitstekende Sekt (traditionele flesgisting) uit de regio Mosel, Nahe en Pfalz. Deskundig advies en proeverijen.',
        category: 'winkelen',
      },
    ],
  },
];

export const SHOPPING_TIPS = [
  {
    icon: '📵',
    title: 'Zondagssluiting',
    text: 'In Duitsland zijn supermarkten, discounters en reguliere winkels op zondag wettelijk gesloten (Ladenschlussgesetz). Plan boodschappen en inkopen dus strikt van maandag t/m zaterdag!',
  },
  {
    icon: '♻️',
    title: 'Statiegeld (Pfand)',
    text: 'Op bijna alle plastic flessen en blikjes zit €0,25 statiegeld (DPG-logo), op glazen bier-/frisdrankflessen meestal €0,08 of €0,15. Inleveren bij de Leergutautomat in elke supermarkt. Op wijnflessen zit meestal geen statiegeld.',
  },
  {
    icon: '🛍️',
    title: 'Boodschappentas',
    text: 'Net als in Nederland zijn plastic of papieren tasjes bij de kassa niet gratis. Neem altijd je eigen herbruikbare tas mee naar de supermarkt.',
  },
  {
    icon: '💶',
    title: 'Betalen',
    text: 'Pinnen is overal de standaard in supermarkten en grote winkels, maar in kleinere dorpswinkeltjes, boetiekjes of wijnkraampjes op het wijnfeest is wat contant geld (Bargeld) raadzaam.',
  },
];

export const WARNING = {
  title: 'Let op: WASGAU Thalfang gesloten',
  text: 'De grote WASGAU Frischemarkt aan de Charlottenhöhe 1 in Thalfang is op 31 maart 2026 definitief gesloten. Rijd hier dus niet per ongeluk heen.',
};
