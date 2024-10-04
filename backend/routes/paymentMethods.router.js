import express from "express";
import * as PaymentMethodsController from "../controllers/paymentMethods.controller.js";

const Router = express.Router();
// * /api/v1/paymentMethod
// GET /:paymentMethodId => recuperare un metodo di pagamento
Router.get("/:paymentMethodId", PaymentMethodsController.GetPaymentMethod);

// GET "" => recuperare tutti i metodi di pagamento
Router.get("", PaymentMethodsController.GetPaymentMethods);

// POST "" => creare un nuovo metodo di pagamento
Router.post("", PaymentMethodsController.PostPaymentMethod);

// PUT /:paymentMethodId => modificare un metodo di pagamento
Router.put("/:paymentMethodId", PaymentMethodsController.PutPaymentMethod);

// DELETE /:paymentMethodId => eliminare un metodo di pagamento
Router.delete(
  "/:paymentMethodId",
  PaymentMethodsController.DeletePaymentMethod
);

export default Router;
