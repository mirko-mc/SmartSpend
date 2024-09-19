import express from "express";
import * as TransactionsController from "../controllers/transactions.controller.js"

const Router = express.Router();

// todo
/** GET /user/:userId/transaction recuperare una o tutte le transazioni */
Router.get("/user/:userId/transaction", TransactionsController.GetTransactions);
// todo
/** POST /user/:userId/transaction creare un nuovo metodo di pagamento */
Router.post("/user/:userId/transaction", TransactionsController.PostTransaction);
// todo
/** PUT /user/:userId/transaction/:transactionId modificare un metodo di pagamento */
Router.put("/user/:userId/transaction/:transactionId", TransactionsController.PutTransaction);
// todo
/** DELETE /user/:userId/transaction/:transactionId eliminare un metodo di pagamento */
Router.delete("/user/:userId/transaction/:transactionId", TransactionsController.DeleteTransaction);

export default Router;