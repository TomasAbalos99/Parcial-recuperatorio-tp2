import { supabase } from "../supabase/client.js";

export const cardRepository = {
  insert: async (cardData) => {
    return await supabase.from("credit_cards").insert([cardData]).select();
  },
  findAll: async () => {
  return await supabase.from("credit_cards").select("*");
},

 findByEmail: async (email) => {
  return await supabase.from("credit_cards").select("*").eq("email", email).single();
},
  
  findByCardNumber: async (cardNumber) => {
  return await supabase.from("credit_cards").select("*").eq("card_number", cardNumber).single();
},

  updateByCardNumber: async (cardNumber, cardData) => {
    return await supabase
      .from("credit_cards")
      .update(cardData)
      .eq("card_number", cardNumber)
      .select();
  },

  deleteByCardNumber: async (cardNumber) => {
    return await supabase.from("credit_cards").delete().eq("card_number", cardNumber);
  },
  
};