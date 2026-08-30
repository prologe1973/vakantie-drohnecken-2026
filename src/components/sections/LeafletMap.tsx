'use client';

import React, { useEffect, useRef } from 'react';
import { LocationData } from '@/data/travelData';
import L from 'leaflet';

interface LeafletMapProps {
  location: LocationData;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({ location }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(location.center, location.zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove existing markers
    map.eachLayer((layer) => {
      if ((layer as any).options?.customMarker) {
        map.removeLayer(layer);
      }
    });

    // POI Icon
    const poiIcon = L.divIcon({
      html: '<div style="width:20px;height:20px;background:#7a2431;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    // Parking Icon
    const parkIcon = L.divIcon({
      html: '<div style="width:28px;height:28px;background:#1d5fa8;color:#fff;border:2px solid #fff;border-radius:6px;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.4)">P</div>',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    // Add POI Marker
    L.marker([location.poi.lat, location.poi.lon], { icon: poiIcon, customMarker: true } as any)
      .addTo(map)
      .bindPopup(`<b>${location.poi.name}</b>`);

    // Add Parkings
    const points: [number, number][] = [[location.poi.lat, location.poi.lon]];
    location.parks.forEach((park) => {
      points.push([park.lat, park.lon]);
      L.marker([park.lat, park.lon], { icon: parkIcon, customMarker: true } as any)
        .addTo(map)
        .bindPopup(`<b>${park.name}</b><br><small style="color:#666">${park.note}</small>`);
    });

    map.fitBounds(points, { padding: [40, 40] });
  }, [location]);

  return <div ref={mapContainerRef} className="w-full h-full min-h-[360px] rounded-xl z-10" />;
};
