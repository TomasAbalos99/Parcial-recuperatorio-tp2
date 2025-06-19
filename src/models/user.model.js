export const UserModel = {
  requiredFields: ["email", "nombre"],

  validate: (userData) => {
    const missing = UserModel.requiredFields.filter((field) => !userData[field]);
    if (missing.length > 0) {
      throw new Error(`Faltan campos obligatorios: ${missing.join(", ")}`);
    }
  }
};