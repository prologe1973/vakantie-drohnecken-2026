# Vakantie Rijnland-Palts (Dhronecken) 2026

Statische informatiewebsite voor de vakantie in Dhronecken (Hunsrück & Moezel) van 7 t/m 11 september 2026.
Bevat reisschema's, interactieve plattegronden met parkeerplaatsen, wandelinformatie en paklijsten.

## 🚀 Snel starten met Docker Compose

De eenvoudigste manier om de website lokaal of op een server te hosten is met Docker Compose.

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

# Herstart de container
docker compose restart

# Stop de container
docker compose down
```

## 📁 Projectstructuur

- `index.html` — De complete statische webapplicatie (HTML, CSS en JavaScript).
- `img/` — Afbeeldingen en sfeerfoto's.
- `nginx.conf` — Nginx-configuratie (gzip-compressie en caching).
- `docker-compose.yml` — Docker Compose-configuratie met `nginx:alpine` en volume mounts.
- `Dockerfile` — Optioneel standalone Dockerfile om een zelfstandige image te bouwen.
- `.gitignore` — Git-uitsluitingen.

## ⚙️ Aanpassingen maken

Omdat de bestanden via volumes direct gekoppeld zijn (`ro` - read-only) aan de Nginx container, worden wijzigingen in `index.html` of de `img/` map direct zichtbaar bij het verversen van de browserpagina.
