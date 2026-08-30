'use client';

import React, { useState, useEffect } from 'react';
import { CloudRain, Wind, Droplets, Sun, Cloud, Cloudy, CloudSun, Umbrella, Thermometer, MapPin, ExternalLink, Loader2 } from 'lucide-react';

interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
}

interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

interface WeatherData {
  current?: CurrentWeather;
  daily?: DailyWeather;
}

// WMO weercode → beschrijving + icoon
function describeWMO(code: number): { label: string; icon: React.ReactNode; color: string } {
  if (code === 0) return { label: 'Helder', icon: <Sun className="w-8 h-8 text-gold" />, color: 'bg-gold/20 text-gold' };
  if (code === 1) return { label: 'Overwegend helder', icon: <Sun className="w-8 h-8 text-gold" />, color: 'bg-gold/20 text-gold' };
  if (code === 2) return { label: 'Half bewolkt', icon: <CloudSun className="w-8 h-8 text-amber-500" />, color: 'bg-amber-500/20 text-amber-600' };
  if (code === 3) return { label: 'Bewolkt', icon: <Cloud className="w-8 h-8 text-muted" />, color: 'bg-gray-400/20 text-gray-500' };
  if (code === 45 || code === 48) return { label: 'Mistig', icon: <Cloud className="w-8 h-8 text-gray-400" />, color: 'bg-gray-400/20 text-gray-500' };
  if (code === 51 || code === 53 || code === 55) return { label: 'Motregen', icon: <CloudRain className="w-8 h-8 text-blue-500" />, color: 'bg-blue-500/20 text-blue-600' };
  if (code === 61 || code === 63 || code === 65) return { label: 'Regen', icon: <CloudRain className="w-8 h-8 text-blue-500" />, color: 'bg-blue-500/20 text-blue-600' };
  if (code === 71 || code === 73 || code === 75) return { label: 'Sneeuw', icon: <CloudRain className="w-8 h-8 text-sky-400" />, color: 'bg-sky-400/20 text-sky-600' };
  if (code === 80 || code === 81 || code === 82) return { label: 'Buien', icon: <CloudRain className="w-8 h-8 text-indigo-500" />, color: 'bg-indigo-500/20 text-indigo-600' };
  if (code === 95 || code === 96 || code === 99) return { label: 'Onweer', icon: <CloudRain className="w-8 h-8 text-purple-600" />, color: 'bg-purple-600/20 text-purple-700' };
  return { label: 'Bewolkt', icon: <Cloud className="w-8 h-8 text-muted" />, color: 'bg-gray-400/20 text-gray-500' };
}

function windDir(deg: number): string {
  const dirs = ['N', 'NNO', 'NO', 'ONO', 'O', 'OZO', 'ZO', 'ZZO', 'Z', 'ZZW', 'ZW', 'WZW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

export const WeatherSection: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/weather');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e?.message || 'Weer ophalen mislukt.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const current = data?.current;
  const daily = data?.daily;

  const weekday = (iso: string) =>
    new Date(iso + 'T12:00:00').toLocaleDateString('nl-NL', { weekday: 'long' });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-wine">Weer &amp; regenradar</span>
        <h2 className="text-3xl font-bold font-serif text-forest">Weerbericht Dhronecken</h2>
        <p className="text-sm text-muted mt-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" /> Lokale verwachting voor de Hunsrück &amp; Moezel
        </p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-muted">
          <Loader2 className="w-8 h-8 animate-spin mb-3" />
          <span className="text-xs">Weerbericht laden…</span>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-4">
          Kon het weerbericht niet laden: {error}
        </div>
      )}

      {current && !loading && (
        <>
          {/* Huidig weer */}
          <div className="bg-forest text-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl">
                  {describeWMO(current.weather_code).icon}
                </div>
                <div>
                  <div className="text-5xl font-bold font-serif leading-none">
                    {Math.round(current.temperature_2m)}°
                  </div>
                  <div className="text-sm text-white/80 mt-1">
                    {describeWMO(current.weather_code).label}
                  </div>
                </div>
              </div>
              <div className="text-right text-xs text-white/80 space-y-1">
                <div className="flex items-center gap-1.5 justify-end">
                  <Wind className="w-3.5 h-3.5" /> {Math.round(current.wind_speed_10m)} km/u {windDir(current.wind_direction_10m)}
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <Droplets className="w-3.5 h-3.5" /> {current.relative_humidity_2m}%
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <Thermometer className="w-3.5 h-3.5" /> Gevoel {Math.round(current.apparent_temperature)}°
                </div>
              </div>
            </div>
          </div>

          {/* 7-daagse verwachting */}
          <div>
            <h3 className="text-lg font-bold font-serif text-forest mb-3">7-daagse verwachting</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {daily?.time.map((day, i) => {
                const w = describeWMO(daily.weather_code[i]);
                return (
                  <div
                    key={day}
                    className="bg-white border border-line rounded-2xl p-4 shadow-soft"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-wine mb-2">
                      {weekday(day)}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${w.color}`}>{w.icon}</div>
                      <div>
                        <div className="font-bold text-forest">
                          {Math.round(daily.temperature_2m_max[i])}° /{' '}
                          {Math.round(daily.temperature_2m_min[i])}°
                        </div>
                        <div className="text-[11px] text-muted flex items-center gap-1">
                          <Umbrella className="w-3 h-3" /> {daily.precipitation_probability_max[i]}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Buienradar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold font-serif text-forest flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-blue-500" /> Buienradar
          </h3>
          <a
            href="https://www.buienradar.nl/nederland/regenverwachting"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold text-wine hover:underline"
          >
            Live radar <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-soft p-2">
          {/* Geanimeerde Buienradar (gif, 5-min updates) */}
          <img
            src="https://image.buienradar.nl/2.0/image/animation/RadarMapRainWebMercatorNL?width=600&height=400&renderBackground=True&renderBranding=True&renderText=False"
            alt="Buienradar regenradar"
            className="w-full h-auto rounded-xl"
            loading="lazy"
          />
          <p className="text-[10px] text-muted px-2 py-2 text-center">
            Regenradar &copy; Buienradar.nl — wordt elke 5 minuten bijgewerkt. Bekijk de live versie via de link hierboven.
          </p>
        </div>
      </div>
    </div>
  );
};
