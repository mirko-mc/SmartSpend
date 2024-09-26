import categoriesSchema from "../models/categories.schema.js";
import { categoryCheck } from "../utils/bodyCheck.js";
// TODO
// * aggiungere controlli prima di passare per il database
// * passare i dati uno ad uno anziché il body completo

// TODO FUNZIONA
// GET /categories/:userId recuperare una o tutte le categorie
export const GetCategories = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => GetCategories");
  try {
    const Categories = await categoriesSchema.find({ user: req.LoggedUser.id });
    if (!Categories)
      throw new Error({ message: "Error while getting categories" });
    else res.status(200).send(Categories);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// TODO FUNZIONA
// POST /category creare una nuova categoria
export const PostCategory = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => PostCategory");
  try {
    const Category = await categoriesSchema.create({
      ...req.body,
      user: req.LoggedUser.id,
    });
    console.log(Category);
    if (!Category)
      throw new Error({ message: "Error while creating category" });
    else res.status(200).send(Category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// todo FUNZIONA
// PUT /category/:categoryId modificare una categoria
export const PutCategory = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => PutCategory");
  try {
    // se la categoria non esiste genero errore
    const Category = await categoriesSchema.findById(req.params.categoryId);
    if (!Category) throw new Error("Category not found");
    // controllo che l'id nel body sia dell'utente loggato
    console.log(Category.user.toString());
    console.log(req.LoggedUser.id);
    if (Category.user.toString() === req.LoggedUser.id)
      req.body = { ...req.body, user: req.LoggedUser.id };
    else throw new Error("Error on user id");
    const Data = await categoryCheck(req.body);
    console.log(Data);
    // se esiste la aggiorno
    await Category.update(Data, { new: true });
    if (!Category)
      throw new Error({ message: "Error while updating category" });
    else res.status(200).send(Category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// todo FUNZIONA
// DELETE /category/:categoryId eliminare una categoria
export const DeleteCategory = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => DeleteCategory");
  try {
    // se la categoria non esiste genero errore
    const Category = await categoriesSchema.findById(req.params.categoryId);
    if (!Category) throw new Error("Category not found");
    // se esiste la elimino
    await Category.delete();
    if (!Category) throw new Error("Error while deleting category");
    res.status(200).send("Category deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error while deleting category");
  }
};
