import { UserModel } from "../models/user.model.js";
import { userRepository } from "../repository/user.repository.js";

export const userService = {
  createUser: async (userData) => {
    UserModel.validate(userData);

    const { data: existingUser } = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Ya existe un usuario con ese email.");
    }

    const { data, error } = await userRepository.insert(userData);
    if (error) throw new Error(error.message);
    return data[0];
  },
  getAllUsers: async () => {
  const { data, error } = await userRepository.findAll();
  if (error) throw new Error(error.message);
  return data;
}

};
