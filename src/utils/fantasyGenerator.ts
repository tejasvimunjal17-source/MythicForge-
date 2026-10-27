import { Character, CharacterAlignment, CharacterClass, CharacterRace, CharacterStats } from '../types/character';

const WARRIOR_PORTRAITS = [
  '/src/assets/images/char_warrior_1792920594954.jpg',
  '/src/assets/images/char_warrior_2_1792920968949.jpg',
];
const MAGE_PORTRAITS = [
  '/src/assets/images/char_mage_1792920596214.jpg',
  '/src/assets/images/char_mage_2_1792920969793.jpg',
];
const ROGUE_PORTRAITS = [
  '/src/assets/images/char_rogue_1792920597120.jpg',
  '/src/assets/images/char_rogue_2_1792920968911.jpg',
];
const PALADIN_PORTRAITS = [
  '/src/assets/images/char_paladin_1792920596826.jpg',
  '/src/assets/images/char_paladin_2_1792920969340.jpg',
];
const RANGER_PORTRAITS = [
  '/src/assets/images/char_ranger_1792920942016.jpg',
];
const DRUID_PORTRAITS = [
  '/src/assets/images/char_druid_1792920942306.jpg',
];
const WARLOCK_PORTRAITS = [
  '/src/assets/images/char_warlock_1792920942363.jpg',
];

export const CLASS_PORTRAIT_LISTS: Record<CharacterClass, string[]> = {
  Warrior: WARRIOR_PORTRAITS,
  Mage: MAGE_PORTRAITS,
  Rogue: ROGUE_PORTRAITS,
  Paladin: PALADIN_PORTRAITS,
  Ranger: RANGER_PORTRAITS,
  Druid: DRUID_PORTRAITS,
  Warlock: WARLOCK_PORTRAITS,
};

export const CLASS_PORTRAITS: Record<CharacterClass, string> = {
  Warrior: WARRIOR_PORTRAITS[0],
  Mage: MAGE_PORTRAITS[0],
  Rogue: ROGUE_PORTRAITS[0],
  Paladin: PALADIN_PORTRAITS[0],
  Ranger: RANGER_PORTRAITS[0],
  Druid: DRUID_PORTRAITS[0],
  Warlock: WARLOCK_PORTRAITS[0],
};

export const CHARACTER_CLASSES: CharacterClass[] = [
  'Warrior',
  'Mage',
  'Rogue',
  'Ranger',
  'Paladin',
  'Druid',
  'Warlock',
];

export const CHARACTER_RACES: CharacterRace[] = [
  'Human',
  'High Elf',
  'Wood Elf',
  'Mountain Dwarf',
  'Shield Dwarf',
  'Tiefling',
  'Dragonborn',
  'Halfling',
  'Half-Orc',
  'Gnome',
];

export const ALIGNMENTS: CharacterAlignment[] = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil',
];

const FIRST_NAMES: Record<string, string[]> = {
  Elf: ['Aeloria', 'Caelynn', 'Faelar', 'Ilpholin', 'Liari', 'Sylas', 'Thaeron', 'Varis', 'Zephyr', 'Xiloscient', 'Aerith', 'Elysia'],
  Dwarf: ['Brandur', 'Dain', 'Dwalin', 'Grimgor', 'Harek', 'Morgran', 'Thorgrim', 'Thordak', 'Vondal', 'Helga', 'Brakor', 'Krag'],
  Human: ['Alden', 'Cassian', 'Cedric', 'Evelyn', 'Gareth', 'Julian', 'Lucian', 'Roderick', 'Valerie', 'Katherine', 'Rowan', 'Arthur'],
  Tiefling: ['Akmenos', 'Damakos', 'Ekemon', 'Kallista', 'Lerissa', 'Makaria', 'Orianna', 'Therai', 'Kallias', 'Mephist'],
  Dragonborn: ['Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan', 'Kriv', 'Medrash', 'Nadarr', 'Rhogar'],
  Halfling: ['Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Kellan', 'Lindal', 'Lyle', 'Merric', 'Milo', 'Bree', 'Seraphina'],
  Orc: ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krag', 'Ront', 'Shump', 'Thokk', 'Varg'],
  Gnome: ['Boddynock', 'Dimble', 'Fonkin', 'Gimble', 'Glib', 'Kellen', 'Namfoodle', 'Orryn', 'Roondar', 'Warryn'],
};

const SURNAMES = [
  'Ironbreaker', 'Sunstrider', 'Stormforge', 'Ravenshade', 'Moonwhisper',
  'Deepdelver', 'Emberfall', 'Highpeak', 'Wintermere', 'Swiftblade',
  'Shadowborn', 'Dawnseeker', 'Frostgale', 'Runehand', 'Silverleaf',
  'Brightwood', 'Ashguard', 'Starfall', 'Duskwalker', 'Stoneheart',
  'Oakenheart', 'Goldweaver', 'Nightbreeze', 'Blackthorne', 'Gravewarden',
];

const TITLES: Record<CharacterClass, string[]> = {
  Warrior: ['The Iron Vanguard', 'Shield of the North', 'The Unbroken', 'Blade of the Fallen', 'The Victorious', 'of the Crimson Crest'],
  Mage: ['The Spellweaver', 'Seeker of the Astral Rift', 'Master of Cinders', 'The Starlit Oracle', 'Weaver of Arcana', 'The Riftcaller'],
  Rogue: ['The Whisper in the Mist', 'The Shadowdancer', 'Ghost of the Alley', 'The Silent Coin', 'Dagger in the Dark', 'of the Obsidian Hand'],
  Ranger: ['Warden of the Deep Canopy', 'The Ghost Stalker', 'Pathfinder of the Wilds', 'The Horizon Watcher', 'of the Silver Woods', 'Hawk-Eye'],
  Paladin: ['The Dawnbearer', 'The Sun-Forged Aegis', 'Champion of the Sacred Oath', 'The Righteous Flame', 'Shield of the Innocent', 'Oathkeeper'],
  Druid: ['Keeper of Ancient Groves', 'Voice of the Primordial Earth', 'The Wild-Touched', 'Guardian of Old Roots', 'Speaker with Beasts', 'The Moon-Watcher'],
  Warlock: ['Harbinger of the Void', 'Bargainer with the Deep', 'Bound to the Stygian Pact', 'Bearer of the Eldritch Eye', 'Wielder of Forbidden Truths', 'Soul-Tethered'],
};

const CLASS_DETAILS: Record<
  CharacterClass,
  {
    subclasses: string[];
    weapons: string[];
    secondaryItems: string[];
    armors: string[];
    abilities: string[];
    primaryStats: (keyof CharacterStats)[];
    hitDice: number;
  }
> = {
  Warrior: {
    subclasses: ['Battle Master', 'Berserker Champion', 'Echo Knight', 'Eldritch Knight', 'Rune Knight'],
    weapons: ['Runed Greatsword', 'Forged Battleaxe & Heavy Heater Shield', 'Gilded Halberd', 'Twin Steel Scimitars', 'Spiked Morningstar'],
    secondaryItems: ['Whetstone of Sharpness', 'Horn of Battle Valhalla', 'Engraved Steel Flask', 'Iron Grappling Hook'],
    armors: ['Full Plate Armor with Lion Pauldrons', 'Reinforced Scale Mail', 'Splint Mail with Chain Hauberk', 'Hardened Cuirass'],
    abilities: ['Action Surge: Strike twice in a devastating sequence of lethal blows.', 'Second Wind: Channel stoic grit to heal wounds amidst the clash of steel.', 'Indomitable: Shake off debilitating enchantments and mental fatigue.'],
    primaryStats: ['str', 'con'],
    hitDice: 10,
  },
  Mage: {
    subclasses: ['Evocation Pyromancer', 'Abjuration Warder', 'Chronurgy Time-Shifter', 'Divination Seer', 'Necromantic Scholar'],
    weapons: ['Quarterstaff of Astral Sapphire', 'Rune-Carved Obsidian Wand', 'Crystalline Spell Focus', 'Silvered Ritual Athame'],
    secondaryItems: ['Ancient Leather Grimoire', 'Pouch of Arcane Salts', 'Hourglass of Suspended Sands', 'Scrying Orb of Mist'],
    armors: ['Embroidered Silk Vestments of Warding', 'Runed Archmage Robes', 'Midnight Velvet Mantle', 'Layered Scholars Shroud'],
    abilities: ['Arcane Rupture: Unleash a vortex of prismatic force upon adversaries.', 'Spell Warding: Manifest a translucent sphere that deflects kinetic projectiles.', 'Mana Surge: Tap into ley line resonance to empower subsequent incantations.'],
    primaryStats: ['int', 'wis'],
    hitDice: 6,
  },
  Rogue: {
    subclasses: ['Shadow Assassin', 'Arcane Trickster', 'Phantom Stalker', 'Swashbuckler Duelist', 'Master Inquisitive'],
    weapons: ['Twin Venom-Coated Stilettos', 'Concealed Hand Crossbow with Barbed Bolts', 'Silver Serrated Rapier', 'Throwing Knives in Leather Bands'],
    secondaryItems: ['Masterwork Thieves Tools', 'Smoke Pellet Bandolier', 'Silk Climbing Cord', 'False Noble Signet Ring'],
    armors: ['Supple Midnight Leather Cuirass', 'Studded Shadow-Weave Gambeson', 'Reinforced Duelists Jerkin', 'Muffled Padded Tunic'],
    abilities: ['Sneak Attack: Exploit enemy blindspots for devastating critical strikes.', 'Cunning Action: Dash, disengage, or meld into the nearest shadow instantly.', 'Uncanny Dodge: Twist away from incoming strikes to halve lethal trauma.'],
    primaryStats: ['dex', 'cha'],
    hitDice: 8,
  },
  Ranger: {
    subclasses: ['Gloom Stalker', 'Horizon Walker', 'Beast Master of Dire Wolves', 'Hunter of Ancient Colossi', 'Fey Wanderer'],
    weapons: ['Composite Yew Longbow', 'Twin Dragon-Tooth Hunting Knives', 'Barbed Harpoon & Shortsword', 'Recurve Scout Bow'],
    secondaryItems: ['Quiver of Endless Thorns', 'Herbalist Field Salve Kit', 'Falconry Gauntlet', 'Tracking Compass of Wayfinding'],
    armors: ['Camouflaged Foresters Brigandine', 'Tanned Elk-Hide Armor', 'Reinforced Studded Leather', 'Feather-Lined Scout Mantle'],
    abilities: ['Primeval Awareness: Sense otherworldly aberrations and beasts across miles.', 'Hunters Quarry: Mark an adversary to inflict compounded piercing wounds.', 'Vanish: Blend seamlessly into dense undergrowth and natural terrain.'],
    primaryStats: ['dex', 'wis'],
    hitDice: 10,
  },
  Paladin: {
    subclasses: ['Oath of Devotion', 'Oath of the Ancients', 'Oath of Vengeance', 'Oath of Redemption', 'Oath of Conquest'],
    weapons: ['Consecrated Sun-Sword', 'Blessed Warhammer of Justice', 'Silver Greatsword of Retribution', 'Morningstar of Dawn'],
    secondaryItems: ['Holy Reliquary of the First Light', 'Censer of Purifying Incense', 'Engraved Silver Prayer Beads', 'Shield of the Radiant Sun'],
    armors: ['Gleaming Sun-Gold Embellished Plate', 'Sanctified Steel Field Plate', 'Ornate Heavy Carapace', 'Blessed Tabard over Chainmail'],
    abilities: ['Divine Smite: Channel celestial radiant fury into standard weapon impacts.', 'Lay on Hands: Bestow divine grace that purifies poisons and seals mortal wounds.', 'Aura of Protection: Emanate an indomitable halo bolstering companion fortitude.'],
    primaryStats: ['str', 'cha'],
    hitDice: 10,
  },
  Druid: {
    subclasses: ['Circle of the Moon', 'Circle of the Shepherd', 'Circle of Spores', 'Circle of Stars', 'Circle of the Land'],
    weapons: ['Ironwood Club with Amber Inlay', 'Thorned Yew Staff', 'Scythe of the Harvest Moon', 'Obsidian Ritual Sickle'],
    secondaryItems: ['Pouch of Rare Fey Acorns', 'Sprig of Never-Wilting Mistletoe', 'Bone Totem of the Great Bear', 'Barkcloth Herb Pouch'],
    armors: ['Carved Ankheg Chitin Breastplate', 'Woven Bramble & Leaf Hauberk', 'Tanned Bear-Hide Mantle', 'Hardened Willow Bark Armor'],
    abilities: ['Wild Shape: Metamorphose into formidable beasts of land, sea, and sky.', 'Call Lightning: Summon crackling stormclouds that strike down foes on command.', 'Barkskin: Harden flesh into ancient ironwood impenetrable by blades.'],
    primaryStats: ['wis', 'con'],
    hitDice: 8,
  },
  Warlock: {
    subclasses: ['The Fiend Patron', 'The Great Old One', 'The Archfey Court', 'The Hexblade Curse', 'The Celestial Flame'],
    weapons: ['Cursed Glaive of the Abyss', 'Dagger Forged from Stygian Iron', 'Elder Bone Staff', 'Spectral Pact-Blade'],
    secondaryItems: ['Whispering Tome of Shadows', 'Preserved Eye of an Unknown Deity', 'Vial of Blackened Blood', 'Silver Chain of Binding'],
    armors: ['Runed Abyssal Leather Jerkin', 'Void-Dyed Velvet Coat', 'Chitinous Rib-Cage Vest', 'Shadow-Touched Robes'],
    abilities: ['Eldritch Blast: Cast beams of crackling crackling cosmic energy that shatter stone.', 'Dark Ones Blessing: Absorb the fading life force of defeated foes as shielding.', 'Agonizing Invocation: Weave profound dread into every uttered incantation.'],
    primaryStats: ['cha', 'con'],
    hitDice: 8,
  },
};

const BACKGROUNDS = [
  'Exiled Royal Scion seeking to reclaim an usurped ancestral throne',
  'Former Guild Smuggler who stumbled onto a forbidden imperial conspiracy',
  'Scholar of Forgotten Vaults who decrypted a prophesied cataclysm',
  'Sole survivor of a mountain frontier garrison overrun by shadows',
  'Temple Knight turned questioning wanderer following divine silence',
  'Wilderness Hermit mentored by an ancient forest spirit',
  'Street urchin who stole an enchanted artifact from a high magistrate',
  'Gladiator champion who bought their freedom with bloody grit',
  'Alchemical apprentice whose experimental disaster awakened strange talents',
  'Bounty tracker sworn to avenge an oath sworn across blood and iron',
];

const QUIRKS = [
  'Carries an ornate brass pocket watch that mysteriously ticks backwards.',
  'Always flips a silver coin before making any high-stakes moral decision.',
  'Refuses to enter ancient ruins without first scattering dried lavender at the threshold.',
  'Speaks quietly to weapon or arcane focus as if it possessed a living soul.',
  'Collects polished stones from every battlefield and tavern visited.',
  'Never sits with back to an open doorway or dark archway.',
  'Has a subtle glowing mark on forearm that pulses when celestial alignments shift.',
  'Can accurately predict heavy thunderstorms hours before the first dark clouds arrive.',
  'Possesses a meticulous journal filled with anatomical sketches of mythical beasts.',
  'Involuntarily hums solemn folk lullabies whenever tension grows thick.',
];

// Rolls 4d6 and drops the lowest value (authentic tabletop RPG stat rolling)
function rollStat(): number {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
}

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function generateCharacter(options?: {
  forcedClass?: CharacterClass;
  forcedRace?: CharacterRace;
}): Character {
  const characterClass = options?.forcedClass || getRandomItem(CHARACTER_CLASSES);
  const race = options?.forcedRace || getRandomItem(CHARACTER_RACES);
  const alignment = getRandomItem(ALIGNMENTS);

  // Pick appropriate first name category
  let nameCategory = 'Human';
  if (race.includes('Elf')) nameCategory = 'Elf';
  else if (race.includes('Dwarf')) nameCategory = 'Dwarf';
  else if (race.includes('Tiefling')) nameCategory = 'Tiefling';
  else if (race.includes('Dragonborn')) nameCategory = 'Dragonborn';
  else if (race.includes('Halfling')) nameCategory = 'Halfling';
  else if (race.includes('Half-Orc')) nameCategory = 'Orc';
  else if (race.includes('Gnome')) nameCategory = 'Gnome';

  const firstName = getRandomItem(FIRST_NAMES[nameCategory] || FIRST_NAMES.Human);
  const surname = getRandomItem(SURNAMES);
  const fullName = `${firstName} ${surname}`;
  const title = getRandomItem(TITLES[characterClass]);

  const classDetail = CLASS_DETAILS[characterClass];
  const subclass = getRandomItem(classDetail.subclasses);
  const primaryWeapon = getRandomItem(classDetail.weapons);
  const secondaryItem = getRandomItem(classDetail.secondaryItems);
  const armor = getRandomItem(classDetail.armors);
  const ability = getRandomItem(classDetail.abilities);
  const background = getRandomItem(BACKGROUNDS);
  const quirk = getRandomItem(QUIRKS);

  // Roll stats and ensure primary stats get the best rolls
  const rawRolls = [rollStat(), rollStat(), rollStat(), rollStat(), rollStat(), rollStat()];
  rawRolls.sort((a, b) => b - a); // descending order

  // Ensure primary stats for class receive top rolls
  const stats: CharacterStats = {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
  };

  const statKeys: (keyof CharacterStats)[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const assigned = new Set<keyof CharacterStats>();

  // Assign best rolls to primary stats
  classDetail.primaryStats.forEach((pStat, idx) => {
    stats[pStat] = rawRolls[idx];
    assigned.add(pStat);
  });

  // Assign remaining rolls
  let rollIdx = classDetail.primaryStats.length;
  statKeys.forEach((key) => {
    if (!assigned.has(key)) {
      stats[key] = rawRolls[rollIdx] || 10;
      rollIdx++;
    }
  });

const CLASS_STAT_RANGES: Record<
  CharacterClass,
  { hp: [number, number]; mp: [number, number]; str: [number, number] }
> = {
  Warrior: { hp: [110, 145], mp: [25, 45], str: [75, 96] },
  Mage: { hp: [55, 80], mp: [125, 165], str: [25, 48] },
  Rogue: { hp: [75, 100], mp: [40, 70], str: [52, 76] },
  Ranger: { hp: [85, 115], mp: [50, 80], str: [60, 82] },
  Paladin: { hp: [100, 135], mp: [65, 95], str: [70, 92] },
  Druid: { hp: [80, 110], mp: [90, 130], str: [45, 68] },
  Warlock: { hp: [65, 90], mp: [110, 150], str: [35, 58] },
};

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  const statRanges = CLASS_STAT_RANGES[characterClass] || { hp: [80, 120], mp: [50, 100], str: [50, 80] };
  const health = getRandomInt(statRanges.hp[0], statRanges.hp[1]);
  const mana = getRandomInt(statRanges.mp[0], statRanges.mp[1]);
  const strength = getRandomInt(statRanges.str[0], statRanges.str[1]);

  const backstory = `${fullName}, hailed as "${title}", is a ${race} ${subclass} ${characterClass}. Originating as a ${background.toLowerCase()}, ${firstName} now journeys across the perilous realms armed with a ${primaryWeapon.toLowerCase()} and clad in ${armor.toLowerCase()}. Companions note that ${firstName} ${quirk.toLowerCase()}`;

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    name: fullName,
    title,
    characterClass,
    subclass,
    race,
    alignment,
    level: 1,
    hp: health,
    health,
    mana,
    strength,
    stats,
    primaryWeapon,
    secondaryItem,
    armor,
    background,
    quirk,
    ability,
    backstory,
    portraitUrl: getRandomItem(CLASS_PORTRAIT_LISTS[characterClass]) || CLASS_PORTRAITS[characterClass],
    createdAt: Date.now(),
    isFavorite: false,
  };
}

export function getNextPortrait(currentUrl: string | undefined, characterClass: CharacterClass): string {
  const list = CLASS_PORTRAIT_LISTS[characterClass] || [CLASS_PORTRAITS[characterClass]];
  if (!currentUrl) return list[0];
  const currentIndex = list.indexOf(currentUrl);
  if (currentIndex === -1) return list[0];
  return list[(currentIndex + 1) % list.length];
}

export function getStatModifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function generateLocalBackstory(char: Character): string {
  const { name, characterClass, subclass, race, primaryWeapon } = char;
  const weapon = primaryWeapon.toLowerCase();

  const storiesByClass: Record<CharacterClass, string[]> = {
    Warrior: [
      `After defending the High Gate of Oakhaven during the Great Incursion with only a ${weapon} and unyielding grit, ${name} earned the quiet respect of frontline veterans. Now wandering the realm as a seasoned ${subclass} ${characterClass}, they sell their steel only to those whose cause bears genuine honor.`,
      `Banished from their ancestral frontier garrison after refusing a cruel commander's order, ${name} took to the road with scarred armor and a heavy heart. Today, this resolute ${characterClass} fights to safeguard isolated hamlets before corrupt warlords can lay siege.`,
      `Carrying the battered ${weapon} of their fallen mentor, ${name} survived three brutal border campaigns through relentless discipline. Now roaming as a formidable ${characterClass}, they seek to reclaim an ancient family honor buried beneath fallen fortresses.`,
      `Forged in the blood and ash of border sieges, ${name} learned early that shields break and armor bends, but true martial will never falters. This scarred ${characterClass} wanders the dangerous trade roads, determined to ensure no innocent village suffers the tragedies of their youth.`
    ],
    Mage: [
      `During a clandestine midnight solstice in the Astral Spire, ${name} deciphered a forbidden celestial parchment that illuminated their eyes with raw arcana. Now wielding a ${weapon}, this inquisitive ${subclass} ${characterClass} seeks ancient planar rifts while outmaneuvering inquisitors who fear what was discovered.`,
      `Born beneath a rare double eclipse, ${name} could hear the humming ley lines long before speaking their first mortal incantation. Accompanied by arcane familiars and endless curiosity, this ${characterClass} journeys to unseal forgotten vaults before darker hands can claim their relics.`,
      `After an unstable experiment consumed their mentor's tower, ${name} salvaged only an enchanted grimoire and a ${weapon}. Channeling volatile spellcraft, this scholarly ${characterClass} travels perilous ruins seeking the cipher to reverse their greatest magical mishap.`,
      `Trained within the reclusive Order of the Silver Sigil, ${name} mastered intricate cosmological equations that bend heat, frost, and gravity. Now a free-roaming ${characterClass}, they unravel mystical anomalies and banish eldritch incursions across the kingdoms.`
    ],
    Rogue: [
      `Once the most phantom-footed infiltrator in the Whispering Syndicate, ${name} uncovered a lethal conspiracy hidden within the magistrate's private vaults. Slipping away into the night with dual daggers and a ${weapon}, this ${subclass} ${characterClass} now balances old debts while staying three paces ahead of bounty hunters.`,
      `Orphaned in the maze-like alleys of the Lower Catacombs, ${name} mastered lockcraft and shadowmeld before other youths learned a trade. Armed with quick wits and a ${weapon}, this daring ${characterClass} navigates the thin border between high fortune and the hangman's gallows.`,
      `Framed for a high-stakes heist by their former guildmaster, ${name} escaped the Iron Dungeons through a forgotten cistern with nothing but determination. Now living by their wits, this agile ${characterClass} stalks across the province tracking down the conspirator who stole their freedom.`,
      `Operating from the dimly lit taverns and midnight rooftops, ${name} made an art of acquiring secrets that high lords would kill to conceal. This resourceful ${characterClass} uses their ${weapon} only as a last resort, preferring silence, shadows, and perfect timing.`
    ],
    Ranger: [
      `Raised along the treacherous frontier where primordial forests meet civilized territory, ${name} learned to track beasts through blizzard winds using a ${weapon}. Sworn to protect ancient sacred groves, this keen-eyed ${subclass} ${characterClass} strikes from the canopy long before invaders realize they have crossed the border.`,
      `When a creeping shadow blight began withering the northern woods, ${name} tracked the corruption back to forgotten barrows beneath the mountains. Now a lone warden of the wilderness, this resilient ${characterClass} watches over isolated settlers and hunts monsters that city guards dread to face.`,
      `Mentored by woodland spirits and old frontiersmen, ${name} can read the rustle of leaves like a battle map and strike quarry with unerring accuracy. Armed with a ${weapon}, this ${characterClass} journeys across untamed wilderness maintaining the ancient peace between mortals and the wild.`,
      `After their scout patrol was ambushed by mountain trolls, ${name} survived alone in the frozen peaks for months through sheer outdoor mastery. Returning as an indomitable ${characterClass}, they now guide weary travelers through treacherous passes while hunting down territorial predators.`
    ],
    Paladin: [
      `When holy dawn pierced the desecrated chapel of Saint Aurelius, ${name} knelt upon the ruined flagstones and received a luminous divine mandate. Raising their ${weapon} in solemn defiance against the gathering dark, this noble ${subclass} ${characterClass} rides forth to shield the weak and vanquish wicked tyrants.`,
      `Once an imperial legionnaire who witnessed great cruelties in the name of conquest, ${name} cast aside worldly ranks after an angelic vision appeared in the battle smoke. Now an unwavering ${characterClass}, they channel radiant sunburst fury to purify corrupt strongholds.`,
      `Bound by a sacred vow etched onto their shield, ${name} swore never to let an innocent cry for aid go unanswered while breath remains in their lungs. Armed with holy convictions and a ${weapon}, this heroic ${characterClass} marches directly into shadow-haunted lands to ignite hope.`,
      `Born into an ancient line of templars, ${name} took up their family's blessed armaments when darkness claimed their ancestral cathedral. This devoted ${characterClass} radiates a protective aura, offering mercy to those who repent and righteous judgment to those who revel in cruelty.`
    ],
    Druid: [
      `Drawn into the primordial hollow of the Great Oak, ${name} drank deep from elder waters and learned the primal tongue of earth, wind, and beasts. Robed in living moss and brandishing a ${weapon}, this ${subclass} ${characterClass} commands tempests to cleanse blighted frontiers poisoned by reckless alchemy.`,
      `When ironmongers and loggers began desecrating the sacred megaliths of their tribe, ${name} rallied the wild creatures of the forest to reclaim the sanctuary. Now wandering where nature's harmony is broken, this ${characterClass} mends poisoned rivers and brings down fury upon defilers.`,
      `Possessing eyes that gleam like autumn amber, ${name} can hear the groaning of ancient roots beneath stone cobblestones. Walking the wild borderlands with a ${weapon}, this mystical ${characterClass} protects hidden fey crossings and communes with spirits of the earth.`,
      `Born during a solstice tempest atop the highest mountain ridge, ${name} was nurtured by an ancient dire bear when avalanches took their village. As a fierce ${characterClass}, they shapeshift to defend nature's sacred balance from encroaching doom.`
    ],
    Warlock: [
      `In a desperate bid to save their family from an inevitable curse, ${name} knelt at the ancient crossroads and forged a midnight pact with an entity from the stars. Now crackling with violet eldritch flames and wielding a ${weapon}, this ${subclass} ${characterClass} searches for a way to rewrite their destiny before the patron claims their debt.`,
      `While excavating the sunken ruins of an abyssal citadel, ${name} uncovered a whispering obsidian crystal that bonded to their soul. Guided by otherworldly whispers, this enigmatic ${characterClass} commands forbidden arcana to crush rivals while keeping their dangerous secret hidden.`,
      `Cast out from royal courts after demonstrating occult manifestations beyond mortal reckoning, ${name} embraced the shadowy covenant that gives them power. Bearing a ${weapon} and eerie violet wards, this defiant ${characterClass} seeks arcane mastery that will force the High Council to bow.`,
      `Tethered to a cosmic patron whose goals span thousands of years, ${name} channels unfathomable void energy into every incantation they utter. This solitary ${characterClass} roams forgotten crypts seeking forbidden relics demanded by their shadowy benefactor.`
    ],
  };

  const pool = storiesByClass[characterClass] || storiesByClass.Warrior;
  return getRandomItem(pool);
}

export async function fetchBackstory(char: Character): Promise<{ story: string; source: 'ai' | 'local' }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch('/api/generate-backstory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: char.name,
        characterClass: char.characterClass,
        subclass: char.subclass,
        race: char.race,
        primaryWeapon: char.primaryWeapon,
        background: char.background,
        quirk: char.quirk,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.backstory && data.backstory.trim().length > 10) {
        return { story: data.backstory.trim(), source: 'ai' };
      }
    }
  } catch {
    // Fallback gracefully on network timeout or server absence
  }

  // Guaranteed imaginative local fallback matching name & class
  return { story: generateLocalBackstory(char), source: 'local' };
}
