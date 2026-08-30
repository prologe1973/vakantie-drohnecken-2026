# Vakantie Rijnland-Pfalts (Dhronecken) 2026 · Next.js Webapp

Moderne, modulaire webapplicatie en interactief reisverslag voor de midweek **7 t/m 11 september 2026** in Dhronecken (Hunsrück &amp; Moezel).

Gebouwd met **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Leaflet** en **IndexedDB**. Geoptimaliseerd voor zowel desktop als mobiel gebruik tijdens de vakantie.

---

## ✨ Features

- 📅 **Interactief Dagprogramma:** 4-daags reisschema met tijden, tips, bezienswaardigheden en kosten.
- 🗺️ **Plattegronden &amp; Parkeren:** Dynamische Leaflet kaarten met POI's, parkeerplaatsen en directe Google Maps navigatie.
- 🥾 **Wandelpaspoorten:** Routes naar o.a. Hölzbachklamm, Erbeskopf (816m) en Geierlay-hangbrug met directe Komoot-links.
- 📖 **Reisverslag &amp; Foto's:**
  - Persoonlijke verslagen en notities per dag of locatie.
  - Foto's toevoegen vanaf camera of computer (met automatische beeldcompressie).
  - Foto's bekijken in een fullscreen Lightbox.
  - Veilige offline opslag in browser via **IndexedDB**.
  - **Backup Exporteren &amp; Importeren:** Download of herstel je complete reisverslag als `.json` bestand.
- 🎒 **Inpaklijst:** Interactieve checklist met persistente opslag in localStorage.
- 📱💻 **Volledig Responsive:** Mobile-first layout met vaste onderbalk voor telefoons en uitgebreide desktop navigatie met multi-column grids.

---

## 🚀 Aan de slag

### 1. Lokale Development Server

```bash
# Dependencies installeren
npm install

# Start development server
npm run dev
```

Open vervolgens in je browser:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### 2. Productie bouwen

```bash
# Bouw de productiebundel
npm run build

# Start de productieserver
npm start
```

---

### 3. Docker Deployment (Multi-Stage Build)

De applicatie bevat een geoptimaliseerde multi-stage `Dockerfile` met standalone Node.js runtime en `docker-compose.yml`.

```bash
# Bouw en start de container op de achtergrond
docker compose up --build -d
```

De website is bereikbaar op **[http://localhost:3000](http://localhost:3000)** (of `http://<server-ip>:3000`).

#### Container beheren:

```bash
# Logs bekijken
docker compose logs -f

# Herstarten
docker compose restart

# Stoppen
docker compose down
```

---

## 📁 Projectstructuur

```
.
├── public/
│   └── images/             # Geoptimaliseerde afbeeldingen en fotomateriaal
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind CSS en custom stijlen
│   │   ├── layout.tsx      # Root layout met Cormorant & Inter fonts
│   │   └── page.tsx        # Hoofdpagina en tab state router
│   ├── components/
│   │   ├── layout/         # Header, BottomNav, Footer
│   │   └── sections/       # Overview, Days, Map, Hiking, Journal, Practical
│   ├── data/               # travelData.ts, packingList.ts
│   └── lib/                # journalDb.ts (IndexedDB), imageCompression.ts
├── Dockerfile              # Multi-stage container build (Node.js Alpine)
├── docker-compose.yml      # Docker Compose configuratie (port 3000)
├── next.config.mjs         # Next.js standalone configuratie
├── tailwind.config.ts      # Tailwind configuratie
└── tsconfig.json           # TypeScript configuratie
```
