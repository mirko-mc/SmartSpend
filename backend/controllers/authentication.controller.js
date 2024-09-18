import { JwtCreation } from "../config/jwt.config.js";
import usersSchema from "../models/users.schema.js";
import Bcrypt from "bcrypt";
// TODO integrare controlli di validazione campi required
// TODO passare i dati uno alla volta anziché il body completo
// todo integrare controlli se l'utente esiste nel database (regex sulla mail)

/**
 * todo POST /login => restituisce token di accesso, non protetta */
export const PostLogin = async (req, res) => {
  console.log("AUTHENTICATION CONTROLLER => PostLogin");
  try {
    // ricerco l'utente nel database tramite la sua mail prelevando anche il campo password
    const User = await usersSchema
      .findOne({ email: req.body.email })
      .select("+password");
    // se l'utente non è presente nel database genero un errore
    if (!User) throw new Error("User not found");
    // se l'utente è presente nel database verifico la password hashata
    if (!Bcrypt.compare(req.body.password, User.password))
      throw new Error("Wrong credentials");
    // genero un token di accesso
    const Token = await JwtCreation(User._id);
    // se il token è vuoto genero un errore
    if (!Token) throw new Error("Error while generating token");
    // restituisco il token di accesso al frontend
    res.status(200).send({ token: Token });
  } catch (err) {
    console.log(err);
    res.status(401).send("Login error");
  }
};

/**
 * todo GET /me => restituisce l'utente collegato al token di accesso, protetta */
export const GetMeInfo = async (req, res) => {
  try {
    console.log("AUTHENTICATION CONTROLLER => GetMeInfo");
    /** recupero i dati dell'utente dall'headers */
    const User = req.LoggedUser;
    /** se i dati NON ci sono allora l'utente NON è loggato */
    if (!User) throw new Error("Please login, you aren't logged");
    /** restituisco i dati dell'autore */
    return res.status(200).send(User);
  } catch (err) {
    res.send("GetMeInfo error");
  }
};

/**
 * todo POST - crea un nuovo utente */
export const PostRegister = async (req, res) => {
  console.log("AUTHENTICATION CONTROLLER => PostRegister");
  try {
    // hash della password
    req.body.password = await Bcrypt.hash(req.body.password, 10);
    // creazione utente
    const User = await usersSchema.create(req.body);
    // genero un token di accesso
    const Token = await JwtCreation(User._id);
    // se il token è vuoto genero un errore
    if (!Token) throw new Error("Error while generating token");
    // restituisco l'utente il token di accesso al frontend
    res.status(201).send({ User, token: Token });
  } catch (err) {
    console.error(err);
    res.status(401).send("Error while creating user");
  }
};

// TODO - POST /logout logout utente (per JWT base non serve backend, basta togliere il token dal localStorage)
export const PostLogout = async (req, res) => {};

/**
 * todo GET - login Google è il link al server google */
export const GetLoginGoogle = async (req, res) => {};

/**
 * todo GET - callback Google */
export const GetCallbackGoogle = async (req, res) => {
  console.log("AUTHENTICATION CONTROLLER => GetCallbackGoogle");
  /** qui facciamo il redirect al frontend passandogli nella query string il jwt creato in passport che l'ha aggiunto in req.author */
  res.redirect(`${process.env.FRONTEND_URL}?token=${req.user.JwtToken}`);
};
