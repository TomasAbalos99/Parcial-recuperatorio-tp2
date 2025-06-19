import request from "supertest";
import { app } from "../app.js";
import { supabase } from "../supabase/client.js";

let server;

describe("Pruebas de la API de tarjetas", () => {
  const dummyUser = {
    email: "jestuser@example.com",
    nombre: "Usuario Jest"
  };

  const dummyCard = {
    card_number: "9999-9999-9999-9999",
    card_holder: "Titular Jest",
    expiration_date: "12/28",
    cvv: "321",
    email: dummyUser.email
  };

  beforeAll(async () => {
    // Levantar el server
    server = app.listen(4000, () => {
      console.log("Servidor de test corriendo en http://localhost:4000");
    });

    // Insertar usuario dummy
    await supabase.from("usuarios").insert([dummyUser]);
  });

  afterAll(async () => {
    // Eliminar tarjeta y usuario dummy
    await supabase.from("credit_cards").delete().eq("card_number", dummyCard.card_number);
    await supabase.from("credit_cards").delete().eq("card_number", "8888-8888-8888-8888");
    await supabase.from("usuarios").delete().eq("email", dummyUser.email);

    // Cerrar server
    await server.close();
  });

  test("POST /cards → deberia crear la tarjeta correctamente", async () => {
    const res = await request(app).post("/cards").send(dummyCard);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("card_number", dummyCard.card_number);
    expect(res.body).toHaveProperty("email", dummyCard.email);
  });

  test("POST /cards → falla si el usuario ya tiene una tarjeta", async () => {
    const res = await request(app).post("/cards").send({
      ...dummyCard,
      card_number: "8888-8888-8888-8888" // diferente numero, mismo mail
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/ya tiene una tarjeta/i);
  });
});
