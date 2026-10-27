import React from 'react';
import { Character } from '../types/character';
import { Heart, Sparkles, Sword, Trash2, Eye, Shield, Scroll, Layers } from 'lucide-react';

interface MyDeckProps {
  deck: Character[];
  activeCharacterId?: string;
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
  return (
    <section id="my-deck-section" aria-label="My Deck" className="space-y-6">
      {/* Header titled "My Deck" */}
      <div className="alchemist-panel rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#211710] border border-[#d4af37]/40 text-[#ffd97d]">
              <Layers className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffd97d] font-fantasy tracking-wide">
              My Deck
            </h2>
            <span
              id="deck-card-count"
              className="text-xs font-mono text-[#baa990] bg-[#1a130e] border border-[#523e2a] px-2.5 py-1 rounded-full font-bold ml-1"
            >
              {deck.length} {deck.length === 1 ? 'Card' : 'Cards'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#baa990] mt-1.5 max-w-2xl leading-relaxed">
            Your collection of saved fantasy adventurers. Each card preserves their portrait, backstory, and combat attributes (Health, Mana, and Strength).
          </p>
        </div>

        {deck.length > 1 && (
          <button
            onClick={onClearDeck}
            className="min-h-[44px] text-xs text-[#a89880] hover:text-[#f87171] transition-colors flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1c1510] border border-[#423223] hover:border-[#f87171]/50 cursor-pointer self-start sm:self-center"
            title="Clear all cards from My Deck"
            aria-label="Clear all cards from My Deck"
          >
            <Trash2 className="w-4 h-4" />
            <span>Purge Deck</span>
          </button>
        )}
      </div>

      {/* When Deck is Empty */}
      {deck.length === 0 ? (
        <div className="alchemist-panel rounded-2xl p-10 sm:p-14 text-center space-y-4 max-w-xl mx-auto shadow-2xl">
          <div className="p-4 rounded-full bg-[#1c1510] border border-[#523e2a] w-16 h-16 mx-auto flex items-center justify-center">
            <Layers className="w-8 h-8 text-[#d4af37]/60" />
          </div>
          <h3 className="text-xl font-bold text-[#ffd97d] font-fantasy tracking-wide">
            My Deck is Empty
          </h3>
          <p className="text-xs sm:text-sm text-[#baa990] leading-relaxed">
            You haven't saved any adventurers to your deck yet. Generate an adventurer and click the{' '}
            <strong className="text-[#ffd97d]">"Save to Deck"</strong> button to preserve them here.
          </p>
        </div>
      ) : (
        /* Grid of Character Cards in My Deck */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deck.map((char) => {
            const isActive = char.id === activeCharacterId;
            const healthVal = char.health ?? char.hp ?? 100;
            const manaVal = char.mana ?? 50;
            const strengthVal = char.strength ?? 50;

            return (
              <article
                key={char.id}
                data-testid="deck-card"
                data-character-name={char.name}
                data-character-class={char.characterClass}
                data-character-health={healthVal}
                data-character-mana={manaVal}
                data-character-strength={strengthVal}
                className={`alchemist-panel rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group relative ${
                  isActive
                    ? 'border-[#d4af37] ring-1 ring-[#d4af37]/50 shadow-2xl'
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

                    <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-transparent to-black/40 pointer-events-none" />

                    {/* Class Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg backdrop-blur-md bg-[#16110d]/90 border border-[#8c6d3b] text-[11px] font-bold text-[#ffd97d] tracking-wide uppercase shadow-md flex items-center gap-1">
                      <span>{char.characterClass}</span>
                    </div>

                    {/* Remove from Deck Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromDeck(char.id);
                      }}
                      className="min-h-[44px] min-w-[44px] absolute top-2 right-2 p-2 rounded-xl backdrop-blur-md bg-[#140f0c]/80 border border-[#523e2a] text-[#8c7b66] hover:text-[#f87171] hover:bg-[#201813] transition-colors cursor-pointer flex items-center justify-center active:scale-90"
                      title={`Remove ${char.name} from My Deck`}
                      aria-label={`Remove ${char.name} from My Deck`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Character Name in Portrait Banner */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-[11px] text-[#e5c07b] font-semibold uppercase tracking-wider">
                        {char.race} · {char.subclass}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#ffd97d] font-fantasy-title truncate drop-shadow-md">
                        {char.name}
                      </h3>
                    </div>
                  </div>

                  {/* Primary Three Stats (Health, Mana, Strength) with Badges & Stat Bars */}
                  <div className="p-4 bg-[#140f0c] border-b border-[#423223]/80 space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {/* Health Stat */}
                      <div className="p-2.5 rounded-xl bg-[#201412] border border-[#7f2d2d]/60 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#fca5a5]">
                          <Heart className="w-3 h-3 text-[#ef4444] fill-[#ef4444]/30" />
                          <span>Health</span>
                        </div>
                        <div className="text-base font-bold font-mono text-[#fecaca] mt-1 tabular-nums">
                          {healthVal} <span className="text-[9px] text-[#f87171]/70">HP</span>
                        </div>
                        <div className="w-full bg-[#2a1715] h-1.5 rounded-full overflow-hidden border border-[#5c1d1d]/50 mt-1.5">
                          <div
                            className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] h-full rounded-full"
                            style={{ width: `${Math.min(100, Math.max(15, (healthVal / 150) * 100))}%` }}
                          />
                        </div>
                      </div>

                      {/* Mana Stat */}
                      <div className="p-2.5 rounded-xl bg-[#121926] border border-[#2d437f]/60 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#93c5fd]">
                          <Sparkles className="w-3 h-3 text-[#3b82f6]" />
                          <span>Mana</span>
                        </div>
                        <div className="text-base font-bold font-mono text-[#bfdbfe] mt-1 tabular-nums">
                          {manaVal} <span className="text-[9px] text-[#60a5fa]/70">MP</span>
                        </div>
                        <div className="w-full bg-[#121c2d] h-1.5 rounded-full overflow-hidden border border-[#1e3a8a]/50 mt-1.5">
                          <div
                            className="bg-gradient-to-r from-[#2563eb] to-[#38bdf8] h-full rounded-full"
                            style={{ width: `${Math.min(100, Math.max(15, (manaVal / 170) * 100))}%` }}
                          />
                        </div>
                      </div>

                      {/* Strength Stat */}
                      <div className="p-2.5 rounded-xl bg-[#241a10] border border-[#8c6d3b]/60 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#ffd97d]">
                          <Sword className="w-3 h-3 text-[#d4af37]" />
                          <span>Strength</span>
                        </div>
                        <div className="text-base font-bold font-mono text-[#fef08a] mt-1 tabular-nums">
                          {strengthVal} <span className="text-[9px] text-[#eab308]/70">STR</span>
                        </div>
                        <div className="w-full bg-[#2a1d10] h-1.5 rounded-full overflow-hidden border border-[#6e5842]/50 mt-1.5">
                          <div
                            className="bg-gradient-to-r from-[#d97706] to-[#f59e0b] h-full rounded-full"
                            style={{ width: `${Math.min(100, Math.max(15, (strengthVal / 100) * 100))}%` }}
                          />
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
                    <p className="text-xs text-[#e8decb] leading-relaxed italic font-serif line-clamp-4">
                      "{char.backstory}"
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onSelectCharacter(char)}
                    className="w-full min-h-[44px] py-2.5 px-3 rounded-xl bg-[#201813] hover:bg-[#2e221b] border border-[#6e5842] hover:border-[#d4af37] text-[#ffd97d] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    title={`View ${char.name} full details in Character Codex`}
                  >
                    <Eye className="w-4 h-4 text-[#d4af37]" />
                    <span>View Character Codex</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
