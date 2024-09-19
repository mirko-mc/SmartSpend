import express from "express";
import * as PaymentMethodsController from "../controllers/paymentMethods.controller.js"

const Router = express.Router();

// todo
/** GET /user/:userId/paymentMethods recuperare uno o tutti i metodi di pagamento */
Router.get("/user/:userId/paymentMethods", PaymentMethodsController.GetPaymentMethods);
// todo
/** POST /user/:userId/paymentMethod creare un nuovo metodo di pagamento */
Router.post("/user/:userId/paymentMethod", PaymentMethodsController.PostPaymentMethod);
// todo
/** PUT /user/:userId/paymentMethod/:paymentMethodId modificare un metodo di pagamento */
Router.put("/user/:userId/paymentMethod/:paymentMethodId", PaymentMethodsController.PutPaymentMethod);
// todo
/** DELETE /user/:userId/paymentMethod/:paymentMethodId eliminare un metodo di pagamento */
Router.delete("/user/:userId/paymentMethod/:paymentMethodId", PaymentMethodsController.DeletePaymentMethods);

export default Router;