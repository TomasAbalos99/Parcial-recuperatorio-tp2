import { CreditCardModel } from "../models/card.model.js";
import { cardRepository } from "../repository/card.repository.js";
import { userRepository } from "../repository/user.repository.js";


export const cardService = {
  createCard: async (cardData) => {
  CreditCardModel.validate(cardData);

  // validar que exista el usuario
  const { data: user } = await userRepository.findByEmail(cardData.email);
  if (!user) {
    throw new Error("No se puede crear la tarjeta: el usuario no existe.");
  }

  // valida que el numero de tarjeta no exista
  const { data: existingCardNumber } = await cardRepository.findByCardNumber(cardData.card_number);
  if (existingCardNumber) {
    throw new Error("Ya existe una tarjeta con ese número.");
  }

  // Valida que el usuario no tenga ya una tarjeta
  const { data: existingCardByEmail } = await cardRepository.findByEmail(cardData.email);
  if (existingCardByEmail) {
    throw new Error("Este usuario ya tiene una tarjeta asignada.");
  }

  const { data, error } = await cardRepository.insert(cardData);
  if (error) throw new Error(error.message);
  return data[0];
},
  getAllCards: async () => {
  const { data, error } = await cardRepository.findAll();
  if (error) throw new Error(error.message);
  return data;
},

  getCardByEmail: async (email) => {
  const { data, error } = await cardRepository.findByEmail(email);
  if (error || !data) throw new Error("No se encontró una tarjeta para este email.");
  return data;
},

  updateCard: async (cardNumber, cardData) => {
  CreditCardModel.validate(cardData);

  //Valido que exista
  const { data: existing, error: findError } = await cardRepository.findByCardNumber(cardNumber);
if (findError || !existing) {
  throw new Error("No se encontró la tarjeta que se desea actualizar.");
}

  //Valido que exista el usuario propietario
  const { data: user } = await userRepository.findByEmail(cardData.email);
  if (!user) {
    throw new Error("No se puede actualizar: el email no pertenece a ningún usuario.");
  }
  

  const { data, error } = await cardRepository.updateByCardNumber(cardNumber, cardData);
  if (error) throw new Error(error.message);
  return data[0];
},

  deleteCard: async (cardNumber) => {
  const { data: existingCard, error: findError } = await cardRepository.findByCardNumber(cardNumber);
  if (findError || !existingCard) {
    throw new Error("No se encontró la tarjeta que se desea eliminar.");
  }

  const { error } = await cardRepository.deleteByCardNumber(cardNumber);
  if (error) throw new Error(error.message);

  return { message: "Tarjeta eliminada exitosamente." };
}

};