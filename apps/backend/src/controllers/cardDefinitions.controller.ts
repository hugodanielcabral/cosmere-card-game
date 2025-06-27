import { Request, Response } from 'express';
import { CardDefinitions } from '../models/cardDefinitions.model';

export const getCardDefinitions = async(_: Request, res: Response) => {
  try {
    const cards = await CardDefinitions.findAll();

    if (cards.length === 0) {
      res.status(404).json({
        error: 'No se encontró las cartas.'
      });
      return;
    }

    res.status(200).json(cards);
  } catch(error) {
    console.error('Error al obtener cartas:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};

export const getCardDefinition = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const card = await CardDefinitions.findOne(id);

    if (card.length === 0) {
      res.status(404).json({
        error: 'No se encontró la carta.'
      });
      return;
    }

    res.status(200).json(card[0]);
  } catch(error) {
    console.error('Error al obtener cartas:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};
