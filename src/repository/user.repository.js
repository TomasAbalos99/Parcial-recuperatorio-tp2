import { supabase } from "../supabase/client.js";

export const userRepository = {
  findByEmail: async (email) => {
    return await supabase.from("usuarios").select("*").eq("email", email).single();
  },
  findAll: async () => {
  return await supabase.from("usuarios").select("*");
},


  insert: async (userData) => {
    return await supabase.from("usuarios").insert([userData]).select();
  }
  
};
