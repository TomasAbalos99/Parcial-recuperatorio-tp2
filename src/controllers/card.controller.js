import { cardService } from "../services/card.services.js";

export const cardController = {
  createCard: async (req, res) => {
    try {
      const card = await cardService.createCard(req.body);
      res.status(201).json(card);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAllCards: async (req, res) => {
  try {
    const cards = await cardService.getAllCards();
    res.status(200).json(cards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
},


  getCardByEmail: async (req, res) => {
    try {
      const cards = await cardService.getCardByEmail(req.params.email);
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCard: async (req, res) => {
    try {
      const updated = await cardService.updateCard(req.params.cardNumber, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteCard: async (req, res) => {
  try {
    const result = await cardService.deleteCard(req.params.cardNumber);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
};