'use client';

import React, { useState } from 'react';
import { Header, TabId } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OverviewSection } from '@/components/sections/OverviewSection';
import { AccommodationSection } from '@/components/sections/AccommodationSection';
import { DaysSection } from '@/components/sections/DaysSection';
import { MapSection } from '@/components/sections/MapSection';
import { HikingSection } from '@/components/sections/HikingSection';
import { WeatherSection } from '@/components/sections/WeatherSection';
import { JournalSection } from '@/components/sections/JournalSection';
import { PracticalSection } from '@/components/sections/PracticalSection';
import { CulinarySection } from '@/components/sections/CulinarySection';
import { AttractionsInfoSection } from '@/components/sections/AttractionsInfoSection';
import { ShoppingSection } from '@/components/sections/ShoppingSection';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overzicht');
  const [selectedMapLocation, setSelectedMapLocation] = useState<string>('Dhronecken');

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMapLocation = (locKey: string) => {
    setSelectedMapLocation(locKey);
    setActiveTab('kaarten');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      {/* Header with Desktop Navigation */}
      <Header activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 pt-20 pb-24 lg:pb-12">
        {activeTab === 'overzicht' && (
          <OverviewSection onNavigate={handleSelectTab} />
        )}
        {activeTab === 'culinair' && (
          <CulinarySection />
        )}
        {activeTab === 'weetjes' && (
          <AttractionsInfoSection onSelectMapLocation={handleSelectMapLocation} />
        )}
        {activeTab === 'verblijf' && (
          <AccommodationSection onNavigateToMap={handleSelectMapLocation} onNavigateTab={handleSelectTab} />
        )}
        {activeTab === 'dagen' && (
          <DaysSection onSelectMapLocation={handleSelectMapLocation} />
        )}
        {activeTab === 'kaarten' && (
          <MapSection initialLocationKey={selectedMapLocation} />
        )}
        {activeTab === 'wandelen' && (
          <HikingSection />
        )}
        {activeTab === 'winkels' && (
          <ShoppingSection />
        )}
        {activeTab === 'weer' && (
          <WeatherSection />
        )}
        {activeTab === 'reisverslag' && (
          <JournalSection />
        )}
        {activeTab === 'praktisch' && (
          <PracticalSection />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
