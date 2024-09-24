import express from "express";
import * as CategoriesController from "../controllers/categories.controller.js";

const Router = express.Router();
// todo
/** GET ies recuperare una o tutte le categorie */
Router.get("ies", CategoriesController.GetCategories);
// todo
/** POST y creare una nuova categoria */
Router.post("y", CategoriesController.PostCategory);
// todo
/** PUT /:categoryId modificare una categoria */
Router.put(
  "y/:categoryId",
  CategoriesController.PutCategory
);
// todo
/** DELETE /:categoryId eliminare una categoria */
Router.delete(
  "y/:categoryId",
  CategoriesController.DeleteCategory
);

export default Router;
