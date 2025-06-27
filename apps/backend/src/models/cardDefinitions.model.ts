import sql from '../db';
import { ICardDefinitions } from '../types/CardDefinitions';

export class CardDefinitions {
  static async findAll(): Promise<ICardDefinitions[]> {
    const cards = await sql<ICardDefinitions[]>`SELECT * FROM card_definitions`;

    return cards;
  }

  static async findOne(id: string | undefined): Promise<ICardDefinitions[]> {
    if (!id) {
      return [];
    }

    const card = await sql<
      ICardDefinitions[]
    >`SELECT * FROM card_definitions WHERE card_id = ${id}`;

    return card;
  }
}
