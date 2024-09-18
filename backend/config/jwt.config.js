import Jwt from "jsonwebtoken";
import "dotenv/config";

// todo fnzione per generare il token e lo restituisce
export const JwtCreation = async (userId) => {
  console.log("CONFIG => jwt.config.js - JwtCreation");
  /** creiamo il JwtToken per l'utente passandogli */
  Jwt.sign(
    /** i dati che deve contenere */
    { user: userId },
    /** il mio segreto */
    process.env.JWT_SECRET,
    /** la durata del token (solo numero sono secondi, stringa numero lettera sono tempi più lunghi (1h, 1m, 1M) */
    { expiresIn: "3h" },
    (err, JwtToken) => {
      /** in caso di errore chiudo la funzione col return */
      if (err) return err;
      /** richiamo il prossimo middleware di passport, NON di express */
      /** il primo argomento è l'eventuale errore, il secondo argomento è il valore che passport assegnerà a req.user e cioè un oggetto con la chiave token */
      return JwtToken;
    }
  );
};
