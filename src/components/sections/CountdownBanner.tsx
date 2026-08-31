'use client';

import React, { useState, useEffect } from 'react';
import { CalendarDays, CloudRain, Sun, Cloud, CloudSun, Loader2 } from 'lucide-react';

// Vakantie: 7 t/m 11 september 2026
const START_DATE = new Date('2026-09-07T00:00:00');

interface DayWeather {
  day: string;
  weather_code: number;
  tmax: number;
  tmin: number;
  precip: number;
}

function weatherIcon(code: number, size = 'w-6 h-6') {
  if (code === 0 || code === 1) return <Sun className={`${size} text-gold`} />;
  if (code === 2) return <CloudSun className={`${size} text-amber-500`} />;
  if (code === 3) return <Cloud className={`${size} text-muted`} />;
  return <CloudRain className={`${size} text-blue-500`} />;
}

function weatherLabel(code: number): string {
  if (code === 0 || code === 1) return 'Zonnig';
  if (code === 2) return 'Half bewolkt';
  if (code === 3) return 'Bewolkt';
  if (code === 45 || code === 48) return 'Mistig';
  if (code === 51 || code === 53 || code === 55) return 'Motregen';
  if (code === 61 || code === 63 || code === 65) return 'Regen';
  if (code === 71 || code === 73 || code === 75) return 'Sneeuw';
  if (code === 80 || code === 81 || code === 82) return 'Buien';
  if (code === 95 || code === 96 || code === 99) return 'Onweer';
  return 'Bewolkt';
}

const VAKANTIE_DAGEN = [
  { iso: '2026-09-07', label: 'Ma 7', plaats: 'Aankomst & Bernkastel' },
  { iso: '2026-09-08', label: 'Di 8', plaats: 'Romeins Trier' },
  { iso: '2026-09-09', label: 'Wo 9', plaats: 'Idar & Herrstein' },
  { iso: '2026-09-10', label: 'Do 10', plaats: 'Erbeskopf & Geierlay' },
];

export const CountdownBanner: React.FC = () => {
  const [now, setNow] = useState(() => new Date());
  const [weather, setWeather] = useState<DayWeather[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 60);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/weather');
        if (!res.ok) throw new Error('weer niet beschikbaar');
        const d = await res.json();
        const daily = d.daily;
        if (!daily) return;
        // Map de 5 vakantiedagen naar de weerdata (7-11 september)
        const list: DayWeather[] = [];
        for (const v of VAKANTIE_DAGEN) {
          const idx = daily.time.findIndex((t: string) => t === v.iso);
          if (idx >= 0) {
            list.push({
              day: v.label,
              weather_code: daily.weather_code[idx],
              tmax: Math.round(daily.temperature_2m_max[idx]),
              tmin: Math.round(daily.temperature_2m_min[idx]),
              precip: daily.precipitation_probability_max[idx],
            });
          }
        }
        setWeather(list);
      } catch (e) {
        // stil negeren; toon alleen countdown
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Countdown berekenen
  const diff = START_DATE.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  const isTrip = diff <= 0;

  const feestelijkeTekst = isTrip
    ? "We zijn op vakantie! Geniet van de Hunsrück & de Moezel! 🥂"
    : daysLeft === 0
      ? "Het is vandaag zover... de Hunsrück roept! 🎒"
      : daysLeft === 1
        ? "Nog maar 1 dag! De koffers kunnen er bijna in... 🧳"
        : `Nog maar ${daysLeft} dagen en dan gaan we op vakantie! We verheugen ons enorm op de Hunsrück, de Moezel, heerlijk wandelen, een goed glas bier op het terras voor mij en een heerlijk glas wijn voor Swienda. De laatste voorbereidingen zijn in volle gang! 🍺🍷`;

  return (
    <div className="bg-gradient-to-br from-forest via-forest2 to-wine text-white rounded-2xl shadow-card overflow-hidden">
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-2">
          <CalendarDays className="w-4 h-4" />
          <span>7 – 11 september 2026</span>
        </div>

        {/* Countdown + tekst */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-end gap-1.5 md:gap-2">
            <span className="text-6xl md:text-7xl font-bold font-serif leading-none">
              {daysLeft}
            </span>
            <span className="text-xl md:text-2xl font-serif mb-1.5">
              {daysLeft === 1 ? 'dag' : 'dagen'}
            </span>
          </div>
          <div className="md:border-l md:border-white/20 md:pl-4 flex-1">
            <p className="text-base md:text-lg font-semibold leading-snug">
              {feestelijkeTekst}
            </p>
            <p className="text-xs text-white/80 mt-1">
              {isTrip
                ? 'Het moment is daar — veel plezier!'
                : `In de ochtend van maandag 7 september vertrekken we naar Dhronecken.`}
            </p>
          </div>
        </div>

        {/* Vakantie-weerbericht */}
        <div className="mt-5 border-t border-white/20 pt-4">
          <div className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-widest mb-3">
            <CloudRain className="w-4 h-4" />
            <span>Weer tijdens de vakantiedagen</span>
          </div>
          {loading ? (
            <div className="flex items-center gap-2 text-white/70 text-xs">
              <Loader2 className="w-4 h-4 animate-spin" />
              Weerbericht laden…
            </div>
          ) : weather && weather.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {weather.map((w) => (
                <div
                  key={w.day}
                  className="bg-white/10 rounded-xl p-2.5 text-center"
                >
                  <div className="text-[11px] font-bold uppercase tracking-wide">
                    {w.day}
                  </div>
                  <div className="flex justify-center my-1">
                    {weatherIcon(w.weather_code)}
                  </div>
                  <div className="text-sm font-bold">
                    {w.tmax}°<span className="text-white/70 font-normal">/{w.tmin}°</span>
                  </div>
                  <div className="text-[10px] text-white/80">
                    {weatherLabel(w.weather_code)}
                  </div>
                  <div className="text-[10px] text-gold font-semibold">
                    💧 {w.precip}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/70 text-xs">
              Weerbericht is nog niet beschikbaar voor de vakantiedagen — check later op het <b>Weer</b>-tabblad.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
