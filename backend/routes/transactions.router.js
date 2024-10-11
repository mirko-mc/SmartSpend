import express from "express";
import * as TransactionsController from "../controllers/transactions.controller.js"

const Router = express.Router();
// * /api/v1/transactions
// GET "" => recuperare tutte le transazioni
Router.get("", TransactionsController.GetTransactions);

// GET "/totals" => recupera i totali di tutte le transazioni
Router.get("/totals", TransactionsController.GetTotals);

// POST "" => creare una nuova transazione
Router.post("", TransactionsController.PostTransaction);

// GET => recuperare una transazione
Router.get("/:transactionId", TransactionsController.GetTransaction);

// PUT /:transactionId => modificare una transazione
Router.put("/:transactionId", TransactionsController.PutTransaction);

// DELETE /:transactionId => eliminare una transazione
Router.delete("/:transactionId", TransactionsController.DeleteTransaction);

export default Router;