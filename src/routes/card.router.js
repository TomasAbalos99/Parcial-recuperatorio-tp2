import express from "express";
import { cardController } from "../controllers/card.controller.js";

const cardRouter = express.Router();

cardRouter.post("/", cardController.createCard);
cardRouter.get("/:email", cardController.getCardByEmail);
cardRouter.get('/',cardController.getAllCards);
cardRouter.put("/:cardNumber", cardController.updateCard);
cardRouter.delete("/:cardNumber", cardController.deleteCard);

export {cardRouter};