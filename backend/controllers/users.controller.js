import usersSchema from "../models/users.schema.js";
import { userCheck } from "../utils/bodyCheck.js";

// todo
// GET /:userId recupera l'utente
export const GetUser = async (req, res) => {
  console.log("CONTROLLER USERS => GetUser");
  try {
    const User = await usersSchema.findById(req.LoggedUser.id);
    if (!User) throw new Error("Error while getting user");
    res.status(200).send(User);
  } catch (err) {
    console.log(err);
    res.send(res.status(400).send({ message: err.message }));
  }
};

// !!! POST / non ho la post perché l'utente viene creato con la register nel controller dell'autenticazione
export const PostUser = async (req, res) => {};

// todo
// PUT /:userId modifica l'utente
export const PutUser = async (req, res) => {
  console.log("CONTROLLER USERS => PutUser");
  try {
    const Data = await userCheck(req.body);
    console.log(Data);
    console.log(!Data);
    if (!Data) throw new Error("Error while updating user");
    const EditUser = await usersSchema.findByIdAndUpdate(
      req.LoggedUser.id,
      Data,
      {
        new: true,
      }
    );
    if (!EditUser) throw new Error("Error while updating user");
    res.status(200).send(EditUser);
  } catch (err) {
    console.log(err);
    res.send(res.status(400).send({ message: err.message }));
  }
};

// todo
// DELETE /:userId elimina l'utente
export const DeleteUser = async (req, res) => {
  console.log("CONTROLLER USERS => DeleteUser");
  try {
    const DeletedUser = await schema.findByIdAndDelete(req.LoggedUser.id, {
      new: true,
    });
    if (!DeletedUser) throw new Error("Error while deleting user");
    res.status(200).send("User deleted successfully");
  } catch (err) {
    console.log(err);
    res.send(res.status(400).send({ message: err.message }));
  }
};

// todo
// PATCH /:userId aggiunge l'avatar dell'utente
export const PatchUser = async (req, res) => {
  console.log("CONTROLLER USERS => PatchUser");
  try {
  } catch (err) {
    console.log(err);
    res.send(res.status(400).send({ message: err.message }));
  }
};
