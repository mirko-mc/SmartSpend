import express from "express";
import * as UserController from "../controllers/users.controller.js";

const Router = express.Router();
// todo
/** GET /:userId recupera l'utente */
Router.get("/:userId", UserController.GetUser);
// todo
/** POST / crea un nuovo utente */
Router.post("/", UserController.PostUser);
// todo
/** PUT /:userId modifica l'utente */
Router.put("/:userId", UserController.PutUser);
// todo
/** DELETE /:userId elimina l'utente */
Router.delete("/:userId", UserController.DeleteUser);
// todo
/** PATCH /:userId aggiunge l'avatar dell'utente */
Router.patch("/:userId", UserController.PatchUser);

export default Router;
