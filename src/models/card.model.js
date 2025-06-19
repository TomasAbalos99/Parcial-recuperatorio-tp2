export const CreditCardModel = {
  requiredFields: ["card_number", "card_holder", "expiration_date", "cvv", "email"],

  validate: (cardData) => {
    const missing = CreditCardModel.requiredFields.filter((field) => !cardData[field]);
    if (missing.length > 0) {
      throw new Error(`Faltan campos obligatorios: ${missing.join(", ")}`);
    }
  }
};