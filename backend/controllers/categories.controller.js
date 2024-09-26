import categoriesSchema from "../models/categories.schema.js";
import { categoryCheck } from "../utils/bodyCheck.js";

// TODO FUNZIONA
// GET /categories/:userId => recuperare una o tutte le categorie
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
// POST /category => creare una nuova categoria
export const PostCategory = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => PostCategory");
  try {
    // controllo che l'id nel body sia dell'utente loggato
    if (req.body.user === req.LoggedUser.id)
      req.body = { ...req.body, user: req.LoggedUser.id };
    else throw new Error("Error on user id");

    // controllo i dati del body
    const Data = await categoryCheck(req.body, true);
    if (!Data) throw new Error("Data not valid");

    // creazione della categoria
    const Category = await categoriesSchema.create(Data);
    if (!Category)
      throw new Error({ message: "Error while creating category" });
    else res.status(200).send(Category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// todo FUNZIONA
// PUT /category/:categoryId => modificare una categoria
export const PutCategory = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => PutCategory");
  try {
    // recupero la categoria dal database
    const Category = await categoriesSchema.findById(req.params.categoryId);

    // se la categoria non esiste genero errore
    if (!Category) throw new Error("Category not found");

    // controllo che l'id nel body sia dell'utente loggato
    if (Category.user.toString() === req.LoggedUser.id)
      req.body = { ...req.body, user: req.LoggedUser.id };
    else throw new Error("Error on user id");

    // controllo i dati del body
    const Data = await categoryCheck(req.body, false);

    // se i dati sono vuoti genero errore
    if (!Data) throw new Error("Data not valid");

    // se la categoria esiste aggiorno
    const UpdatedCategory = await categoriesSchema.findByIdAndUpdate(
      req.params.categoryId,
      Data,
      { new: true }
    );

    // se qualcosa è andato storto genero errore
    if (!UpdatedCategory)
      throw new Error({ message: "Error while updating category" });
    else res.status(200).send(UpdatedCategory);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// todo FUNZIONA
// DELETE /category/:categoryId => eliminare una categoria
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
