# TP Recuperatorio - Gestión de Tarjetas de Crédito

Este proyecto consiste en una API REST para gestionar tarjetas de crédito vinculadas a usuarios, desarrollada en Node.js con Supabase como base de datos. Implementa arquitectura en capas y está completamente funcional con pruebas.

---

## 🧠 Entidad principal

**CreditCard**
- `card_number` (string, único)
- `card_holder` (string)
- `expiration_date` (string)
- `cvv` (string)
- `email` (string, clave foránea a usuarios)

---

## ⚙️ Funcionalidades desarrolladas

- Crear tarjeta
- Obtener tarjeta por email
- Obtener todas las tarjetas
- Actualizar tarjeta
- Eliminar tarjeta

---

## ✅ Validaciones implementadas

- Un usuario solo puede tener **una única tarjeta**.
- No se puede crear una tarjeta si:
  - El número ya existe.
  - El usuario no existe.
  - El usuario ya posee una tarjeta.
- Al actualizar:
  - Se valida la existencia del usuario.
- Al eliminar:
  - Se valida si la tarjeta existe previamente.

---

## 🧪 Pruebas

- Se incluye archivo `.http` en `src/tests` con pruebas manuales para testear el CRUD.
- Se implementaron **pruebas automatizadas con Jest + Supertest**:
  - ✅ POST exitoso
  - ❌ POST con usuario que ya tiene tarjeta

---

## 📁 Estructura del proyecto

src/
├── app.js
├── server.js
├── config/
├── controllers/
├── models/
├── repository/
├── routes/
├── services/
├── supabase/
├── tests/
│ ├── card-test.http
│ └── card.test.js





## ▶️ Comandos

```bash
npm install         # Instala las dependencias
npm run dev         # Levanta el servidor con app.js (modo desarrollo)
npm run lint        # Formatea el proyecto con Biome
npm test            # Ejecuta los tests con Jest
⚠️ El archivo .env contiene las credenciales de Supabase. Fue excluido del repositorio como corresponde.