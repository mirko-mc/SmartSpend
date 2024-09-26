import express from "express";
import * as TransactionsController from "../controllers/transactions.controller.js"

const Router = express.Router();

// todo
// GET => recuperare una o tutte le transazioni
Router.get("", TransactionsController.GetTransactions);
// todo
// POST => creare una nuova transazione
Router.post("", TransactionsController.PostTransaction);
// todo
// PUT /:transactionId => modificare una transazione
Router.put("/:transactionId", TransactionsController.PutTransaction);
// todo
// DELETE /:transactionId => eliminare una transazione
Router.delete("/:transactionId", TransactionsController.DeleteTransaction);

export default Router;