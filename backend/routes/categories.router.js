import express from "express";
import * as CategoriesController from "../controllers/categories.controller.js";

const Router = express.Router();
// todo
/** GET /user/:userId/categories recuperare una o tutte le categorie */
Router.get("/user/:userId/categories", CategoriesController.GetCategories);
// todo
/** POST /user/:userId/category creare una nuova categoria */
Router.post("/user/:userId/category", CategoriesController.PostCategory);
// todo
/** PUT /user/:userId/category/:categoryId modificare una categoria */
Router.put(
  "/user/:userId/category/:categoryId",
  CategoriesController.PutCategory
);
// todo
/** DELETE /user/:userId/category/:categoryId eliminare una categoria */
Router.delete(
  "/user/:userId/category/:categoryId",
  CategoriesController.DeleteCategory
);

export default Router;
