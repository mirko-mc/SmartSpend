import "dotenv/config";
import express from "express";
import AuthenticationRouter from "./routes/authentication.router.js";
import cors from "cors";
import moongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import endpoints from "express-list-endpoints";
import passport from "passport";
import GoogleStrategy from "./config/passport.config.js";
import { Authorization } from "./middlewares/authorization.middleware.js";
import UsersRouter from "./routes/users.router.js";
import CategoriesRouter from "./routes/categories.router.js";
import PaymentMethodsRouter from "./routes/paymentMethods.router.js";
import TransactionsRouter from "./routes/transactions.router.js";

/** dichiaro il server */
const Server = express();
/** dichiaro l'url da usare */
const Host = process.env.HOST || "http://localhost";
/** dichiaro la porta da usare */
const Port = process.env.PORT || 5000;
/** morgan mostra in console le info sulle chiamate CRUD al server */
Server.use(morgan("dev"));
/** aggiunge alcuni headers alle risposte e ne nasconde altri per migliorare la sicurezza dell'api */
Server.use(helmet());
// * configurazione cors
/** dichiaro gli indirizzi accettati in chiamata tramite un array ["frontend1", "frontend2"]*/
const WhiteList = ["http://localhost:3000"];
/** dichiaro l'oggetto cors che validerà l'accesso all'API */
const CorsOptions = {
  origin: function (origin, callback) {
    /** se l'indirizzo che chiama l'API è incluso nella lista degli indirizzi consentiti. || origin serve a consentire la comunicazione tra il backend ed un altro server (es. comunicazione con i server Google per l'autenticazione) */
    if (WhiteList.indexOf(origin) !== -1 || !origin) {
      /** ritorno true, ha accesso all'API */
      callback(null, true);
    } else {
      /** altrimenti non gli è consentito l'utilizzo dell'API */
      callback(new Error("Not allowed by CORS"));
    }
  },
};
/** cors permette la comunicazione tra frontend e backend su porte differenti ed accetta qualsiasi chiamata */
Server.use(cors());
/** utilizzo CORS passandogli l'oggetto CorsOption per validare il chiamante */
// !!! Server.use(cors(CorsOptions));
// fine configurazione cors
/** abilitazione all'utilizzo di json */
Server.use(express.json());
/** non è un middleware ma semplicemente abilito l'uso della strategia google di passport */
passport.use("google", GoogleStrategy);
// * rotte
// autenticazione
Server.use("/api/v1/auth", AuthenticationRouter);
// ??? posso utilizzare il middleware di autorizzazione perché da qui in poi saranno tutte rotte protette?
// Server.use(Authorization());
// utenti
Server.use("/api/v1/user", Authorization, UsersRouter);
Server.use("/api/v1/categor", Authorization, CategoriesRouter);
Server.use("/api/v1/paymentMethod", Authorization, PaymentMethodsRouter);
Server.use("/api/v1/transaction", Authorization, TransactionsRouter);
/** connessione al database */
await moongoose
  .connect(process.env.MONGO_CONNECTION_URI)
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log(err));
/** in ascolto sulla porta */
Server.listen(Port, () => {
  console.log(`server in ascolto su porta ${Host}:${Port}`);
  console.table(endpoints(Server));
});
