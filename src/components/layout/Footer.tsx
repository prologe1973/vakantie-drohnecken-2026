import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 text-center text-xs text-muted border-t border-line/60 bg-cream/50">
      <div className="max-w-4xl mx-auto px-4 space-y-1">
        <p className="font-medium text-forest">
          Vakantiegids &amp; Reisverslag Rijnland-Pfalts 2026 · 7–11 september · Falkennest, Dhronecken
        </p>
        <p className="text-[11px] text-muted">
          Gebouwd met Next.js, Tailwind CSS &amp; Leaflet · Offline IndexedDB geactiveerd
        </p>
      </div>
    </footer>
  );
};
