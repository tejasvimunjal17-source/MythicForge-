import React from 'react';
import { Character } from '../types/character';
import { BookmarkCheck, Trash2, User, Sparkles } from 'lucide-react';

interface CharacterRosterProps {
  characters: Character[];
  activeCharacterId: string;
  onSelectCharacter: (char: Character) => void;
  onToggleFavorite: (id: string) => void;
  onClearRoster: () => void;
}

export const CharacterRoster: React.FC<CharacterRosterProps> = ({
  characters,
  activeCharacterId,
  onSelectCharacter,
  onToggleFavorite,
  onClearRoster,
}) => {
  if (characters.length === 0) {
    return (
      <div className="alchemist-panel rounded-2xl p-12 text-center space-y-3">
        <User className="w-12 h-12 text-[#6e5842] mx-auto" />
        <h3 className="text-lg font-bold text-[#ffd97d] font-fantasy">Ledger Is Empty</h3>
        <p className="text-sm text-[#baa990] max-w-sm mx-auto">
          Transmute new adventurers using the "Generate Character" button to inscribe them into the workshop archives.
        </p>
      </div>
    );
  }

  return (
    <div className="alchemist-panel rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#4d3a28]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#ffd97d] font-fantasy tracking-wide">
            Adventurers' Ledger ({characters.length})
          </h2>
          <p className="text-xs text-[#baa990] mt-0.5">
            Select any previously transmuted adventurer to inspect their complete codex sheet.
          </p>
        </div>

        <button
          onClick={onClearRoster}
          className="text-xs text-[#a89880] hover:text-[#f87171] transition-colors flex items-center gap-1.5 p-2 rounded-lg hover:bg-[#201813] border border-transparent hover:border-[#523e2a] cursor-pointer"
          title="Clear ledger archives"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Ledger</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((char) => {
          const isActive = char.id === activeCharacterId;

          return (
            <div
              key={char.id}
              onClick={() => onSelectCharacter(char)}
              className={`p-4 rounded-xl border transition-all text-left cursor-pointer group relative ${
                isActive
                  ? 'bg-[#d4af37]/15 border-[#d4af37] shadow-lg ring-1 ring-[#d4af37]/40'
                  : 'bg-[#140f0c] border-[#423223] hover:border-[#8c6d3b] hover:bg-[#1a1410]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {char.portraitUrl ? (
                    <img
                      src={char.portraitUrl}
                      alt={char.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-[#6e5842] shrink-0 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#1c1510] border border-[#6e5842] flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-[#8c7b66]" />
                    </div>
                  )}

                  <div className="space-y-0.5 min-w-0 flex-1">
                    {/* Unboxed Metadata Line */}
                    <div className="text-[11px] font-semibold text-[#d4af37] flex items-center gap-1.5 truncate uppercase">
                      <span>{char.characterClass}</span>
                      <span aria-hidden="true" className="text-[#6e5842]">·</span>
                      <span className="text-[#baa990]">{char.race}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-[#f5ebd7] truncate group-hover:text-[#ffd97d] transition-colors font-fantasy">
                      {char.name}
                    </h4>

                    <p className="text-xs text-[#baa990] italic truncate font-serif">
                      "{char.title}"
                    </p>
                  </div>
                </div>

                {/* Bookmark Toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(char.id);
                  }}
                  className="p-1.5 text-[#8c7b66] hover:text-[#ffd97d] rounded-lg hover:bg-[#201813] transition-colors shrink-0 cursor-pointer"
                  title={char.isFavorite ? 'Remove bookmark' : 'Bookmark in ledger'}
                >
                  <BookmarkCheck
                    className={`w-4 h-4 ${
                      char.isFavorite ? 'text-[#ffd97d] fill-[#ffd97d]/20' : 'text-[#6e5842]'
                    }`}
                  />
                </button>
              </div>

              {/* Bottom detail snippet */}
              <div className="mt-3 pt-3 border-t border-[#4d3a28]/60 flex items-center justify-between text-xs text-[#baa990] font-mono">
                <span className="text-[#e5c07b]">Vitality: {char.hp} HP</span>
                <span className="text-[#8c7b66]">STR {char.stats.str} · INT {char.stats.int}</span>
                {isActive && (
                  <span className="text-[#ffd97d] text-[11px] font-sans font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#ffd97d]" />
                    Active
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
