import express from "express";
import * as CategoriesController from "../controllers/categories.controller.js";

const Router = express.Router();
// * /api/v1/category
// GET /:categoryId => recuperare una categoria
Router.get("/:categoryId", CategoriesController.GetCategory);

// GET "" => recuperare tutte le categorie
Router.get("", CategoriesController.GetCategories);

// POST "" => creare una nuova categoria
Router.post("", CategoriesController.PostCategory);

// PUT /:categoryId => modificare una categoria
Router.put(
  "/:categoryId",
  CategoriesController.PutCategory
);

// DELETE /:categoryId => eliminare una categoria
Router.delete(
  "/:categoryId",
  CategoriesController.DeleteCategory
);

export default Router;
