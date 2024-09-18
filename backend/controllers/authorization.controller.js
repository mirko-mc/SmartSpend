import { JwtCreation } from "../config/jwt.config.js";
import usersSchema from "../models/users.schema.js";
import Bcrypt from "bcrypt";
/**
 * todo POST /login => restituisce token di accesso, non protetta */
export const PostLogin = async (req, res) => {
  try {
    // ricerco l'utente nel database tramite la sua mail prelevando anche il campo password
    const User = await usersSchema
      .findOne({ email: req.body.email })
      .select("+password");
    // se l'utente non è presente nel database genero un errore
    if (!User) throw new Error("User not found");
    // se l'utente è presente nel database verifico la password hashata
    if (!(await Bcrypt.comparePassword(req.body.password, User.password)))
      throw new Error("Wrong credentials");
    // genero un token di accesso
    const Token = await JwtCreation(User._id);
    if (!Token) throw new Error("Error while generating token");
    console.log("TOKEN\n", Token);
    // restituisco il token di accesso al frontend
    res.status(200).send({ token: Token });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(401).send("Login error");
  }
};

/**
 * todo GET /me => restituisce l'utente collegato al token di accesso, protetta */
export const GetMe = async (req, res) => {};

/**
 * todo POST - crea un nuovo utente */
export const PostRegister = async (req, res) => {};

// TODO - POST /logout logout utente (per JWT base non serve backend, basta togliere il token dal localStorage)
export const PostLogout = async (req, res) => {};

/**
 * todo GET - login Google */
export const GetLoginGoogle = async (req, res) => {};

/**
 * todo GET - callback Google */
export const GetCallbackGoogle = async (req, res) => {};
