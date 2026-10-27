import React from 'react';
import { CharacterClass } from '../types/character';
import { CHARACTER_CLASSES, CLASS_PORTRAITS } from '../utils/fantasyGenerator';
import { Shield, Sparkles, Sword, Crosshair, Sun, Leaf, Flame, ArrowRight } from 'lucide-react';

interface ClassCompendiumProps {
  onSelectAndRoll: (cls: CharacterClass) => void;
}

const CLASS_DESCRIPTIONS: Record<
  CharacterClass,
  {
    role: string;
    primaryStats: string;
    hitDie: string;
    summary: string;
    archetypes: string[];
    icon: React.ReactNode;
  }
> = {
  Warrior: {
    role: 'Frontline Combat Specialist',
    primaryStats: 'Strength & Constitution',
    hitDie: 'd10',
    summary: 'Master of arms and armor, conditioned to withstand heavy assaults and deliver lethal martial force with disciplined technique.',
    archetypes: ['Battle Master', 'Berserker', 'Echo Knight', 'Rune Knight'],
    icon: <Sword className="w-5 h-5 text-[#d4af37]" />,
  },
  Mage: {
    role: 'Master of the Arcane Weave',
    primaryStats: 'Intelligence & Wisdom',
    hitDie: 'd6',
    summary: 'A scholar of ancient incantations and cosmological mysteries, manipulating reality, fire, ice, and time itself.',
    archetypes: ['Evocation', 'Abjuration', 'Chronurgy', 'Divination'],
    icon: <Sparkles className="w-5 h-5 text-[#7ec2f4]" />,
  },
  Rogue: {
    role: 'Infiltrator & Cunning Duelist',
    primaryStats: 'Dexterity & Charisma',
    hitDie: 'd8',
    summary: 'A specialist in stealth, lockpicking, and pinpoint lethal strikes from unseen shadows before opponents realize the threat.',
    archetypes: ['Assassin', 'Arcane Trickster', 'Phantom', 'Swashbuckler'],
    icon: <Crosshair className="w-5 h-5 text-[#baa990]" />,
  },
  Ranger: {
    role: 'Wilderness Scout & Sharpshooter',
    primaryStats: 'Dexterity & Wisdom',
    hitDie: 'd10',
    summary: 'At home in primordial forests and trackless frontiers, combining deadly archery with deep survival knowledge.',
    archetypes: ['Gloom Stalker', 'Horizon Walker', 'Beast Master', 'Fey Wanderer'],
    icon: <Crosshair className="w-5 h-5 text-[#7fc48e]" />,
  },
  Paladin: {
    role: 'Holy Champion & Protector',
    primaryStats: 'Strength & Charisma',
    hitDie: 'd10',
    summary: 'Bound by a sacred martial oath, channeling radiant solar energy into crushing strikes while shielding comrades.',
    archetypes: ['Oath of Devotion', 'Ancients', 'Vengeance', 'Conquest'],
    icon: <Sun className="w-5 h-5 text-[#ffd97d]" />,
  },
  Druid: {
    role: 'Keeper of Primal Forces',
    primaryStats: 'Wisdom & Constitution',
    hitDie: 'd8',
    summary: 'Embodying the fury and resilience of nature, shifting into fearsome beasts and summoning storms from the heavens.',
    archetypes: ['Circle of Moon', 'Shepherd', 'Stars', 'Spores'],
    icon: <Leaf className="w-5 h-5 text-[#a3e635]" />,
  },
  Warlock: {
    role: 'Bargainer with Cosmic Patrons',
    primaryStats: 'Charisma & Constitution',
    hitDie: 'd8',
    summary: 'Bound by pacts to ancient otherworldly beings, wielding crackling eldritch blasts and dark occult knowledge.',
    archetypes: ['The Fiend', 'Great Old One', 'Archfey', 'Hexblade'],
    icon: <Flame className="w-5 h-5 text-[#c084fc]" />,
  },
};

export const ClassCompendium: React.FC<ClassCompendiumProps> = ({ onSelectAndRoll }) => {
  return (
    <div className="alchemist-panel rounded-2xl p-6 sm:p-8 space-y-8">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-[#ffd97d] font-fantasy tracking-wide">
          Compendium of Callings
        </h2>
        <p className="text-sm text-[#baa990] mt-1">
          Explore the seven core martial and arcane callings documented in the ancient codices. Select any calling to transmute an adventurer of that discipline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHARACTER_CLASSES.map((cls) => {
          const detail = CLASS_DESCRIPTIONS[cls];
          const portrait = CLASS_PORTRAITS[cls];

          return (
            <div
              key={cls}
              className="bg-[#140f0c] border border-[#423223] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#8c6d3b] hover:shadow-lg transition-all group"
            >
              <div className="relative h-44 overflow-hidden border-b border-[#423223]">
                <img
                  src={portrait}
                  alt={cls}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-[#140f0c]/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#1a130e]/90 border border-[#6e5842] backdrop-blur-sm shadow-md">
                      {detail.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#f5ebd7] font-fantasy">
                      {cls}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#ffd97d] font-bold">
                    {detail.hitDie} HP
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Clean unboxed metadata */}
                  <div className="text-xs text-[#baa990] flex flex-wrap items-center gap-2">
                    <span className="text-[#e5c07b] font-semibold">{detail.role}</span>
                    <span aria-hidden="true" className="text-[#6e5842]">/</span>
                    <span>{detail.primaryStats}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#d6c7ae] leading-relaxed">
                    {detail.summary}
                  </p>

                  <div className="text-xs text-[#8c7b66]">
                    <span className="font-semibold text-[#baa990]">Archetypes: </span>
                    {detail.archetypes.join(', ')}
                  </div>
                </div>

                <button
                  onClick={() => onSelectAndRoll(cls)}
                  className="w-full mt-2 min-h-[44px] py-2.5 px-4 rounded-xl bg-[#201813] border border-[#6e5842] hover:border-[#d4af37] text-[#f3e5c8] hover:text-[#ffd97d] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group-hover:bg-[#d4af37]/15"
                >
                  <span>Transmute a {cls}</span>
                  <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
