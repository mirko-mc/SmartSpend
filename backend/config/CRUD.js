export const CrudGet = async (req, schema) => {
  return await schema.findById(req.params.userId);
};
export const CrudPost = async (req, schema) => {
  return await schema.create({ ...req.body, user: req.params.userId });
};
export const CrudPut = async (req, schema) => {
  /** creo una tupla contenente l'errore e i dati da modificare */
  const [error, results] = await schema.findByIdAndUpdate(
    req.params.categoryId,
    { ...req.body },
    { new: true }
  );
  return error, results;
};
export const CrudDelete = async (req, schema) => {
  /** creo una tupla contenente l'errore e i dati da eliminare */
  const [error, results] = await schema.findByIdAndDelete(
    req.params.categoryId
  );
  return error, results;
};
