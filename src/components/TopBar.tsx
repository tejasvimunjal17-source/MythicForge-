import React from 'react';
import { Volume2, VolumeX, Dice5, Download } from 'lucide-react';

interface TopBarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onQuickGenerate: () => void;
  onNavigate: (section: 'generator' | 'deck' | 'roster' | 'classes') => void;
  activeSection: 'generator' | 'deck' | 'roster' | 'classes';
  savedCount: number;
  deckCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  soundEnabled,
  onToggleSound,
  onQuickGenerate,
  onNavigate,
  activeSection,
  savedCount,
  deckCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#120e0b]/95 backdrop-blur-md border-b border-[#4d3a28] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('generator')}
          className="text-lg font-bold tracking-tight text-[#f3e5c8] hover:text-[#ffd97d] transition-colors whitespace-nowrap shrink-0 font-fantasy flex items-center gap-2 text-left cursor-pointer"
        >
          <span className="text-[#d4af37] text-xl">⚗️</span>
          Fantasy Character Generator
        </button>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#c4b59d]">
          <button
            onClick={() => onNavigate('generator')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#ffd97d] cursor-pointer ${
              activeSection === 'generator' ? 'text-[#e5c07b] font-semibold border-b-2 border-[#d4af37] pb-0.5' : ''
            }`}
          >
            Character Codex
          </button>
          <button
            onClick={() => onNavigate('deck')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#ffd97d] cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'deck' ? 'text-[#e5c07b] font-semibold border-b-2 border-[#d4af37] pb-0.5' : ''
            }`}
          >
            <span>My Deck</span>
            {deckCount > 0 && (
              <span className="text-xs bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#ffd97d] px-1.5 py-0.2 rounded-full font-mono font-bold">
                {deckCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('roster')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#ffd97d] cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'roster' ? 'text-[#e5c07b] font-semibold border-b-2 border-[#d4af37] pb-0.5' : ''
            }`}
          >
            Adventurers' Ledger
            {savedCount > 0 && (
              <span className="text-xs text-[#d4af37] font-mono">({savedCount})</span>
            )}
          </button>
          <button
            onClick={() => onNavigate('classes')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#ffd97d] cursor-pointer ${
              activeSection === 'classes' ? 'text-[#e5c07b] font-semibold border-b-2 border-[#d4af37] pb-0.5' : ''
            }`}
          >
            Compendium of Callings
          </button>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/api/download-project-zip"
            download="fantasy-character-generator.zip"
            className="p-2 text-[#9e8d77] hover:text-[#ffd97d] transition-colors rounded-lg hover:bg-[#201813] border border-transparent hover:border-[#4d3a28] cursor-pointer flex items-center gap-1.5 text-xs"
            title="Download full project source code as ZIP"
            aria-label="Export project ZIP"
          >
            <Download className="w-4 h-4 text-[#d4af37]" />
            <span className="hidden lg:inline text-[#c4b59d]">Export ZIP</span>
          </a>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute alchemical acoustics' : 'Unmute alchemical acoustics'}
            aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
            className="p-2 text-[#9e8d77] hover:text-[#e5c07b] transition-colors rounded-lg hover:bg-[#201813] border border-transparent hover:border-[#4d3a28] focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:outline-none cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#d4af37]" /> : <VolumeX className="w-4 h-4 text-[#6e5d4a]" />}
          </button>

          <button
            onClick={onQuickGenerate}
            className="px-4 py-2 text-xs font-bold alchemist-btn-primary rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#ffd97d] focus-visible:outline-none cursor-pointer"
          >
            <Dice5 className="w-3.5 h-3.5" />
            <span>Transmute</span>
          </button>
        </div>
      </div>
    </header>
  );
};
