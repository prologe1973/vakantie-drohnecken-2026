'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  JournalEntry,
  getJournalEntries as getLocalEntries,
} from '@/lib/journalDb';
import { compressImage } from '@/lib/imageCompression';
import {
  Plus,
  Download,
  Upload,
  Calendar,
  MapPin,
  Clock,
  Edit2,
  Trash2,
  X,
  Camera,
  BookOpen,
  Images,
  FolderOpen,
  ChevronLeft,
  Loader2,
} from 'lucide-react';

interface ImmichAlbum {
  id: string;
  albumName: string;
  assetCount: number;
  albumThumbnailAssetId: string | null;
}

interface ImmichAsset {
  id: string;
  type: string;
}

export const JournalSection: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filterDay, setFilterDay] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [day, setDay] = useState('Dag 1');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  // Immich picker state
  const [immichOpen, setImmichOpen] = useState(false);
  const [immichAlbums, setImmichAlbums] = useState<ImmichAlbum[]>([]);
  const [immichLoading, setImmichLoading] = useState(false);
  const [immichError, setImmichError] = useState('');
  const [activeAlbum, setActiveAlbum] = useState<ImmichAlbum | null>(null);
  const [immichAssets, setImmichAssets] = useState<ImmichAsset[]>([]);
  const [viewMode, setViewMode] = useState<'albums' | 'vacation'>('albums');
  const [selectedImmich, setSelectedImmich] = useState<Set<string>>(new Set());
  const [immichAdding, setImmichAdding] = useState(false);
  const [vacationAssets, setVacationAssets] = useState<ImmichAsset[]>([]);
  const [vacationLoading, setVacationLoading] = useState(false);

  // Lightbox State
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [lightboxCap, setLightboxCap] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  // Laad verslagen uit de database (SQLite). Als de database leeg is
  // maar er wél lokale (IndexedDB) data staat, wordt die eenmalig gemigreerd.
  const refreshEntries = async () => {
    try {
      const res = await fetch('/api/journal');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      let items: JournalEntry[] = await res.json();

      if (items.length === 0) {
        // Check of er lokale data is om te migreren
        let local: JournalEntry[] = [];
        try {
          local = await getLocalEntries();
        } catch (e) {
          // geen IndexedDB (bv. privacy-modus) — negeren
        }
        // Verwijder de oude automatische welkomst-mockdata bij migratie
        const meaningful = local.filter((e) => e.id !== 'entry_welcome');
        if (meaningful.length > 0) {
          await fetch('/api/journal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meaningful),
          });
          items = meaningful;
        }
      }
      setEntries(items);
    } catch (e) {
      console.error('Failed to load journal entries from database', e);
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  // Open modal for new entry or edit
  const handleOpenModal = (entry?: JournalEntry) => {
    if (entry) {
      setEditingEntry(entry);
      setTitle(entry.title);
      setDay(entry.day);
      setDate(entry.date);
      setLocation(entry.location || '');
      setText(entry.text || '');
      setPhotos(entry.photos || []);
    } else {
      setEditingEntry(null);
      setTitle('');
      setDay('Dag 1');
      const now = new Date();
      const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setDate(localISO);
      setLocation('');
      setText('');
      setPhotos([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
    setPhotos([]);
  };

  // Handle Photo Selection & Compression
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.startsWith('image/')) {
          const compressed = await compressImage(files[i]);
          compressedList.push(compressed);
        }
      }
      setPhotos((prev) => [...prev, ...compressedList]);
    } catch (err) {
      console.error('Error compressing image', err);
      alert('Er ging iets mis bij het optimaliseren van de foto.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  // ============ Immich picker ============
  const openImmichPicker = async () => {
    setImmichOpen(true);
    setImmichError('');
    setActiveAlbum(null);
    setViewMode('albums');
    setSelectedImmich(new Set());
    setImmichAssets([]);
    setImmichLoading(true);
    try {
      const res = await fetch('/api/immich/albums');
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const albums = (Array.isArray(data) ? data : data?.albums || [])
        .map((a: any) => ({
          id: a.id,
          albumName: a.albumName || 'Album',
          assetCount: a.assetCount || 0,
          albumThumbnailAssetId: a.albumThumbnailAssetId || null,
        }))
        .sort((a: ImmichAlbum, b: ImmichAlbum) =>
          (a.albumName || '').localeCompare(b.albumName || '')
        );
      setImmichAlbums(albums);
    } catch (e: any) {
      setImmichError(e?.message || 'Kon Immich-albums niet laden.');
    } finally {
      setImmichLoading(false);
    }
  };

  const openAlbum = async (album: ImmichAlbum) => {
    setActiveAlbum(album);
    setSelectedImmich(new Set());
    setImmichLoading(true);
    setImmichError('');
    try {
      const res = await fetch(`/api/immich/albums/${album.id}/assets`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setImmichAssets(
        (Array.isArray(data) ? data : []).filter((a: any) => a.type === 'IMAGE')
      );
    } catch (e: any) {
      setImmichError(e?.message || 'Kon albumfoto\'s niet laden.');
      setImmichAssets([]);
    } finally {
      setImmichLoading(false);
    }
  };

  const toggleAsset = (id: string) => {
    setSelectedImmich((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Laadt foto's gemaakt in de laatste 7 dagen
  const loadVacation = async () => {
    setViewMode('vacation');
    setActiveAlbum(null);
    setSelectedImmich(new Set());
    setImmichError('');
    setVacationLoading(true);
    try {
      const now = new Date();
      const before = now.toISOString();
      const after = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const res = await fetch(
        `/api/immich/search?after=${encodeURIComponent(after)}&before=${encodeURIComponent(before)}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setVacationAssets(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setImmichError(e?.message || 'Kon de foto\'s van de laatste 7 dagen niet laden.');
      setVacationAssets([]);
    } finally {
      setVacationLoading(false);
    }
  };
  const addSelectedImmich = async () => {
    const ids = Array.from(selectedImmich);
    if (ids.length === 0) return;
    setImmichAdding(true);
    try {
      const added: string[] = [];
      for (const id of ids) {
        const res = await fetch(`/api/immich/thumbnail/${id}?size=preview`);
        if (!res.ok) continue;
        const blob = await res.blob();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        added.push(dataUrl);
      }
      setPhotos((prev) => [...prev, ...added]);
      setImmichOpen(false);
      setSelectedImmich(new Set());
      setActiveAlbum(null);
      if (added.length < ids.length) {
        alert(`Toegevoegd: ${added.length} van ${ids.length} foto's.`);
      }
    } catch (e: any) {
      alert('Er ging iets mis bij het ophalen van de Immich-foto\'s.');
    } finally {
      setImmichAdding(false);
    }
  };

  const closeImmichPicker = () => {
    if (immichAdding) return;
    setImmichOpen(false);
    setActiveAlbum(null);
    setViewMode('albums');
    setSelectedImmich(new Set());
    setImmichError('');
  };

  // Save entry
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Vul minimaal een titel in.');
      return;
    }

    const entryToSave: JournalEntry = {
      id: editingEntry ? editingEntry.id : `entry_${Date.now()}`,
      title: title.trim(),
      day,
      date: date || new Date().toISOString(),
      location: location.trim(),
      text: text.trim(),
      photos,
      updatedAt: new Date().toISOString(),
    };

    try {
      const method = editingEntry ? 'PUT' : 'POST';
      const url = editingEntry ? `/api/journal/${entryToSave.id}` : '/api/journal';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entryToSave),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      handleCloseModal();
      await refreshEntries();
    } catch (err) {
      console.error('Failed to save entry', err);
      alert('Kon notitie niet opslaan.');
    }
  };

  // Delete entry
  const handleDelete = async (id: string, entryTitle: string) => {
    if (confirm(`Weet je zeker dat je "${entryTitle}" wilt verwijderen?`)) {
      try {
        const res = await fetch(`/api/journal/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await refreshEntries();
      } catch (err) {
        console.error('Failed to delete entry', err);
      }
    }
  };

  // Export JSON backup
  const handleExport = () => {
    if (entries.length === 0) {
      alert('Er zijn nog geen verslagen om te exporteren.');
      return;
    }
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute(
      'download',
      `reisverslag_dhronecken_2026_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  // Import JSON backup
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const imported = JSON.parse(evt.target?.result as string);
        if (Array.isArray(imported)) {
          // Import vervangt de hele database met de backup
          const res = await fetch('/api/journal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imported),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          alert(`Succesvol ${imported.length} reisverslagen geïmporteerd!`);
          await refreshEntries();
        } else {
          alert('Ongeldig backupbestand.');
        }
      } catch (err: any) {
        alert('Kon bestand niet lezen: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const filteredEntries =
    filterDay === 'all' ? entries : entries.filter((e) => e.day === filterDay);

  const totalPhotos = entries.reduce((acc, curr) => acc + (curr.photos?.length || 0), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Actions */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-wine">
            Herinneringen &amp; Notities
          </span>
          <h2 className="text-3xl font-bold font-serif text-forest">Reisverslag &amp; Foto's</h2>
          <p className="text-sm text-muted mt-1">
            Leg persoonlijke reisverslagen en foto's vast. Alles wordt veilig offline bewaard in je browser.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-forest hover:bg-forest2 text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nieuwe notitie / foto's</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-white hover:bg-cream border border-line text-forest text-xs md:text-sm font-semibold px-3.5 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Backup Exporteren</span>
          </button>

          <label className="flex items-center gap-2 bg-white hover:bg-cream border border-line text-forest text-xs md:text-sm font-semibold px-3.5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Importeren</span>
            <input
              type="file"
              ref={importInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
          </label>
        </div>

        {/* Quick Stats Bar */}
        <div className="flex items-center gap-6 bg-white p-3.5 px-4 rounded-xl border border-line shadow-soft text-xs text-muted">
          <span>
            📖 Totaal verslagen: <b className="text-forest text-sm">{entries.length}</b>
          </span>
          <span>
            📷 Foto's opgeslagen: <b className="text-forest text-sm">{totalPhotos}</b>
          </span>
        </div>

        {/* Day Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['all', 'Dag 1', 'Dag 2', 'Dag 3', 'Dag 4', 'Algemeen'].map((d) => (
            <button
              key={d}
              onClick={() => setFilterDay(d)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterDay === d
                  ? 'bg-wine text-white shadow-sm'
                  : 'bg-white text-ink border border-line hover:bg-cream'
              }`}
            >
              {d === 'all' ? 'Alle dagen' : d}
            </button>
          ))}
        </div>
      </div>

      {/* Entries List / Grid */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-line p-12 text-center shadow-soft">
          <BookOpen className="w-12 h-12 text-gold mx-auto mb-3 opacity-80" />
          <h3 className="text-xl font-bold font-serif text-forest mb-1">
            Nog geen verslagen voor {filterDay === 'all' ? 'deze vakantie' : filterDay}
          </h3>
          <p className="text-xs text-muted max-w-md mx-auto mb-4">
            Voeg je eerste notitie, ervaring of vakantiefoto toe met de knop hierboven.
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 bg-forest text-white text-xs font-semibold px-4 py-2 rounded-xl"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Eerste verslag schrijven</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => {
            const dateObj = new Date(entry.date);
            const dateStr = isNaN(dateObj.getTime())
              ? entry.date
              : dateObj.toLocaleDateString('nl-NL', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                });

            return (
              <div
                key={entry.id}
                className="bg-white rounded-2xl border border-line shadow-soft hover:shadow-card transition-all flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Header */}
                  <div className="p-4 pb-2 flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-forest text-white">
                        {entry.day}
                      </span>
                      {entry.location && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gold text-ink flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          {entry.location}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenModal(entry)}
                        className="p-1 text-muted hover:text-forest rounded transition-colors"
                        title="Bewerken"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id, entry.title)}
                        className="p-1 text-muted hover:text-wine rounded transition-colors"
                        title="Verwijderen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Date */}
                  <div className="px-4 py-1">
                    <h3 className="text-xl font-bold font-serif text-forest leading-tight">
                      {entry.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-muted mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{dateStr}</span>
                    </div>
                  </div>

                  {/* Body text */}
                  {entry.text && (
                    <div className="px-4 py-2.5 text-xs text-ink whitespace-pre-wrap leading-relaxed">
                      {entry.text}
                    </div>
                  )}

                  {/* Photos Grid */}
                  {entry.photos && entry.photos.length > 0 && (
                    <div className="px-4 py-2 grid grid-cols-3 gap-2">
                      {entry.photos.map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => {
                            setLightboxImg(photo);
                            setLightboxCap(
                              `${entry.title} (${pIdx + 1}/${entry.photos.length})`
                            );
                          }}
                          className="relative h-20 rounded-lg overflow-hidden border border-line bg-cream cursor-pointer group"
                        >
                          <img
                            src={photo}
                            alt="Reisfoto"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-3 bg-cream/30 border-t border-line/60 text-[10px] text-muted text-right">
                  Bijgewerkt: {new Date(entry.updatedAt).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          MODAL: NIEUWE NOTITIE / BEWERKEN
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
            <div className="p-4 bg-forest text-white flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif">
                {editingEntry ? 'Reisverslag Bewerken' : 'Nieuw Reisverslag'}
              </h3>
              <button onClick={handleCloseModal} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Gekoppelde Dag</label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-line bg-cream/30 text-ink focus:outline-none focus:border-wine"
                  >
                    <option value="Dag 1">Dag 1 · Ma 7 sep (Bernkastel)</option>
                    <option value="Dag 2">Dag 2 · Di 8 sep (Romeins Trier)</option>
                    <option value="Dag 3">Dag 3 · Wo 9 sep (Idar / Herrstein)</option>
                    <option value="Dag 4">Dag 4 · Do 10 sep (Erbeskopf / Geierlay)</option>
                    <option value="Algemeen">Algemeen / Vrije Notitie</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Datum &amp; Tijd</label>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-line bg-cream/30 text-ink focus:outline-none focus:border-wine"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Titel / Onderwerp</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Bijv. Wandeling door de kloof"
                    className="w-full p-2.5 rounded-lg border border-line bg-cream/30 text-ink focus:outline-none focus:border-wine"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Locatie</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Bijv. Dhronecken of Trier"
                    className="w-full p-2.5 rounded-lg border border-line bg-cream/30 text-ink focus:outline-none focus:border-wine"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-forest uppercase mb-1">Notities &amp; Verhaal</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Wat hebben we meegemaakt, gegeten of ontdekt?..."
                  rows={4}
                  className="w-full p-2.5 rounded-lg border border-line bg-cream/30 text-ink focus:outline-none focus:border-wine resize-y"
                />
              </div>

              {/* Photo Uploader */}
              <div>
                <label className="block font-bold text-forest uppercase mb-1">Foto's toevoegen</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-line hover:border-gold p-4 rounded-xl text-center cursor-pointer bg-cream/20 transition-colors"
                >
                  <Camera className="w-6 h-6 text-muted mx-auto mb-1" />
                  <p className="font-semibold text-forest">Klik om foto's of camera te selecteren</p>
                  <p className="text-[10px] text-muted">Geoptimaliseerd voor mobiel, tablet en pc</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </div>

                {isCompressing && (
                  <p className="text-[11px] text-gold font-bold mt-2 text-center animate-pulse">
                    Foto's optimaliseren voor snelle browseropslag...
                  </p>
                )}

                {/* Uit Immich knop */}
                <button
                  type="button"
                  onClick={openImmichPicker}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-wine hover:bg-wine/90 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  <Images className="w-4 h-4" />
                  <span>Uit Immich kiezen…</span>
                </button>

                {/* Previews */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {photos.map((src, pIdx) => (
                      <div
                        key={pIdx}
                        className="relative h-16 rounded-lg overflow-hidden border border-line"
                      >
                        <img src={src} alt="Upload preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(pIdx)}
                          className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-cream border border-line font-semibold text-muted"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-forest hover:bg-forest2 font-semibold text-white shadow-sm"
                >
                  Opslaan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          IMMICH PICKER OVERLAY
          ========================================================================= */}
      {immichOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
            <div className="p-4 bg-wine text-white flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif flex items-center gap-2">
                <Images className="w-5 h-5" />
                {activeAlbum
                  ? activeAlbum.albumName
                  : viewMode === 'vacation'
                    ? "Foto's van de laatste 7 dagen"
                    : 'Immich-albums'}
              </h3>
              <button
                onClick={closeImmichPicker}
                className="text-white/80 hover:text-white"
                disabled={immichAdding}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {immichError && (
                <div className="mb-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {immichError}
                </div>
              )}

              {/* Terug-knop */}
              {activeAlbum && (
                <button
                  onClick={() => setActiveAlbum(null)}
                  className="mb-3 flex items-center gap-1 text-xs font-semibold text-muted hover:text-forest"
                  disabled={immichAdding}
                >
                  <ChevronLeft className="w-4 h-4" /> Terug
                </button>
              )}
              {viewMode === 'vacation' && (
                <button
                  onClick={() => setViewMode('albums')}
                  className="mb-3 flex items-center gap-1 text-xs font-semibold text-muted hover:text-forest"
                  disabled={immichAdding}
                >
                  <ChevronLeft className="w-4 h-4" /> Terug naar albums
                </button>
              )}

              {immichLoading || vacationLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted">
                  <Loader2 className="w-8 h-8 animate-spin mb-3" />
                  <span className="text-xs">Foto's laden…</span>
                </div>
              ) : activeAlbum ? (
                <>
                  {immichAssets.length === 0 ? (
                    <div className="text-center py-10 text-xs text-muted">
                      Geen foto's in dit album.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {immichAssets.map((a) => (
                        <div
                          key={a.id}
                          onClick={() => toggleAsset(a.id)}
                          className={`relative h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            selectedImmich.has(a.id)
                              ? 'border-wine ring-2 ring-wine/40'
                              : 'border-transparent hover:border-line'
                          }`}
                        >
                          <img
                            src={`/api/immich/thumbnail/${a.id}?size=thumbnail`}
                            alt="Immich foto"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {selectedImmich.has(a.id) && (
                            <div className="absolute top-1 right-1 bg-wine text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : viewMode === 'vacation' ? (
                <>
                  {vacationAssets.length === 0 ? (
                    <div className="text-center py-10 text-xs text-muted">
                      Geen foto's gevonden in de laatste 7 dagen.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {vacationAssets.map((a) => (
                        <div
                          key={a.id}
                          onClick={() => toggleAsset(a.id)}
                          className={`relative h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            selectedImmich.has(a.id)
                              ? 'border-wine ring-2 ring-wine/40'
                              : 'border-transparent hover:border-line'
                          }`}
                        >
                          <img
                            src={`/api/immich/thumbnail/${a.id}?size=thumbnail`}
                            alt="Vakantiefoto"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {selectedImmich.has(a.id) && (
                            <div className="absolute top-1 right-1 bg-wine text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  {/* Deze vakantie optie */}
                  <button
                    onClick={loadVacation}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-gold/60 bg-gold/10 hover:bg-gold/20 text-left transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-forest">
                        Foto's van de laatste 7 dagen
                      </p>
                      <p className="text-[11px] text-muted">
                        Genomen in de afgelopen 7 dagen (niet per album)
                      </p>
                    </div>
                    <ChevronLeft className="w-4 h-4 ml-auto rotate-180 text-muted" />
                  </button>

                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted pt-1">
                    Of kies uit een album
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {immichAlbums.length === 0 ? (
                      <div className="col-span-2 text-center py-6 text-xs text-muted">
                        Geen albums gevonden in Immich.
                      </div>
                    ) : (
                      immichAlbums.map((album) => (
                        <button
                          key={album.id}
                          onClick={() => openAlbum(album)}
                          className="flex items-center gap-3 p-3 rounded-xl border border-line hover:border-gold hover:bg-cream/30 text-left transition-colors"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                            {album.albumThumbnailAssetId ? (
                              <img
                                src={`/api/immich/thumbnail/${album.albumThumbnailAssetId}?size=thumbnail`}
                                alt=""
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <FolderOpen className="w-6 h-6 text-muted m-auto" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-forest truncate">
                              {album.albumName}
                            </p>
                            <p className="text-[11px] text-muted">
                              {album.assetCount} foto's
                            </p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {(activeAlbum || viewMode === 'vacation') && (
              <div className="p-4 border-t border-line flex items-center justify-between bg-cream/30">
                <span className="text-xs text-muted">
                  {selectedImmich.size} geselecteerd
                </span>
                <button
                  onClick={addSelectedImmich}
                  disabled={selectedImmich.size === 0 || immichAdding}
                  className="flex items-center gap-2 bg-forest hover:bg-forest2 text-white text-xs font-semibold px-4 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {immichAdding && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{immichAdding ? 'Toevoegen…' : 'Foto\'s toevoegen'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          LIGHTBOX OVERLAY
          ========================================================================= */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 animate-fadeIn"
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImg}
            alt="Vergrote weergave"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
          {lightboxCap && (
            <div className="mt-3 px-4 py-1.5 bg-black/60 rounded-full text-white text-xs">
              {lightboxCap}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
