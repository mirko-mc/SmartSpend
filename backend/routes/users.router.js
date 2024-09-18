import express from "express";
import * as UserController from "../controllers/users.controller.js";

const Router = express.Router();

Router.get("/", UserController.GetUsers);
Router.post("/", UserController.GetUsers);
Router.put("/", UserController.GetUsers);
Router.delete("/", UserController.GetUsers);
Router.patch("/", UserController.GetUsers);

export default Router;
