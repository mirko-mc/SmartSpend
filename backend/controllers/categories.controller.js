import categoriesSchema from "../models/categories.schema.js";
// TODO
// * aggiungere controlli prima di passare per il database
// * passare i dati uno ad uno anziché il body completo
// ??? i req.params.userId devono diventare req.LoggedUser.id e rimuovere :userId dalla rotta?
// ??? avrò bisogno di recuperarne una sola se non per modifica o eliminazione?

// TODO
/** GET /categories/:userId recuperare una o tutte le categorie */
export const GetCategories = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => GetCategories");
  try {
    /** creo una tupla contenente l'errore e i dati letti dal database */
    const Categories = await categoriesSchema.find({ user: req.LoggedUser.id });
    console.log(Categories);
    // se l'errore è valorizzato restituisco errore
    if (!Categories)
      throw new Error({ message: "Error while getting categories" });
    // altrimenti invio i dati all'utente
    else res.status(200).send(Categories);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// TODO
/** POST /category creare una nuova categoria */
export const PostCategory = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => PostCategory");
  try {
    /** creo una tupla contenente l'errore e i dati per creare una nuova categoria */
    const Category = await categoriesSchema.create({
      ...req.body,
      user: req.LoggedUser.id,
    });
    console.log(Category);
    // se l'errore è valorizzato restituisco errore
    if (!Category)
      throw new Error({ message: "Error while creating category" });
    // altrimenti invio i dati all'utente
    else res.status(200).send(Category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// todo
/** PUT /category/:categoryId modificare una categoria */
export const PutCategory = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => PutCategory");
  try {
    /** creo una tupla contenente l'errore e i dati della categoria da modificare */
    const Category = await categoriesSchema.findByIdAndUpdate(
      req.params.categoryId,
      { ...req.body },
      { new: true }
    );
    // se l'errore è valorizzato restituisco errore
    if (!Category)
      throw new Error({ message: "Error while updating category" });
    // altrimenti invio i dati all'utente
    else res.status(200).send(Category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// todo
/** DELETE /category/:categoryId eliminare una categoria */
export const DeleteCategory = async (req, res) => {
  console.log("CONTROLLER CATEGORIES => DeleteCategory");
  try {
    /** elimino la categoria */
    await categoriesSchema.findByIdAndDelete(req.params.categoryId);
    res.status(200).send("Category deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error while deleting category");
  }
};
