import React, { useState } from 'react';
import { CharacterClass } from '../types/character';
import {
  Shield,
  Sparkles,
  Sword,
  Crosshair,
  Sun,
  Leaf,
  Flame,
  RotateCw,
  Maximize2,
  X
} from 'lucide-react';

interface CharacterPortraitProps {
  portraitUrl?: string;
  characterName: string;
  characterClass: CharacterClass;
  subclass: string;
  onCyclePortrait?: () => void;
  hasMultipleVariants?: boolean;
}

const CLASS_CONFIGS: Record<
  CharacterClass,
  {
    themeColor: string;
    borderColor: string;
    badgeBg: string;
    apparelDescription: string;
    icon: React.ComponentType<{ className?: string }>;
    fallbackBg: string;
    auraGlow: string;
  }
> = {
  Warrior: {
    themeColor: 'text-[#e5c07b]',
    borderColor: 'border-[#8c6d3b]/80 group-hover:border-[#d4af37]',
    badgeBg: 'bg-[#211710]/90 text-[#f3e5c8] border-[#8c6d3b]/60',
    apparelDescription: 'Forged Steel Plate & Leather Harness',
    icon: Sword,
    fallbackBg: 'from-[#2e1d13] via-[#1a120c] to-[#0c0806]',
    auraGlow: 'shadow-[0_0_25px_rgba(201,151,28,0.2)]',
  },
  Mage: {
    themeColor: 'text-[#7ec2f4]',
    borderColor: 'border-[#4a6b8c]/80 group-hover:border-[#7ec2f4]',
    badgeBg: 'bg-[#121c29]/90 text-[#dbeafe] border-[#4a6b8c]/60',
    apparelDescription: 'Sapphire Arcane Robes & Crystal Staff',
    icon: Sparkles,
    fallbackBg: 'from-[#142338] via-[#0f1724] to-[#080d14]',
    auraGlow: 'shadow-[0_0_25px_rgba(126,194,244,0.2)]',
  },
  Rogue: {
    themeColor: 'text-[#d6c7ae]',
    borderColor: 'border-[#594d3f]/80 group-hover:border-[#9c8973]',
    badgeBg: 'bg-[#181512]/90 text-[#e8decb] border-[#594d3f]/60',
    apparelDescription: 'Darkened Leather Cowl & Daggers',
    icon: Crosshair,
    fallbackBg: 'from-[#211c17] via-[#14110e] to-[#0a0806]',
    auraGlow: 'shadow-[0_0_25px_rgba(180,160,130,0.15)]',
  },
  Ranger: {
    themeColor: 'text-[#7fc48e]',
    borderColor: 'border-[#436b4d]/80 group-hover:border-[#7fc48e]',
    badgeBg: 'bg-[#122316]/90 text-[#dcfce7] border-[#436b4d]/60',
    apparelDescription: 'Forester Hooded Cloak & Yew Bow',
    icon: Crosshair,
    fallbackBg: 'from-[#162c1c] via-[#0f1d13] to-[#080f0a]',
    auraGlow: 'shadow-[0_0_25px_rgba(127,196,142,0.2)]',
  },
  Paladin: {
    themeColor: 'text-[#ffd97d]',
    borderColor: 'border-[#9e7d3b]/80 group-hover:border-[#ffd97d]',
    badgeBg: 'bg-[#291e0f]/90 text-[#fef08a] border-[#9e7d3b]/60',
    apparelDescription: 'Sanctified Gold Plate & Sun Blade',
    icon: Sun,
    fallbackBg: 'from-[#33220f] via-[#1f1509] to-[#0d0904]',
    auraGlow: 'shadow-[0_0_30px_rgba(255,217,125,0.25)]',
  },
  Druid: {
    themeColor: 'text-[#a3e635]',
    borderColor: 'border-[#557827]/80 group-hover:border-[#a3e635]',
    badgeBg: 'bg-[#19240d]/90 text-[#ecfccb] border-[#557827]/60',
    apparelDescription: 'Antler Crown & Living Leaf Mantle',
    icon: Leaf,
    fallbackBg: 'from-[#1f2e10] via-[#131d0a] to-[#0a0f05]',
    auraGlow: 'shadow-[0_0_25px_rgba(163,230,53,0.2)]',
  },
  Warlock: {
    themeColor: 'text-[#c084fc]',
    borderColor: 'border-[#6b3d91]/80 group-hover:border-[#c084fc]',
    badgeBg: 'bg-[#20102e]/90 text-[#f3e8ff] border-[#6b3d91]/60',
    apparelDescription: 'Occult Robes & Violet Arcane Flames',
    icon: Flame,
    fallbackBg: 'from-[#2d1540] via-[#1a0b26] to-[#0e0514]',
    auraGlow: 'shadow-[0_0_25px_rgba(192,132,252,0.2)]',
  },
};

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  portraitUrl,
  characterName,
  characterClass,
  subclass,
  onCyclePortrait,
  hasMultipleVariants = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);
  const config = CLASS_CONFIGS[characterClass] || CLASS_CONFIGS.Warrior;
  const Icon = config.icon;

  React.useEffect(() => {
    setImgError(false);
  }, [portraitUrl]);

  return (
    <>
      <div className="relative group w-full">
        {/* Ornate Antique Alchemist Frame with Filigree Corner Accents */}
        <div
          className={`relative w-full aspect-square rounded-2xl overflow-hidden border-2 ${config.borderColor} ${config.auraGlow} bg-[#100c09] shadow-2xl transition-all duration-300 p-1`}
        >
          {/* Inner beveled border */}
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#523e2a]/70">
            {!imgError && portraitUrl ? (
              <img
                src={portraitUrl}
                alt={`Alchemical portrait of ${characterName}, a ${characterClass} wearing ${config.apparelDescription}`}
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              /* Graceful Fallback Container */
              <div
                className={`w-full h-full bg-gradient-to-b ${config.fallbackBg} p-6 flex flex-col items-center justify-center text-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)]" />

                <div className="p-4 rounded-full bg-[#18120e] border border-[#8c6d3b]/80 shadow-lg mb-3 relative z-10">
                  <Icon className={`w-10 h-10 ${config.themeColor}`} />
                </div>

                <div className="relative z-10 space-y-1">
                  <span className="text-base font-bold font-fantasy text-[#f5ebd7] block tracking-wide">
                    {characterClass}
                  </span>
                  <span className="text-xs text-[#c2b298] block font-serif italic">
                    {config.apparelDescription}
                  </span>
                  <span className="text-[11px] text-[#d4af37] font-mono inline-flex items-center gap-1 mt-2">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    Transmuted Sigil
                  </span>
                </div>
              </div>
            )}

            {/* Antique vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a07]/90 via-[#0e0a07]/15 to-transparent pointer-events-none" />

            {/* Corner Brass Rivets */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-sm pointer-events-none" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-sm pointer-events-none" />

            {/* Top Corner: Alchemical Class Badge */}
            <div
              className={`absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-md ${config.badgeBg} text-[11px] font-semibold shadow-md`}
            >
              <Icon className={`w-3.5 h-3.5 ${config.themeColor}`} />
              <span className="tracking-wide">{characterClass}</span>
            </div>

            {/* Top Right: Expand View Button */}
            {!imgError && portraitUrl && (
              <button
                onClick={() => setShowFullModal(true)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md bg-[#16120e]/80 border border-[#6e5842] text-[#c4b59d] hover:text-[#ffd97d] hover:bg-[#201813] transition-colors cursor-pointer"
                title="Expand alchemical portrait"
                aria-label="Expand portrait"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Bottom Banner inside Portrait: Subclass & Apparel description */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2 pointer-events-none">
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#f5ebd7] font-fantasy truncate drop-shadow">
                  {subclass}
                </div>
                <div className="text-[11px] text-[#d6c7ae] font-sans truncate drop-shadow">
                  {config.apparelDescription}
                </div>
              </div>

              {/* Cycle Portrait variant button */}
              {hasMultipleVariants && onCyclePortrait && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCyclePortrait();
                  }}
                  className="pointer-events-auto min-h-[36px] px-2.5 py-1.5 rounded-lg bg-[#1f1711]/95 hover:bg-[#2d2119] border border-[#8c6d3b] text-[#f3e5c8] hover:text-[#ffd97d] transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1 text-[11px] font-medium shrink-0"
                  title="Transmute alternate portrait style"
                  aria-label="Transmute portrait style"
                >
                  <RotateCw className="w-3 h-3 text-[#d4af37]" />
                  <span className="hidden sm:inline">Style</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Subtle brass plaque caption below portrait */}
        <div className="mt-2 text-center sm:text-left text-[11px] text-[#9c8973] flex items-center justify-between px-1">
          <span className="truncate italic font-serif">Alchemist's Workshop Canvas</span>
          <span className="text-[#d4af37]/80 font-mono text-[10px]">Transmuted 1:1</span>
        </div>
      </div>

      {/* Fullscreen Portrait Modal */}
      {showFullModal && (
        <div
          className="fixed inset-0 z-50 bg-[#070504]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowFullModal(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#16120e] border-2 border-[#8c6d3b] rounded-2xl overflow-hidden shadow-2xl p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[#523e2a]">
              <img
                src={portraitUrl}
                alt={characterName}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setShowFullModal(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-[#120e0b]/80 text-[#d6c7ae] hover:text-[#ffd97d] border border-[#8c6d3b] transition-colors cursor-pointer"
                aria-label="Close portrait view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-[#120e0b] border-t border-[#4d3a28] flex items-center justify-between">
              <div>
                <h4 className="font-fantasy-title font-bold text-[#ffd97d] text-lg">{characterName}</h4>
                <p className="text-xs text-[#d4af37]">{characterClass} · {subclass}</p>
              </div>
              <span className="text-xs text-[#baa990] italic font-serif">
                {config.apparelDescription}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
