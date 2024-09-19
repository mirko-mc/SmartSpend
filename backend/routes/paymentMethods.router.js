import express from "express";
import * as PaymentMethodsController from "../controllers/paymentMethods.controller.js"

const Router = express.Router();

Router.get("/", PaymentMethodsController.GetPaymentMethods);
Router.post("/",);
Router.put("/",);
Router.delete("/",);
Router.patch("/",);

export default Router;