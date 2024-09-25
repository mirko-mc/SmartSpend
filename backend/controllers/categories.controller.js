import categoriesSchema from "../models/categories.schema.js";
// TODO
// * aggiungere controlli prima di passare per il database
// * passare i dati uno ad uno anziché il body completo
// ??? i req.params.userId devono diventare req.LoggedUser.id e rimuovere :userId dalla rotta?
// ??? avrò bisogno di recuperarne una sola se non per modifica o eliminazione?

// TODO FUNZIONA
/** GET /categories/:userId recuperare una o tutte le categorie */
export const GetCategories = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => GetCategories");
  try {
    const Categories = await categoriesSchema.find({ user: req.LoggedUser.id });
    console.log(Categories);
    if (!Categories)
      throw new Error({ message: "Error while getting categories" });
    else res.status(200).send(Categories);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// TODO FUNZIONA
/** POST /category creare una nuova categoria */
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
/** PUT /category/:categoryId modificare una categoria */
export const PutCategory = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => PutCategory");
  try {
    const Category = await categoriesSchema.findByIdAndUpdate(
      req.params.categoryId,
      { ...req.body },
      { new: true }
    );
    if (!Category)
      throw new Error({ message: "Error while updating category" });
    else res.status(200).send(Category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// todo FUNZIONA
/** DELETE /category/:categoryId eliminare una categoria */
export const DeleteCategory = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => DeleteCategory");
  try {
    const Category = await categoriesSchema.findByIdAndDelete(
      req.params.categoryId
    );
    if (!Category) throw new Error("Error while deleting category");
    res.status(200).send("Category deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error while deleting category");
  }
};
