import express from "express";
import * as UserController from "../controllers/users.controller.js";
import cloudinaryUploads from "../middlewares/cloudinary.uploads.js";

const Router = express.Router();
// GET /:userId => recupera l'utente
Router.get("/:userId", UserController.GetUser);

// PUT /:userId => modifica l'utente
Router.put("/:userId", UserController.PutUser);

// DELETE /:userId => elimina l'utente
Router.delete("/:userId", UserController.DeleteUser);

// PATCH /:userId => aggiunge l'avatar dell'utente
Router.patch(
  "/:userId",
  cloudinaryUploads.single("avatar"),
  UserController.PatchUser
);

export default Router;
