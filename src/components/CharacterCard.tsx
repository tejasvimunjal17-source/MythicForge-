import React, { useState } from 'react';
import { Character } from '../types/character';
import { getStatModifier } from '../utils/fantasyGenerator';
import { CharacterPortrait } from './CharacterPortrait';
import {
  Shield,
  Sword,
  Sparkles,
  Heart,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  FileText,
  Zap,
  Scroll,
  Compass,
  BookOpen,
  Loader2,
  AlertCircle,
  Layers
} from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onToggleFavorite: (id: string) => void;
  onCyclePortrait?: () => void;
  onGenerateBackstory?: () => void;
  isGeneratingBackstory?: boolean;
  backstoryError?: string | null;
  onSaveToDeck?: (char: Character) => void;
  isInDeck?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onToggleFavorite,
  onCyclePortrait,
  onGenerateBackstory,
  isGeneratingBackstory = false,
  backstoryError = null,
  onSaveToDeck,
  isInDeck = false,
}) => {
  const [copied, setCopied] = useState(false);

  const statLabels = [
    { key: 'str' as const, label: 'Strength', short: 'STR' },
    { key: 'dex' as const, label: 'Dexterity', short: 'DEX' },
    { key: 'con' as const, label: 'Constitution', short: 'CON' },
    { key: 'int' as const, label: 'Intelligence', short: 'INT' },
    { key: 'wis' as const, label: 'Wisdom', short: 'WIS' },
    { key: 'cha' as const, label: 'Charisma', short: 'CHA' },
  ];

  const handleCopy = async () => {
    const text = `
📜 ALCHEMICAL CODEX - ${character.name.toUpperCase()}
Epithet: "${character.title}"
Class: ${character.characterClass} (${character.subclass})
Lineage: ${character.race}
Alignment: ${character.alignment}
Level: ${character.level} | Vitality: ${character.hp} HP

[ALCHEMICAL ATTRIBUTES]
STR: ${character.stats.str} (${getStatModifier(character.stats.str)})
DEX: ${character.stats.dex} (${getStatModifier(character.stats.dex)})
CON: ${character.stats.con} (${getStatModifier(character.stats.con)})
INT: ${character.stats.int} (${getStatModifier(character.stats.int)})
WIS: ${character.stats.wis} (${getStatModifier(character.stats.wis)})
CHA: ${character.stats.cha} (${getStatModifier(character.stats.cha)})

[EQUIPMENT & RELICS]
Primary Armament: ${character.primaryWeapon}
Secondary Apparatus: ${character.secondaryItem}
Attired Protection: ${character.armor}

[SIGNATURE TRANSMUTATION]
${character.ability}

[ORIGIN & ESOTERIC QUIRK]
Background: ${character.background}
Quirk: ${character.quirk}

[CHRONICLE OF THE ADEPTS]
${character.backstory}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadTxt = () => {
    const text = `ALCHEMICAL CODEX - CHARACTER SHEET\n====================================\nName: ${character.name}\nEpithet: "${character.title}"\nClass: ${character.characterClass} (${character.subclass})\nLineage: ${character.race}\nAlignment: ${character.alignment}\nLevel: ${character.level} | Vitality: ${character.hp} HP\n\nALCHEMICAL ATTRIBUTES:\n- Strength: ${character.stats.str} (${getStatModifier(character.stats.str)})\n- Dexterity: ${character.stats.dex} (${getStatModifier(character.stats.dex)})\n- Constitution: ${character.stats.con} (${getStatModifier(character.stats.con)})\n- Intelligence: ${character.stats.int} (${getStatModifier(character.stats.int)})\n- Wisdom: ${character.stats.wis} (${getStatModifier(character.stats.wis)})\n- Charisma: ${character.stats.cha} (${getStatModifier(character.stats.cha)})\n\nEQUIPMENT & RELICS:\n- Primary Armament: ${character.primaryWeapon}\n- Secondary Apparatus: ${character.secondaryItem}\n- Attired Protection: ${character.armor}\n\nSIGNATURE ABILITY:\n${character.ability}\n\nBACKGROUND:\n${character.background}\n\nESOTERIC QUIRK:\n${character.quirk}\n\nCHRONICLE OF THE ADEPTS:\n${character.backstory}\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${character.name.toLowerCase().replace(/\s+/g, '_')}_codex.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <article className="w-full alchemist-panel rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Decorative antique corner studs */}
      <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#d4af37] shadow-inner border border-[#6e5842] pointer-events-none z-10" />
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#d4af37] shadow-inner border border-[#6e5842] pointer-events-none z-10" />
      <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[#d4af37] shadow-inner border border-[#6e5842] pointer-events-none z-10" />
      <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#d4af37] shadow-inner border border-[#6e5842] pointer-events-none z-10" />

      {/* Top Banner with Name & Class */}
      <div className="relative p-5 sm:p-7 lg:p-8 bg-gradient-to-b from-[#211913] to-[#17120e] border-b border-[#523e2a]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1.5 min-w-0">
            {/* Unboxed Metadata Line with Alchemical Separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
              <span className="text-[#e8decb]">{character.race}</span>
              <span aria-hidden="true" className="text-[#6e5842]">/</span>
              <span className="text-[#ffd97d] font-bold">{character.characterClass}</span>
              <span aria-hidden="true" className="text-[#6e5842]">/</span>
              <span className="text-[#baa990]">{character.subclass}</span>
              <span aria-hidden="true" className="text-[#6e5842]">/</span>
              <span className="text-[#9c8973]">{character.alignment}</span>
            </div>

            {/* Stylized Fantasy Character Name (Cinzel Decorative) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#ffd97d] font-fantasy-title tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] truncate">
              {character.name}
            </h1>

            {/* Character Epithet */}
            <p className="text-sm sm:text-base text-[#e5c07b]/90 italic font-serif">
              "{character.title}"
            </p>
          </div>

          {/* Quick Action Buttons (Touch target >= 44px) */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0 pt-1 sm:pt-0">
            {/* SAVE TO DECK BUTTON (Task Requirement) */}
            <button
              onClick={() => onSaveToDeck?.(character)}
              id="save-to-deck-btn"
              data-testid="save-to-deck-btn"
              className={`min-h-[44px] px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer active:scale-95 shadow-md ${
                isInDeck
                  ? 'bg-[#d4af37]/25 border-[#d4af37] text-[#ffd97d]'
                  : 'alchemist-btn-primary'
              }`}
              title={isInDeck ? `"${character.name}" is already saved in My Deck` : `Save "${character.name}" to My Deck`}
              aria-label="Save to Deck"
            >
              {isInDeck ? (
                <Check className="w-4 h-4 text-[#ffd97d]" />
              ) : (
                <Layers className="w-4 h-4" />
              )}
              <span>Save to Deck</span>
            </button>

            <button
              onClick={handleCopy}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border border-[#523e2a] bg-[#1e1712] text-[#baa990] hover:text-[#f3e5c8] hover:border-[#8c6d3b] hover:bg-[#281f19] transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95"
              title="Copy alchemical codex"
              aria-label="Copy codex"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#7fc48e]" />
                  <span className="text-[#7fc48e]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#a89880]" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadTxt}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border border-[#523e2a] bg-[#1e1712] text-[#baa990] hover:text-[#f3e5c8] hover:border-[#8c6d3b] hover:bg-[#281f19] transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95"
              title="Export as Parchment Scroll"
              aria-label="Export scroll"
            >
              <FileText className="w-4 h-4 text-[#a89880]" />
              <span>Scroll</span>
            </button>
          </div>
        </div>

        {/* Primary Stats Ribbon (Health, Mana, Strength) - Clear positive integer values */}
        <div className="mt-5 pt-4 border-t border-[#4d3a28]/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider font-fantasy">
              Core Combat Attributes
            </span>
            <span className="text-[10px] text-[#8c7b66] font-mono">Sensible RPG Tier</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Health Stat Meter & Badge */}
            <div className="p-3 rounded-xl bg-[#1b1210] border border-[#7f2d2d]/60 shadow-sm space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#fca5a5] font-semibold">
                  <Heart className="w-3.5 h-3.5 text-[#ef4444] fill-[#ef4444]/30" />
                  Health
                </span>
                <span className="font-mono font-bold text-[#fecaca] tabular-nums text-sm">
                  {character.health ?? character.hp} <span className="text-[10px] text-[#f87171]/80">HP</span>
                </span>
              </div>
              <div className="w-full bg-[#2a1715] h-2 rounded-full overflow-hidden border border-[#5c1d1d]/50">
                <div
                  className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  style={{ width: `${Math.min(100, Math.max(15, (((character.health ?? character.hp) || 100) / 150) * 100))}%` }}
                />
              </div>
            </div>

            {/* Mana Stat Meter & Badge */}
            <div className="p-3 rounded-xl bg-[#101622] border border-[#2d437f]/60 shadow-sm space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#93c5fd] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#3b82f6]" />
                  Mana
                </span>
                <span className="font-mono font-bold text-[#bfdbfe] tabular-nums text-sm">
                  {character.mana} <span className="text-[10px] text-[#60a5fa]/80">MP</span>
                </span>
              </div>
              <div className="w-full bg-[#121c2d] h-2 rounded-full overflow-hidden border border-[#1e3a8a]/50">
                <div
                  className="bg-gradient-to-r from-[#2563eb] to-[#38bdf8] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  style={{ width: `${Math.min(100, Math.max(15, (character.mana / 170) * 100))}%` }}
                />
              </div>
            </div>

            {/* Strength Stat Meter & Badge */}
            <div className="p-3 rounded-xl bg-[#20170e] border border-[#8c6d3b]/60 shadow-sm space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#fde047] font-semibold">
                  <Sword className="w-3.5 h-3.5 text-[#d4af37]" />
                  Strength
                </span>
                <span className="font-mono font-bold text-[#fef08a] tabular-nums text-sm">
                  {character.strength} <span className="text-[10px] text-[#eab308]/80">STR</span>
                </span>
              </div>
              <div className="w-full bg-[#2a1d10] h-2 rounded-full overflow-hidden border border-[#6e5842]/50">
                <div
                  className="bg-gradient-to-r from-[#d97706] to-[#f59e0b] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                  style={{ width: `${Math.min(100, Math.max(15, (character.strength / 100) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Prominent Framed Portrait + Attributes + Gear + Lore */}
      <div className="p-5 sm:p-7 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Elegant Framed Portrait + Dedicated Backstory Section + Ability Scores */}
        <div className="lg:col-span-5 space-y-5">
          {/* Framed Portrait Panel */}
          <div className="max-w-xs sm:max-w-sm lg:max-w-none mx-auto w-full">
            <CharacterPortrait
              portraitUrl={character.portraitUrl}
              characterName={character.name}
              characterClass={character.characterClass}
              subclass={character.subclass}
              onCyclePortrait={onCyclePortrait}
              hasMultipleVariants={true}
            />
          </div>

          {/* DEDICATED SECTION BENEATH CHARACTER PORTRAIT (Requirement #5) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#140f0c] border border-[#523e2a] shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-[#4d3a28]/60 pb-2.5">
              <div className="flex items-center gap-2">
                <Scroll className="w-4 h-4 text-[#d4af37]" />
                <h3 className="text-xs font-bold text-[#ffd97d] uppercase tracking-wider font-fantasy">
                  Character Origin Story
                </h3>
              </div>
              <span className="text-[10px] text-[#8c7b66] font-mono">1-2 Sentences</span>
            </div>

            {/* Backstory Display or Loading Indicator (Requirement #2, #3, #4, #6) */}
            <div className="min-h-[76px] flex items-center">
              {isGeneratingBackstory ? (
                <div className="w-full flex items-center justify-center gap-2.5 py-4 text-xs font-medium text-[#ffd97d] bg-[#1a120c]/80 rounded-xl border border-[#d4af37]/30">
                  <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                  <span>Weaving imaginative origin story...</span>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-[#e8decb] leading-relaxed italic font-serif">
                  "{character.backstory}"
                </p>
              )}
            </div>

            {/* Error handling message if needed (Requirement #7) */}
            {backstoryError && (
              <div className="text-[11px] text-[#f87171] flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{backstoryError}</span>
              </div>
            )}

            {/* Action button: Generate Backstory */}
            <div className="pt-1 border-t border-[#4d3a28]/40">
              <button
                type="button"
                id="generate-backstory-btn"
                onClick={onGenerateBackstory}
                disabled={isGeneratingBackstory}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#221811] hover:bg-[#2e2017] border border-[#8c6d3b] hover:border-[#d4af37] text-[#ffd97d] font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                title={`Generate new backstory for ${character.name}`}
              >
                {isGeneratingBackstory ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                    <span>Generating Backstory...</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4 text-[#d4af37]" />
                    <span>Generate Backstory</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Ability Scores Carved Stone / Walnut Tablets */}
          <div>
            <h3 className="text-xs font-semibold text-[#c4b59d] uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Alchemical Humors</span>
              <span className="text-[#8c7b66] text-[11px] font-mono lowercase">4d6 drop lowest</span>
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-2.5">
              {statLabels.map(({ key, short }) => {
                const score = character.stats[key];
                const mod = getStatModifier(score);
                const isHighlight = score >= 15;

                return (
                  <div
                    key={key}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isHighlight
                        ? 'bg-[#d4af37]/10 border-[#d4af37]/60 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                        : 'bg-[#140f0c] border-[#423223]'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-[#8c7b66] uppercase tracking-wider">
                      {short}
                    </div>
                    <div className="text-xl font-bold font-mono text-[#f5ebd7] my-0.5 tabular-nums">
                      {score}
                    </div>
                    <div
                      className={`text-xs font-semibold font-mono ${
                        isHighlight ? 'text-[#ffd97d]' : 'text-[#a89880]'
                      }`}
                    >
                      {mod}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Inventory, Signature Feature, Background, Lore (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Paraphernalia & Armaments Panel */}
          <div className="p-5 rounded-xl bg-[#140f0c] border border-[#423223] space-y-3 shadow-inner">
            <h3 className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
              <Sword className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Workshop Paraphernalia & Armaments</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <div className="text-[11px] text-[#8c7b66] uppercase tracking-wide">Primary Armament</div>
                <div className="text-sm font-medium text-[#f3e5c8] mt-0.5">{character.primaryWeapon}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#8c7b66] uppercase tracking-wide">Secondary Apparatus</div>
                <div className="text-sm font-medium text-[#f3e5c8] mt-0.5">{character.secondaryItem}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#8c7b66] uppercase tracking-wide">Attired Warding</div>
                <div className="text-sm font-medium text-[#f3e5c8] mt-0.5">{character.armor}</div>
              </div>
            </div>
          </div>

          {/* Signature Transmutation / Feature */}
          <div className="p-5 rounded-xl bg-[#140f0c] border border-[#423223] space-y-2 shadow-inner">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#ffd97d] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd97d]" />
                <span>Signature Calling Feature</span>
              </h3>
              <span className="text-[11px] text-[#8c7b66] font-mono">{character.characterClass} Mystery</span>
            </div>
            <p className="text-sm text-[#d6c7ae] leading-relaxed pt-1 font-sans">
              {character.ability}
            </p>
          </div>

          {/* Origin and Distinctive Quirk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#140f0c] border border-[#423223] space-y-1.5 shadow-inner">
              <h4 className="text-xs font-semibold text-[#c4b59d] uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-[#d4af37]" />
                Lineage Origin
              </h4>
              <p className="text-sm text-[#d6c7ae] leading-relaxed">
                {character.background}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#140f0c] border border-[#423223] space-y-1.5 shadow-inner">
              <h4 className="text-xs font-semibold text-[#c4b59d] uppercase tracking-wider flex items-center gap-1.5">
                <Scroll className="w-3 h-3 text-[#d4af37]" />
                Esoteric Quirk
              </h4>
              <p className="text-sm text-[#d6c7ae] leading-relaxed">
                {character.quirk}
              </p>
            </div>
          </div>

          {/* Chronicle / Lore */}
          <div className="p-5 rounded-xl bg-[#18130f] border border-[#523e2a] space-y-2 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />
            <h4 className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
              <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Adept's Inscribed Chronicle</span>
            </h4>
            <p className="text-sm text-[#e8decb] leading-relaxed italic font-serif">
              "{character.backstory}"
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
