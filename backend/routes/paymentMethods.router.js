import express from "express";
import * as PaymentMethodsController from "../controllers/paymentMethods.controller.js";

const Router = express.Router();

// todo
/** GET s recuperare uno o tutti i metodi di pagamento */
Router.get(
  "s",
  PaymentMethodsController.GetPaymentMethods
);
// todo
/** POST / creare un nuovo metodo di pagamento */
Router.post(
  "/",
  PaymentMethodsController.PostPaymentMethod
);
// todo
/** PUT /:paymentMethodId modificare un metodo di pagamento */
Router.put(
  "/:paymentMethodId",
  PaymentMethodsController.PutPaymentMethod
);
// todo
/** DELETE /:paymentMethodId eliminare un metodo di pagamento */
Router.delete(
  "/:paymentMethodId",
  PaymentMethodsController.DeletePaymentMethod
);

export default Router;
