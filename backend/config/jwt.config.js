import Jwt from "jsonwebtoken";
import "dotenv/config";

// todo funzione per generare il token e lo restituisce
// ??? fatto bene
export const JwtCreation = async (userId) => {
  console.log("CONFIG => jwt.config.js - JwtCreation");
  try {
    /** creiamo il JwtToken per l'utente passandogli :
     * - i dati che deve contenere
     * - il mio segreto
     * - la durata del token
     */
    return Jwt.sign(
      {
        user: userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );
  } catch (err) {
    console.log(err);
  }
};
