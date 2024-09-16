import express from "express";
import * as AuthorizationController from "../controllers/authorization.controller.js";
import { Authorization } from "../middlewares/authorization.middleware.js";
import passport from "passport";

const Router = express.Router();

/** POST /login => restituisce token di accesso, non protetta */
Router.post("/login", AuthorizationController.PostLogin);

/** GET /me => restituisce l'utente collegato al token di accesso, protetta */
Router.get("/me", Authorization, AuthorizationController.GetMe);

/** POST - crea un nuovo utente*/
Router.post("/register", AuthorizationController.PostRegister);

/**  POST - logout */
Router.post("/logout", Authorization, AuthorizationController.PostLogout);

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
  AuthorizationController.GetCallbackGoogle
);

export default Router;
