import categoriesSchema from "../models/categories.schema.js";
import paymentMethodsSchema from "../models/paymentMethods.schema.js";
import usersSchema from "../models/users.schema.js";
import { userCheck } from "../utils/bodyCheck.js";
import Bcrypt from "bcrypt";

// GET /:userId => recupera l'utente
export const GetUser = async (req, res) => {
  try {
    const User = await usersSchema
      .findById(req.LoggedUser.id)
      .populate("totals");
    console.log(User);
    if (!User) throw new Error("Error while getting user");
    res.status(200).send(User);
  } catch (err) {
    console.log(err);
    res.send(res.status(400).send({ message: err.message }));
  }
};

// PUT /:userId => modifica l'utente
export const PutUser = async (req, res) => {
  try {
    const User = await usersSchema.findById(req.LoggedUser.id);
    if (!User) throw new Error("User not found");

    const Data = await userCheck(req.body, false);
    if (!Data) throw new Error("Data not valid");
    if (Data.password) Data.password = await Bcrypt.hash(Data.password, 10);

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

// DELETE /:userId => elimina l'utente
export const DeleteUser = async (req, res) => {
  try {
    const DeletedCategories = await categoriesSchema.deleteMany({
      user: req.LoggedUser.id,
      new: true,
    });
    if (!DeletedCategories) throw new Error("Error while deleting categories");

    const DeletedPaymentMethods = await paymentMethodsSchema.deleteMany({
      user: req.LoggedUser.id,
      new: true,
    });
    if (!DeletedPaymentMethods)
      throw new Error("Error while deleting categories");

    const DeletedUser = await usersSchema.findByIdAndDelete(req.LoggedUser.id, {
      new: true,
    });
    if (!DeletedUser) throw new Error("Error while deleting user");
    res.status(200).send("User deleted successfully");
  } catch (err) {
    console.log(err);
    res.send(res.status(400).send({ message: err.message }));
  }
};

// PATCH /:userId => aggiunge l'avatar dell'utente
export const PatchUser = async (req, res) => {
  try {
    const PatchedUser = await usersSchema.findByIdAndUpdate(
      req.LoggedUser.id,
      { avatar: req.file.path },
      { new: true }
    );
    if (!PatchedUser) throw new Error("Error while patching user");
    res.status(200).send(PatchedUser);
  } catch (err) {
    console.log(err);
    res.send(res.status(400).send({ message: err.message }));
  }
};
