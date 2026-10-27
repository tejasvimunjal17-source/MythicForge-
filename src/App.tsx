/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Character, CharacterClass, CharacterRace } from './types/character';
import { generateCharacter, getNextPortrait, fetchBackstory, generateLocalBackstory } from './utils/fantasyGenerator';
import { soundEffects } from './utils/audio';
import { TopBar } from './components/TopBar';
import { CharacterCard } from './components/CharacterCard';
import { GeneratorControls } from './components/GeneratorControls';
import { CharacterRoster } from './components/CharacterRoster';
import { ClassCompendium } from './components/ClassCompendium';
import { MyDeck } from './components/MyDeck';
import { Scroll, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

const WORKSHOP_BG = '/src/assets/images/alchemist_workshop_bg_1792921199161.jpg';
const DECK_STORAGE_KEY = 'fantasy_deck_v1';

export default function App() {
  const [character, setCharacter] = useState<Character>(() => generateCharacter());
  const [roster, setRoster] = useState<Character[]>(() => [character]);
  const [selectedClass, setSelectedClass] = useState<CharacterClass | 'ANY'>('ANY');
  const [selectedRace, setSelectedRace] = useState<CharacterRace | 'ANY'>('ANY');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeSection, setActiveSection] = useState<'generator' | 'deck' | 'roster' | 'classes'>('generator');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [backstoryError, setBackstoryError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Deck state with persistent browser storage & reliable session fallback
  const [deck, setDeck] = useState<Character[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(DECK_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      }
    } catch (err) {
      console.warn('Unable to load deck from persistent storage, using session memory:', err);
    }
    return [];
  });

  // Synchronize deck changes to persistent browser storage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
      }
    } catch (err) {
      console.warn('Unable to persist deck to browser storage:', err);
    }
  }, [deck]);

  // Synchronize audio state
  useEffect(() => {
    soundEffects.enabled = soundEnabled;
  }, [soundEnabled]);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);

    // Audio cues
    soundEffects.playDiceRoll();

    // Generate new character via application logic
    const newChar = generateCharacter({
      forcedClass: selectedClass !== 'ANY' ? selectedClass : undefined,
      forcedRace: selectedRace !== 'ANY' ? selectedRace : undefined,
    });

    setTimeout(() => {
      soundEffects.playClassChime(newChar.characterClass);
      setCharacter(newChar);
      setRoster((prev) => [newChar, ...prev.slice(0, 24)]); // Keep last 25 characters
      setIsGenerating(false);
      setActiveSection('generator');
    }, 150);
  }, [selectedClass, selectedRace]);

  const handleToggleFavorite = (id: string) => {
    setRoster((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
    if (character.id === id) {
      setCharacter((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  const handleSelectCharacter = (char: Character) => {
    setCharacter(char);
    setActiveSection('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearRoster = () => {
    setRoster([character]);
  };

  const handleCyclePortrait = () => {
    const nextUrl = getNextPortrait(character.portraitUrl, character.characterClass);
    setCharacter((prev) => ({ ...prev, portraitUrl: nextUrl }));
    setRoster((prev) =>
      prev.map((c) => (c.id === character.id ? { ...c, portraitUrl: nextUrl } : c))
    );
  };

  const handleGenerateBackstory = async () => {
    if (isGeneratingBackstory) return;
    setIsGeneratingBackstory(true);
    setBackstoryError(null);
    soundEffects.playDiceRoll();

    try {
      const { story } = await fetchBackstory(character);
      soundEffects.playClassChime(character.characterClass);

      // Requirement #9: Ensure that generating a backstory does not accidentally replace the current character.
      // Update ONLY backstory of current character!
      setCharacter((prev) => ({ ...prev, backstory: story }));
      setRoster((prev) =>
        prev.map((c) => (c.id === character.id ? { ...c, backstory: story } : c))
      );
    } catch {
      // Graceful error handling (Requirement #7)
      const fallbackStory = generateLocalBackstory(character);
      setCharacter((prev) => ({ ...prev, backstory: fallbackStory }));
      setRoster((prev) =>
        prev.map((c) => (c.id === character.id ? { ...c, backstory: fallbackStory } : c))
      );
    } finally {
      setIsGeneratingBackstory(false);
    }
  };

  const showToast = useCallback((text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 3500);
  }, []);

  const handleSaveToDeck = useCallback((charToSave: Character) => {
    // Check if character already exists in deck (prevent accidental duplicates)
    const isDuplicate = deck.some(
      (c) => c.id === charToSave.id || (c.name === charToSave.name && c.createdAt === charToSave.createdAt)
    );

    if (isDuplicate) {
      showToast(`"${charToSave.name}" is already in My Deck!`, 'info');
      return;
    }

    // Add deep clone with all stats (Health, Mana, Strength) explicitly preserved
    const savedCard: Character = {
      ...charToSave,
      health: charToSave.health || charToSave.hp,
      mana: charToSave.mana,
      strength: charToSave.strength,
    };

    soundEffects.playClassChime(charToSave.characterClass);
    setDeck((prev) => [savedCard, ...prev]);
    showToast(`Saved "${charToSave.name}" to My Deck!`, 'success');
  }, [deck, showToast]);

  const handleRemoveFromDeck = useCallback((id: string) => {
    setDeck((prev) => prev.filter((c) => c.id !== id));
    showToast('Removed character from My Deck.', 'info');
  }, [showToast]);

  const handleClearDeck = useCallback(() => {
    setDeck([]);
    showToast('My Deck has been cleared.', 'info');
  }, [showToast]);

  const handleSelectAndRollClass = (cls: CharacterClass) => {
    setSelectedClass(cls);
    soundEffects.playDiceRoll();
    const newChar = generateCharacter({ forcedClass: cls });
    soundEffects.playClassChime(cls);
    setCharacter(newChar);
    setRoster((prev) => [newChar, ...prev.slice(0, 24)]);
    setActiveSection('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0806] text-[#e8decb] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#ffd97d] relative overflow-x-hidden">
      {/* Ancient Alchemist Workshop Textured Atmosphere */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity"
        style={{ backgroundImage: `url('${WORKSHOP_BG}')` }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#0b0806]/90 via-[#0e0a07]/85 to-[#0b0806] backdrop-blur-[0.5px]" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Bar with Alchemist Workshop theme */}
        <TopBar
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
          onQuickGenerate={handleGenerate}
          onNavigate={setActiveSection}
          activeSection={activeSection}
          savedCount={roster.filter((c) => c.isFavorite).length}
          deckCount={deck.length}
        />

        {/* Main Content Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {/* Navigation Breadcrumb / Section Switcher for Android Phones */}
          <div className="grid grid-cols-4 gap-1 md:hidden p-1 bg-[#16110d] border border-[#523e2a] rounded-xl text-xs font-medium shadow-md">
            <button
              onClick={() => setActiveSection('generator')}
              className={`min-h-[40px] py-2 px-1 text-center rounded-lg transition-colors cursor-pointer truncate ${
                activeSection === 'generator' ? 'bg-[#d4af37]/20 text-[#ffd97d] font-bold border border-[#d4af37]/40' : 'text-[#baa990]'
              }`}
            >
              Codex
            </button>
            <button
              onClick={() => setActiveSection('deck')}
              className={`min-h-[40px] py-2 px-1 text-center rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                activeSection === 'deck' ? 'bg-[#d4af37]/20 text-[#ffd97d] font-bold border border-[#d4af37]/40' : 'text-[#baa990]'
              }`}
            >
              <span>Deck</span>
              {deck.length > 0 && (
                <span className="text-[10px] bg-[#d4af37]/25 text-[#ffd97d] px-1.5 py-0.2 rounded-full font-mono font-bold">
                  {deck.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveSection('roster')}
              className={`min-h-[40px] py-2 px-1 text-center rounded-lg transition-colors cursor-pointer truncate ${
                activeSection === 'roster' ? 'bg-[#d4af37]/20 text-[#ffd97d] font-bold border border-[#d4af37]/40' : 'text-[#baa990]'
              }`}
            >
              Ledger ({roster.length})
            </button>
            <button
              onClick={() => setActiveSection('classes')}
              className={`min-h-[40px] py-2 px-1 text-center rounded-lg transition-colors cursor-pointer truncate ${
                activeSection === 'classes' ? 'bg-[#d4af37]/20 text-[#ffd97d] font-bold border border-[#d4af37]/40' : 'text-[#baa990]'
              }`}
            >
              Callings
            </button>
          </div>

          {/* View: Character Generator View */}
          {activeSection === 'generator' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Generator Controls with Alchemist workshop styling */}
              <GeneratorControls
                onGenerate={handleGenerate}
                selectedClass={selectedClass}
                onSelectClass={setSelectedClass}
                selectedRace={selectedRace}
                onSelectRace={setSelectedRace}
                isGenerating={isGenerating}
              />

              {/* Prominent Character Card Codex */}
              <CharacterCard
                character={character}
                onToggleFavorite={handleToggleFavorite}
                onCyclePortrait={handleCyclePortrait}
                onGenerateBackstory={handleGenerateBackstory}
                isGeneratingBackstory={isGeneratingBackstory}
                backstoryError={backstoryError}
                onSaveToDeck={handleSaveToDeck}
                isInDeck={deck.some((c) => c.id === character.id || (c.name === character.name && c.createdAt === character.createdAt))}
              />

              {/* Quick Session Roster Strip */}
              {roster.length > 1 && (
                <section className="alchemist-panel rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-[#c4b59d] uppercase tracking-wider flex items-center gap-2">
                      <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Transmuted In This Session</span>
                    </h3>
                    <button
                      onClick={() => setActiveSection('roster')}
                      className="text-xs text-[#d4af37] hover:text-[#ffd97d] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Inspect all ({roster.length})</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {roster.slice(0, 6).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectCharacter(item)}
                        className={`p-2.5 rounded-xl border text-left shrink-0 w-52 transition-all flex items-center gap-3 cursor-pointer ${
                          item.id === character.id
                            ? 'bg-[#d4af37]/15 border-[#d4af37] ring-1 ring-[#d4af37]/40'
                            : 'bg-[#140f0c] border-[#423223] hover:border-[#8c6d3b] hover:bg-[#1a1410]'
                        }`}
                      >
                        {item.portraitUrl && (
                          <img
                            src={item.portraitUrl}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover border border-[#6e5842] shrink-0"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] text-[#d4af37] font-semibold truncate uppercase">
                            {item.characterClass} · {item.race}
                          </div>
                          <div className="text-xs font-bold text-[#f5ebd7] truncate font-fantasy">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-[#8c7b66] font-mono">
                            Vitality: {item.hp} HP
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* View: My Deck (Saved Character Cards Collection) */}
          {activeSection === 'deck' && (
            <div className="space-y-6">
              <MyDeck
                deck={deck}
                activeCharacterId={character.id}
                onSelectCharacter={handleSelectCharacter}
                onRemoveFromDeck={handleRemoveFromDeck}
                onClearDeck={handleClearDeck}
              />
            </div>
          )}

          {/* View: Adventurers' Ledger / Full Roster */}
          {activeSection === 'roster' && (
            <div className="space-y-6">
              <CharacterRoster
                characters={roster}
                activeCharacterId={character.id}
                onSelectCharacter={handleSelectCharacter}
                onToggleFavorite={handleToggleFavorite}
                onClearRoster={handleClearRoster}
              />
            </div>
          )}

          {/* View: Class Compendium */}
          {activeSection === 'classes' && (
            <div className="space-y-6">
              <ClassCompendium onSelectAndRoll={handleSelectAndRollClass} />
            </div>
          )}
        </main>

        {/* Alchemical Confirmation Toast Banner */}
        {toastMessage && (
          <aside
            aria-live="polite"
            className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-sm w-auto flex items-center gap-2.5 p-3.5 px-4 rounded-xl shadow-2xl backdrop-blur-md bg-[#16110d]/95 border border-[#d4af37] text-xs font-semibold text-[#ffd97d] transition-all"
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#7fc48e] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
            )}
            <p className="font-fantasy tracking-wide">{toastMessage.text}</p>
          </aside>
        )}

        {/* Alchemist Workshop Footer */}
        <footer className="mt-16 border-t border-[#4d3a28] bg-[#0c0907] py-8 text-center text-xs text-[#8c7b66]">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="flex items-center gap-1.5 font-fantasy text-[#baa990]">
              <span className="text-[#d4af37]">⚗️</span>
              <span>Ancient Alchemist's Workshop</span>
              <span aria-hidden="true" className="text-[#523e2a]">/</span>
              <span className="text-[#8c7b66] font-sans text-xs">Fantasy Role-Playing Companion</span>
            </p>
            <p className="text-[#8c7b66]">
              Aged parchment, warm bronze & celestial humors · Fully responsive
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
