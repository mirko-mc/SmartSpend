import express from "express";
import * as TransactionsController from "../controllers/transactions.controller.js"

const Router = express.Router();

// todo
// GET / recuperare una o tutte le transazioni
Router.get("", TransactionsController.GetTransactions);
// todo
// POST /transaction creare un nuovo metodo di pagamento
Router.post("", TransactionsController.PostTransaction);
// todo
// PUT /transaction/:transactionId modificare un metodo di pagamento
Router.put("/:transactionId", TransactionsController.PutTransaction);
// todo
// DELETE /transaction/:transactionId eliminare un metodo di pagamento
Router.delete("/:transactionId", TransactionsController.DeleteTransaction);

export default Router;