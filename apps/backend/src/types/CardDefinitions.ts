export type ICardDefinitions = {
  card_id: number;
  name: string;
  cost: number;
  power: number;
  description?: string;
  cosmere_world?: CosmereWorldType;
  rarity: RarityType;
  image_url: string;
};

type CosmereWorldType = 'Roshar' | 'Scadrial' | 'Sel' | 'Nalthis';
type RarityType = 'Common' | 'Epic' | 'Legendary';
