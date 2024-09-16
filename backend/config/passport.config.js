import "dotenv/config";
import PassportGoogleStrategy from "passport-google-oauth20";
import Jwt from "jsonwebtoken";
import usersSchema from "../models/users.schema.js";

console.log("CONFIG => passport.config.js - GoogleStrategy");
/** definisco la strategia google indicando le credenziali d'accesso e l'indirizzo della callbackGoogle */
const GoogleStrategy = new PassportGoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },

  async function (accessToken, refreshToken, profile, passportNext) {
    /** definiamo l'oggetto profilo che rispecchia il nostro schema */
    const {
      given_name: name,
      family_name: surname,
      email,
      sub: googleId,
    } = profile._json;

    /** cerco l'utente nel database tramite il suo googleId */
    let user = await usersSchema.findOne({ googleId });
    /** se l'utente non esiste nel database allora lo creo tramite i dati ricevuti da google */
    if (!user) {
      const NewUser = new usersSchema({
        googleId,
        name,
        surname,
        email,
      });
      /** salvo l'utente nel database */
      user =await NewUser.save();
      /** mi assicuro che l'utente sia stato creato */
      user = NewUser;
      console.log(user);
    }

    // TODO centralizzare la funzione di creazione del jwt
    /** creiamo il JwtToken per l'utente passandogli */
    Jwt.sign(
      /** i dati che deve contenere */
      { user: user._id },
      /** il mio segreto */
      process.env.JWT_SECRET,
      /** la durata del token (solo numero sono secondi, stringa numero lettera sono tempi più lunghi (1h, 1m, 1M) */
      { expiresIn: "3h" },
      (err, JwtToken) => {
        /** in caso di errore chiudo la funzione col return */
        if (err) return res.status(401).send();
        /** richiamo il prossimo middleware di passport, NON di express */
        /** il primo argomento è l'eventuale errore, il secondo argomento è il valore che passport assegnerà a req.user e cioè un oggetto con la chiave token */
        return passportNext(null, { JwtToken });
      }
    );
  }
);
export default GoogleStrategy;
