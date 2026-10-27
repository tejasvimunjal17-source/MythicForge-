import React from 'react';
import { CharacterClass, CharacterRace } from '../types/character';
import { CHARACTER_CLASSES, CHARACTER_RACES } from '../utils/fantasyGenerator';
import { Dice5, Sparkles, Filter, Flame } from 'lucide-react';

interface GeneratorControlsProps {
  onGenerate: () => void;
  selectedClass: CharacterClass | 'ANY';
  onSelectClass: (c: CharacterClass | 'ANY') => void;
  selectedRace: CharacterRace | 'ANY';
  onSelectRace: (r: CharacterRace | 'ANY') => void;
  isGenerating?: boolean;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  onGenerate,
  selectedClass,
  onSelectClass,
  selectedRace,
  onSelectRace,
  isGenerating = false,
}) => {
  return (
    <section className="w-full alchemist-panel rounded-2xl p-5 sm:p-7 relative overflow-hidden backdrop-blur-md">
      {/* Decorative antique corner rivets */}
      <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#8c6d3b] shadow-inner" />
      <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#8c6d3b] shadow-inner" />
      <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#8c6d3b] shadow-inner" />
      <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#8c6d3b] shadow-inner" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Side: Alchemical Workshop Heading */}
        <div className="space-y-1.5 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd97d]" />
            <span>Alchemist's Transmutation Circle</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#f5ebd7] font-fantasy tracking-wide">
            Forge an Adventurer's Soul
          </h2>
          <p className="text-xs sm:text-sm text-[#c2b298] max-w-lg leading-relaxed">
            Channel celestial humors and elemental essences. Transmutes balanced tabletop attributes, distinctive lineages, gear, and quirky lore.
          </p>
        </div>

        {/* Center/Right: Dropdowns + Prominent Themed Generate Character Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Class Filter Dropdown */}
          <div className="relative w-full sm:w-auto">
            <label htmlFor="class-select" className="sr-only">Choose Class</label>
            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) => onSelectClass(e.target.value as CharacterClass | 'ANY')}
              className="w-full sm:w-44 min-h-[44px] px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-[#16120e] border border-[#6e5842] rounded-xl text-[#f3e5c8] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60 hover:border-[#8c6d3b] cursor-pointer transition-colors shadow-inner"
            >
              <option value="ANY">⚗️ Any Class</option>
              {CHARACTER_CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Race Filter Dropdown */}
          <div className="relative w-full sm:w-auto">
            <label htmlFor="race-select" className="sr-only">Choose Ancestry</label>
            <select
              id="race-select"
              value={selectedRace}
              onChange={(e) => onSelectRace(e.target.value as CharacterRace | 'ANY')}
              className="w-full sm:w-44 min-h-[44px] px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-[#16120e] border border-[#6e5842] rounded-xl text-[#f3e5c8] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60 hover:border-[#8c6d3b] cursor-pointer transition-colors shadow-inner"
            >
              <option value="ANY">📜 Any Ancestry</option>
              {CHARACTER_RACES.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>

          {/* PROMINENT "Generate Character" BUTTON (Styled for Ancient Alchemist Workshop) */}
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            id="generate-character-btn"
            className="w-full sm:w-auto min-h-[48px] px-7 py-3 text-sm sm:text-base font-bold alchemist-btn-primary rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shrink-0 active:scale-95 focus-visible:ring-4 focus-visible:ring-[#ffd97d]/50 focus-visible:outline-none cursor-pointer"
          >
            <Dice5 className={`w-5 h-5 text-[#241708] ${isGenerating ? 'animate-spin' : ''}`} />
            <span className="tracking-wide">Generate Character</span>
          </button>
        </div>
      </div>

      {/* Quick class tabs styled with warm bronze & dark leather */}
      <div className="mt-5 pt-4 border-t border-[#4d3a28]/60 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[#a89880] mr-2 flex items-center gap-1 text-[11px] uppercase tracking-wider">
          <Filter className="w-3 h-3 text-[#d4af37]" />
          Transmute Calling:
        </span>
        <button
          onClick={() => onSelectClass('ANY')}
          className={`min-h-[36px] px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
            selectedClass === 'ANY'
              ? 'bg-[#d4af37]/20 text-[#ffd97d] border border-[#d4af37]/50 shadow-sm'
              : 'text-[#baa990] hover:text-[#f3e5c8] hover:bg-[#221b16] border border-transparent'
          }`}
        >
          All
        </button>
        {CHARACTER_CLASSES.map((cls) => (
          <button
            key={cls}
            onClick={() => onSelectClass(cls)}
            className={`min-h-[36px] px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
              selectedClass === cls
                ? 'bg-[#d4af37]/20 text-[#ffd97d] border border-[#d4af37]/50 shadow-sm'
                : 'text-[#baa990] hover:text-[#f3e5c8] hover:bg-[#221b16] border border-transparent'
            }`}
          >
            {cls}
          </button>
        ))}
      </div>
    </section>
  );
};
