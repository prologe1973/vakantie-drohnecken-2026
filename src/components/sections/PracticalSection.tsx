'use client';

import React, { useState, useEffect } from 'react';
import { PACKING_LIST } from '@/data/packingList';
import { DISTANCES } from '@/data/travelData';
import { CheckSquare, Car } from 'lucide-react';

export const PracticalSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('next_rp2026_packing');
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load packing list state from localStorage', e);
    }
  }, []);

  const handleToggle = (key: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('next_rp2026_packing', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save packing list state', e);
      }
      return updated;
    });
  };

  const totalItems = PACKING_LIST.reduce((acc, curr) => acc + curr.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / totalItems) * 100) || 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-wine">Voorbereiding</span>
        <h2 className="text-3xl font-bold font-serif text-forest">Inpaklijst &amp; Afstanden</h2>
        <p className="text-sm text-muted mt-1">
          Vink af wat je hebt ingepakt — je voortgang wordt automatisch opgeslagen op je toestel.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-5 rounded-2xl border border-line shadow-soft space-y-2">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-forest flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-wine" />
            Voortgang inpakken
          </span>
          <span className="text-wine">
            {checkedCount} van {totalItems} ingepakt ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-cream rounded-full h-3 overflow-hidden border border-line">
          <div
            className="bg-wine h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Packing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PACKING_LIST.map((category, catIdx) => (
          <div
            key={catIdx}
            className="bg-white rounded-2xl border border-line p-5 shadow-soft space-y-3"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-wine border-b border-line pb-2">
              {category.title}
            </h3>

            <div className="space-y-2 text-xs">
              {category.items.map((item, itemIdx) => {
                const itemKey = `${category.title}_${itemIdx}`;
                const isDone = !!checkedItems[itemKey];

                return (
                  <label
                    key={itemIdx}
                    className="flex items-start gap-2.5 cursor-pointer py-1 select-none group"
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => handleToggle(itemKey)}
                      className="mt-0.5 rounded border-line text-forest focus:ring-forest w-4 h-4 cursor-pointer accent-forest"
                    />
                    <span
                      className={`leading-relaxed transition-colors ${
                        isDone ? 'line-through text-muted' : 'text-ink group-hover:text-forest'
                      }`}
                    >
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Distances Section */}
      <div className="bg-white rounded-2xl border border-line p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-wine" />
          <h3 className="text-xl font-bold font-serif text-forest">
            Afstanden &amp; Reistijden vanuit Dhronecken
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-forest text-white">
              <tr>
                <th className="p-3 font-semibold rounded-tl-lg">Bestemming</th>
                <th className="p-3 font-semibold">Afstand</th>
                <th className="p-3 font-semibold">Reistijd Auto</th>
                <th className="p-3 font-semibold rounded-tr-lg">Highlight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {DISTANCES.map((d, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? 'bg-cream/40' : 'bg-white'}>
                  <td className="p-3 font-bold text-forest">{d.destination}</td>
                  <td className="p-3 text-ink">{d.distance}</td>
                  <td className="p-3 font-semibold text-wine">{d.time}</td>
                  <td className="p-3 text-muted">{d.highlight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 bg-cream/60 rounded-xl border border-line text-xs text-ink leading-relaxed">
          De <b>B327 (Hunsrückhöhenstraße)</b> is de panoramische levensader: hij verbindt de rustige hoogvlaktes en toppen van de Hunsrück rechtstreeks met de zonovergoten Moezelvallei.
        </div>
      </div>
    </div>
  );
};
