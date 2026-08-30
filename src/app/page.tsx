'use client';

import React, { useState } from 'react';
import { Header, TabId } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';
import { OverviewSection } from '@/components/sections/OverviewSection';
import { DaysSection } from '@/components/sections/DaysSection';
import { MapSection } from '@/components/sections/MapSection';
import { HikingSection } from '@/components/sections/HikingSection';
import { JournalSection } from '@/components/sections/JournalSection';
import { PracticalSection } from '@/components/sections/PracticalSection';

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
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-6 pb-24 lg:pb-12">
        {activeTab === 'overzicht' && (
          <OverviewSection onNavigate={handleSelectTab} />
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
        {activeTab === 'reisverslag' && (
          <JournalSection />
        )}
        {activeTab === 'praktisch' && (
          <PracticalSection />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Bottom Nav for Mobile / Tablet */}
      <BottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />
    </div>
  );
}
