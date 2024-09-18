import express from "express";
import * as AuthenticationController from "../controllers/authentication.controller.js";
import { Authorization } from "../middlewares/authorization.middleware.js";
import passport from "passport";

const Router = express.Router();

/** POST /login => restituisce token di accesso, non protetta */
Router.post("/login", AuthenticationController.PostLogin);

/** GET /me => restituisce l'utente collegato al token di accesso, protetta */
Router.get("/me", Authorization, AuthenticationController.GetMeInfo);

/** POST - crea un nuovo utente*/
Router.post("/register", AuthenticationController.PostRegister);

/**  POST - logout */
Router.post("/logout", Authorization, AuthenticationController.PostLogout);

/** GET - login Google */
Router.get(
  "/login-google",
  /** middleware di passport che ridireziona alla pagina google */
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/** GET - callback Google */
Router.get(
  "/callback-google",
  /** session a false per disattivare la sessione usando i cookie, riceve i dati del profilo e crea il jwt aggiungendolo in req.user */
  passport.authenticate("google", { session: false }),
  /** ridireziona al frontend passando il jwt come query string nell'url */
  AuthenticationController.GetCallbackGoogle
);

export default Router;
