import React from 'react';
import { Character } from '../types/character';
import { Heart, Sparkles, Sword, Trash2, Eye, Shield, Scroll, Layers } from 'lucide-react';

interface MyDeckProps {
  deck: Character[];
  activeCharacterId: string;
  onSelectCharacter: (char: Character) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
}

export const MyDeck: React.FC<MyDeckProps> = ({
  deck,
  activeCharacterId,
  onSelectCharacter,
  onRemoveFromDeck,
  onClearDeck,
}) => {
  if (deck.length === 0) {
    return (
      <div className="alchemist-panel rounded-2xl p-10 sm:p-14 text-center space-y-4 max-w-xl mx-auto shadow-2xl">
        <div className="p-4 rounded-full bg-[#1c1510] border border-[#523e2a] w-16 h-16 mx-auto flex items-center justify-center">
          <Layers className="w-8 h-8 text-[#d4af37]" />
        </div>
        <h2 className="text-2xl font-bold text-[#ffd97d] font-fantasy tracking-wide">
          My Deck is Empty
        </h2>
        <p className="text-sm text-[#baa990] leading-relaxed">
          You haven't preserved any adventurers yet. Transmute a new character and click the <strong className="text-[#ffd97d]">"Save to Deck"</strong> button to assemble your permanent fantasy party.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header titled "My Deck" */}
      <div className="alchemist-panel rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffd97d] font-fantasy tracking-wide">
              My Deck
            </h2>
            <span className="text-xs font-mono text-[#baa990] bg-[#1a130e] border border-[#523e2a] px-2.5 py-0.5 rounded-full font-bold">
              {deck.length} {deck.length === 1 ? 'Card' : 'Cards'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#baa990] mt-1">
            Your collection of saved fantasy adventurers. Each card preserves their portrait, backstory, and combat attributes.
          </p>
        </div>

        {deck.length > 1 && (
          <button
            onClick={onClearDeck}
            className="text-xs text-[#a89880] hover:text-[#f87171] transition-colors flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1c1510] border border-[#423223] hover:border-[#f87171]/50 cursor-pointer self-start sm:self-center"
            title="Clear all cards from My Deck"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge Deck</span>
          </button>
        )}
      </div>

      {/* Grid of Character Cards in My Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deck.map((char) => {
          const isActive = char.id === activeCharacterId;

          return (
            <article
              key={char.id}
              className={`alchemist-panel rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group relative ${
                isActive
                  ? 'border-[#d4af37] ring-1 ring-[#d4af37]/40 shadow-xl'
                  : 'hover:border-[#8c6d3b] hover:shadow-xl'
              }`}
            >
              {/* Card Top: Portrait + Class + Name */}
              <div>
                <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-[#100c09] border-b border-[#523e2a]">
                  {char.portraitUrl ? (
                    <img
                      src={char.portraitUrl}
                      alt={char.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#18120e] text-[#8c7b66]">
                      <Shield className="w-12 h-12 text-[#d4af37]/40" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-transparent to-black/30 pointer-events-none" />

                  {/* Class Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg backdrop-blur-md bg-[#16110d]/90 border border-[#8c6d3b] text-[11px] font-bold text-[#ffd97d] tracking-wide uppercase shadow-md">
                    {char.characterClass}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveFromDeck(char.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md bg-[#140f0c]/80 border border-[#523e2a] text-[#8c7b66] hover:text-[#f87171] hover:bg-[#201813] transition-colors cursor-pointer"
                    title="Remove from My Deck"
                    aria-label="Remove card"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Character Name in Portrait Banner */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[11px] text-[#e5c07b] font-semibold uppercase tracking-wider">
                      {char.race} · {char.subclass}
                    </div>
                    <h3 className="text-xl font-extrabold text-[#ffd97d] font-fantasy-title truncate drop-shadow-md">
                      {char.name}
                    </h3>
                  </div>
                </div>

                {/* Primary Three Stats (Health, Mana, Strength) */}
                <div className="p-4 bg-[#140f0c] border-b border-[#423223]/80 space-y-2.5">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {/* Health Stat */}
                    <div className="p-2 rounded-xl bg-[#201412] border border-[#7f2d2d]/60 shadow-sm">
                      <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#fca5a5]">
                        <Heart className="w-3 h-3 text-[#ef4444] fill-[#ef4444]/30" />
                        <span>Health</span>
                      </div>
                      <div className="text-base font-bold font-mono text-[#fecaca] mt-0.5 tabular-nums">
                        {char.health || char.hp}
                      </div>
                    </div>

                    {/* Mana Stat */}
                    <div className="p-2 rounded-xl bg-[#121926] border border-[#2d437f]/60 shadow-sm">
                      <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#93c5fd]">
                        <Sparkles className="w-3 h-3 text-[#3b82f6]" />
                        <span>Mana</span>
                      </div>
                      <div className="text-base font-bold font-mono text-[#bfdbfe] mt-0.5 tabular-nums">
                        {char.mana}
                      </div>
                    </div>

                    {/* Strength Stat */}
                    <div className="p-2 rounded-xl bg-[#241a10] border border-[#8c6d3b]/60 shadow-sm">
                      <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#ffd97d]">
                        <Sword className="w-3 h-3 text-[#d4af37]" />
                        <span>Strength</span>
                      </div>
                      <div className="text-base font-bold font-mono text-[#fef08a] mt-0.5 tabular-nums">
                        {char.strength}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backstory Display */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#baa990] uppercase tracking-wider">
                    <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Origin Chronicle</span>
                  </div>
                  <p className="text-xs text-[#e8decb] leading-relaxed italic font-serif line-clamp-3">
                    "{char.backstory}"
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => onSelectCharacter(char)}
                  className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-[#201813] hover:bg-[#2e221b] border border-[#6e5842] hover:border-[#d4af37] text-[#ffd97d] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>View Character Codex</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
