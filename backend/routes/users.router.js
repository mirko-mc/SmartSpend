import express from "express";
import * as UserController from "../controllers/users.controller.js";

const Router = express.Router();
// todo
/** GET /user/:userId recupera l'utente */
Router.get("/user/:userId", UserController.GetUser);
// todo
/** POST /user crea un nuovo utente */
Router.post("/user", UserController.PostUser);
// todo
/** PUT /user/:userId modifica l'utente */
Router.put("/user/:userId", UserController.PutUser);
// todo
/** DELETE /user/:userId elimina l'utente */
Router.delete("/user/:userId", UserController.DeleteUser);
// todo
/** PATCH /user/:userId aggiunge l'avatar dell'utente */
Router.patch("/user/:userId", UserController.PatchUser);

export default Router;
