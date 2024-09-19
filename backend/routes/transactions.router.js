import express from "express";
import * as TransactionsController from "../controllers/transactions.controller.js"

const Router = express.Router();

Router.get("/", TransactionsController.GetTransactions);
Router.post("/",);
Router.put("/",);
Router.delete("/",);
Router.patch("/",);

export default Router;
