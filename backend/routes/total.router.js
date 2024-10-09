import express from "express";
import * as TotalController from "../controllers/totals.controller.js";
const Router = express.Router();
// * /api/v1/total
Router.get("/:userId", TotalController.GetTotal);
Router.post("", TotalController.PostTotal);
Router.put("", TotalController.PutTotal);
Router.delete("", TotalController.DeleteTotal);
export default Router;
