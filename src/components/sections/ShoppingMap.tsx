'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { SHOPPING_GROUPS, Shop } from '@/data/shoppingData';

// Basis/verblijf: Falkennest Dhronecken
export const BASE_LAT = 49.7258;
export const BASE_LON = 6.9822;

// Marker kleur per type
const TYPE_COLOR: Record<string, string> = {
  bakkerij: '#d97706',
  supermarkt: '#1f7a3f',
  discounter: '#2f8f4f',
  warenhuis: '#c22b2b',
  winkelstraat: '#c22b2b',
  speciaalzaak: '#6b5f8f',
  wijnwinkel: '#8e2735',
};

// Categorie-embleem per type (voor de marker)
const TYPE_EMOJI: Record<string, string> = {
  bakkerij: '🥐',
  supermarkt: '🛒',
  discounter: '🛒',
  warenhuis: '🛍️',
  winkelstraat: '🛍️',
  speciaalzaak: '💎',
  wijnwinkel: '🍷',
};

interface MarkerDef extends Shop {
  color: string;
  group: string;
}

interface ShoppingMapProps {
  activeCategories: string[]; // boodschappen / winkelen / speciaalzaken / wijn
  resetKey: number; // verhogen om opnieuw te centreren op alle zichtbare plaatsen
}

export const ShoppingMap: React.FC<ShoppingMapProps> = ({ activeCategories, resetKey }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Categorie per shop-type
  const categoryOf = (type: string): string => {
    if (type === 'bakkerij') return 'bakkers';
    if (type === 'supermarkt' || type === 'discounter') return 'boodschappen';
    if (type === 'warenhuis' || type === 'winkelstraat') return 'winkelen';
    if (type === 'speciaalzaak') return 'speciaalzaken';
    return 'wijn'; // wijnwinkel
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([49.8, 7.05], 9);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Verwijder bestaande custom markers
    map.eachLayer((layer) => {
      if ((layer as any).options?.customMarker) {
        map.removeLayer(layer);
      }
    });

    const visiblePoints: [number, number][] = [[BASE_LAT, BASE_LON]]; // Falkennest altijd

    // Accent marker voor ons verblijf (Falkennest, Dhronecken) — altijd zichtbaar
    const baseIcon = L.divIcon({
      html: `<div style="width:34px;height:34px;background:#d9a441;color:#17331f;border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.5)"><span style="transform:rotate(45deg);font-size:15px">🏠</span></div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 30],
      className: '',
    });
    L.marker([BASE_LAT, BASE_LON], { icon: baseIcon, customMarker: true } as any)
      .addTo(map)
      .bindPopup(
        `<div style="font-family:Inter,system-ui,sans-serif;min-width:170px">
          <b style="color:#17331f">🏠 Falkennest</b><br>
          <span style="color:#67756c;font-size:11px">Ons vakantieverblijf · Zum alten Bahnhof 12, Dhronecken</span>
        </div>`
      );

    // Overige markers — alleen als hun categorie actief is
    const markers: MarkerDef[] = [];
    SHOPPING_GROUPS.forEach((group) => {
      group.shops.forEach((shop) => {
        markers.push({ ...shop, color: TYPE_COLOR[shop.type] || '#1f7a3f', group: group.title });
      });
    });

    markers.forEach((m) => {
      const cat = categoryOf(m.type);
      if (!activeCategories.includes(cat)) return; // gefilterd

      const icon = L.divIcon({
        html: `<div style="width:26px;height:26px;background:${m.color};color:#fff;border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;box-shadow:0 2px 8px rgba(0,0,0,0.4)">${TYPE_EMOJI[m.type] || '🛍️'}</div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        className: '',
      });

      visiblePoints.push([m.lat, m.lon]);
      L.marker([m.lat, m.lon], { icon, customMarker: true } as any)
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,system-ui,sans-serif;min-width:180px">
            <b style="color:#17331f">${m.name}</b><br>
            <span style="color:#67756c;font-size:11px">${m.address}, ${m.postalCode}</span><br>
            <span style="font-size:11px">📍 ${m.distance} · 🚗 ${m.driveTime}</span>${
              m.hours ? `<br><span style="font-size:11px;color:#67756c">🕐 ${m.hours}</span>` : ''
            }<br>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}" target="_blank" style="display:inline-block;margin-top:6px;background:#1f452a;color:#fff;padding:5px 10px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none">🧭 Navigeer</a>
          </div>`
        );
    });

    map.fitBounds(visiblePoints, { padding: [30, 30] });
  }, [activeCategories, resetKey]);

  return <div ref={mapContainerRef} className="w-full h-full min-h-[380px] rounded-xl z-10" />;
};
