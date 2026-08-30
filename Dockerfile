# Vakantie Rijnland-Pfalts 2026 — statische webapp
# Serveer via nginx in een Alpine-container.
FROM nginx:1.27-alpine

# Kopieer de app-bestanden naar de nginx-webroot
COPY index.html /usr/share/nginx/html/index.html
COPY img /usr/share/nginx/html/img

# Basis nginx-config: cache voor afbeeldingen, gzip aan
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
