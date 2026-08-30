# Vakantie Rijnland-Palts (Dhronecken) 2026 · Reisgids &amp; Reisverslag

Statische webapp en interactief reisverslag voor de midweek **7 t/m 11 september 2026** in Dhronecken (Hunsrück &amp; Moezel).

Geschikt voor weergave en bediening op **PC-schermen**, **tablets** en **Android-telefoons**.

---

## ✨ Functionaliteiten

- 📅 **Interactief Dagprogramma:** 4-daags reisschema met tijden, tips, bezienswaardigheden en kosten.
- 🗺️ **Interactieve Plattegronden & Navigatie:** OpenStreetMap + Leaflet kaarten met aangeduide POI's en parkeerplaatsen inclusief directe Google Maps navigatielinks.
- 🥾 **Wandelpaspoorten:** Details over Hölzbachklamm, Erbeskopf (816m) en Geierlay-hangbrug met directe links naar Komoot routes.
- 📖 **Reisverslag &amp; Foto's (Nieuw):**
  - Maak persoonlijke notities per dag of locatie.
  - Voeg foto's toe via de camera van je telefoon of vanaf je computer.
  - Foto's worden automatisch geoptimaliseerd en veilig opgeslagen in de **IndexedDB** van je browser.
  - Bekijk foto's in een handige **Lightbox** (volledig scherm).
  - **Backup Exporteren &amp; Importeren:** Download je complete reisverslag met foto's als JSON-bestand om te bewaren of over te zetten naar andere apparaten.
- 🎒 **Inpaklijst &amp; Afstanden:** Interactieve checklist die je voortgang lokaal bewaart.
- 📱💻 **Volledig Responsive:** Geoptimaliseerde navigatie en multi-column lay-outs voor mobiel, tablet en desktop.

---

## 🚀 Starten met Docker Compose

```bash
# Start de container op de achtergrond
docker compose up -d
```

Open vervolgens je webbrowser op:
**[http://localhost:8080](http://localhost:8080)** (of `http://<server-ip>:8080`)

### Container beheren

```bash
# Bekijk logs
docker compose logs -f

# Herstarten
docker compose restart

# Stoppen
docker compose down
```

---

## 📁 Bestandsstructuur

```
.
├── index.html          # Complete webapp (HTML5, CSS3, JS, IndexedDB & data)
├── img/                # Sfeer- en achtergrondfoto's
├── nginx.conf          # Nginx webserverconfiguratie (gzip & cache headers)
├── docker-compose.yml  # Docker Compose opzet (nginx:alpine, port 8080)
├── Dockerfile          # Standalone Dockerfile definitie
└── README.md           # Deze documentatie
```
