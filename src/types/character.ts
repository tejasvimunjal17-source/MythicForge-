export type CharacterClass =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Ranger'
  | 'Paladin'
  | 'Druid'
  | 'Warlock';

export type CharacterRace =
  | 'Human'
  | 'High Elf'
  | 'Wood Elf'
  | 'Mountain Dwarf'
  | 'Shield Dwarf'
  | 'Tiefling'
  | 'Dragonborn'
  | 'Halfling'
  | 'Half-Orc'
  | 'Gnome';

export type CharacterAlignment =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export interface CharacterStats {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  characterClass: CharacterClass;
  subclass: string;
  race: CharacterRace;
  alignment: CharacterAlignment;
  level: number;
  hp: number;
  health: number;
  mana: number;
  strength: number;
  stats: CharacterStats;
  primaryWeapon: string;
  secondaryItem: string;
  armor: string;
  background: string;
  quirk: string;
  ability: string;
  backstory: string;
  portraitUrl?: string;
  createdAt: number;
  isFavorite?: boolean;
}
