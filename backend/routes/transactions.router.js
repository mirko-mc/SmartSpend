import express from "express";
import * as TransactionsController from "../controllers/transactions.controller.js"

const Router = express.Router();

// GET => recuperare una o tutte le transazioni
Router.get("", TransactionsController.GetTransactions);

// POST => creare una nuova transazione
Router.post("", TransactionsController.PostTransaction);

// GET => recuperare una transazione
Router.get("/:transactionId", TransactionsController.GetTransaction);

// PUT /:transactionId => modificare una transazione
Router.put("/:transactionId", TransactionsController.PutTransaction);

// DELETE /:transactionId => eliminare una transazione
Router.delete("/:transactionId", TransactionsController.DeleteTransaction);

export default Router;