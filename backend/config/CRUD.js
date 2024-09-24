export const CrudGet = async (id, schema) => {
  console.log("CONFIG => CRUD.js - CrudGet");
  try {
    console.log(id);
    /** se è un utente */
    if (id?.userId) return await schema.findById(id.userId);
    /** se non è un utente */
    if (!id?.userId) return await schema.find({ user: id.id }).populate("user");
  } catch (err) {
    console.log(err);
  }
};

export const CrudPost = async (req, schema) => {
  console.log("CONFIG => CRUD.js - CrudPost");
  return await schema.create({ ...req.body, user: req.LoggedUser.id });
};

export const CrudPut = async (req, schema) => {
  console.log("CONFIG => CRUD.js - CrudPut");
  return await schema.findByIdAndUpdate(
    req.LoggedUser.id,
    { ...req.body },
    { new: true }
  );
};

export const CrudDelete = async (req, schema) => {
  console.log("CONFIG => CRUD.js - CrudDelete");
  return await schema.findByIdAndDelete(req.LoggedUser.id, {
    new: true,
  });
};
