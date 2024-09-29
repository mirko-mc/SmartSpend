import "dotenv/config";
import PassportGoogleStrategy from "passport-google-oauth20";
import usersSchema from "../models/users.schema.js";
import { JwtCreation } from "./jwt.config.js";

console.log("CONFIG => passport.config.js - GoogleStrategy");
// definisco la strategia google indicando le credenziali d'accesso e l'indirizzo della callbackGoogle
const GoogleStrategy = new PassportGoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`,
  },

  async function (accessToken, refreshToken, profile, passportNext) {
    // definiamo l'oggetto profilo che rispecchia il nostro schema
    const {
      given_name: name,
      family_name: surname,
      email,
      sub: googleId,
    } = profile._json;

    // cerco l'utente nel database tramite il suo googleId
    let user = await usersSchema.findOne({ googleId });
    // se l'utente non esiste nel database allora lo creo tramite i dati ricevuti da google
    if (!user) {
      const NewUser = new usersSchema({
        googleId,
        name,
        surname,
        email,
      });
      // salvo l'utente nel database
      user = await NewUser.save();
      // mi assicuro che l'utente sia stato creato
      user = NewUser;
      console.log(user);
    }
    const Token = JwtCreation(user._id);
    if (!Token) return res.status(401).send();
    return passportNext(null, { token: Token });
  }
);
export default GoogleStrategy;
