export interface PackingCategory {
  title: string;
  items: string[];
}

export const PACKING_LIST: PackingCategory[] = [
  {
    title: '📄 Documenten & Geld',
    items: [
      'Identiteitskaart (check-in Falkennest Dhronecken)',
      'Boekingsbevestigingen (aankomst 15:00–18:00)',
      'Zorgpas / Europese Ziekteverzekeringskaart (EHIC)',
      'Contant geld (wijnkraampjes & dorpshoreca)',
      '50-centmuntjes (Liebfrauenkirche glasvloer Trier)'
    ]
  },
  {
    title: '👕 Kleding & Schoeisel',
    items: [
      'Stevige wandelschoenen met diep profiel (Hölzbachklamm)',
      'Ademende basislaag & warme fleece (vroege uurtjes Erbeskopf)',
      'Water- en winddichte regenjas (Geierlay hangbrug)',
      'Comfortabele stadsschoenen (kasseien in Trier)',
      'Nette casual kleding voor diner & wijnproeverijen'
    ]
  },
  {
    title: '🥾 Wandel & Outdoor',
    items: [
      'Dagrugzak 20–30 liter',
      'Herbruikbare drinkfles of thermoskan',
      'Zonnebrandcrème & zonnebril (hoogvlakte UV)',
      'Telescopische wandelstokken (klimmen & dalen)',
      'Tekenpen & compacte EHBO-set met blarenpleisters'
    ]
  },
  {
    title: '📷 Foto & Elektronica',
    items: [
      'Camera met groothoeklens (Erbeskopf, Geierlay)',
      'Tele- / zoomlens (Porta Nigra, Moezelpanorama)',
      'Lichtgewicht statief (long-exposure beekjes)',
      'Powerbank met laadkabels (ARGO & GPS vreten stroom)',
      'Extra accu\'s en reserve geheugenkaarten',
      'Lenspen & microvezel poetsdoekje'
    ]
  },
  {
    title: '📱 Apps & Digitaal',
    items: [
      'ARGO-app geïnstalleerd (360° Burg Dhronecken AR)',
      'Komoot-routes vooraf offline opgeslagen',
      'Offline Google Maps kaart van de regio gedownload'
    ]
  }
];
