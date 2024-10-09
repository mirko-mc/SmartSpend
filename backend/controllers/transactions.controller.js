import paymentMethodsSchema from "../models/paymentMethods.schema.js";
import categoriesSchema from "../models/categories.schema.js";
import transactionsSchema from "../models/transactions.schema.js";
import { totalCheck, transactionCheck } from "../utils/bodyCheck.js";
import { PostTotal, PutTotal } from "./totals.controller.js";
import totalsSchema from "../models/totals.schema.js";

// GET => recuperare tutte le transazioni
export const GetTransactions = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => GetTransactions");
  try {
    if (req.body.id) {
      const Transaction = await transactionsSchema.findById(
        req.body.idTransaction
      );
      if (!Transaction) throw new Error("Transaction not found");
      return res.status(200).send(Transaction);
    }
    const Transactions = await transactionsSchema
      .find({ user: req.LoggedUser.id })
      .populate("user")
      .populate("paymentMethod")
      .populate("category")
      .sort({ date: -1 });
    if (!Transactions) throw new Error("Error while getting payment methods");
    res.status(200).send(Transactions);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// GET /:transactionId => recuperare una transazione
export const GetTransaction = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => GetTransaction");
  try {
    const Transaction = await transactionsSchema
      .findById(req.params.transactionId)
      .populate("user")
      .populate("paymentMethod")
      .populate("category");
    if (!Transaction) throw new Error("Transaction not found");
    res.status(200).send(Transaction);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// POST /:userId => creare una nuova transazione
export const PostTransaction = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => PostTransaction");
  try {
    console.log(req.body);
    if (req.body.user !== req.LoggedUser.id)
      throw new Error("Error on user id");
    const User = await paymentMethodsSchema
      .findById(req.body.paymentMethod)
      .select("user");
    if (!User || User.user.toString() !== req.LoggedUser.id)
      throw new Error("Payment method not found");
    const Category = await categoriesSchema
      .findById(req.body.category)
      .select("user");
    if (!Category || Category.user.toString() !== req.LoggedUser.id)
      throw new Error("Category not found");

    const TransactionData = await transactionCheck(req.body, true);
    const TotalBody = {
      user: req.LoggedUser.id,
      inOut: TransactionData.inOut,
      amount: TransactionData.amount,
    };
    if (await totalsSchema.exists({ user: req.LoggedUser.id })) {
      const TotalData = await totalCheck(TotalBody, false);
      console.log(TotalData);
      await PutTotal(TotalData);
    } else {
      const TotalData = await totalCheck(TotalBody, true);
      await PostTotal(TotalData);
    }
    const NewTransaction = await transactionsSchema.create(TransactionData);
    if (!NewTransaction) throw new Error("Error while creating payment method");
    res.status(200).send(NewTransaction);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: Error.message });
  }
};

// PUT /:transactionId => modificare una transazione
export const PutTransaction = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => PutTransaction");
  try {
    console.log(req.body);
    const Transaction = await transactionsSchema.findById(
      req.params.transactionId
    );
    if (!Transaction) throw new Error("Transaction not found");

    if (Transaction.user === req.LoggedUser.id)
      req.body = { ...req.body, user: req.LoggedUser.id };
    else throw new Error("Error on user id");
    const User = await paymentMethodsSchema
      .findById(req.body.paymentMethod)
      .select("user");
    if (!User || User.user.toString() !== req.LoggedUser.id)
      throw new Error("Payment method not found");
    const Category = await categoriesSchema
      .findById(req.body.category)
      .select("user");
    if (!Category || Category.user.toString() !== req.LoggedUser.id)
      throw new Error("Category not found");
    // todo trovare in quale punto inserire il richiamo alla funzione di modifica totali calcolando la differenza
    const Data = await transactionCheck(req.body, false);
    const EditTransaction = await transactionsSchema.findByIdAndUpdate(
      req.params.transactionId,
      Data,
      { new: true }
    );
    if (!EditTransaction)
      throw new Error("Error while updating payment method");
    res.status(200).send(EditTransaction);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// DELETE /:transactionId => eliminare una transazione
export const DeleteTransaction = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => DeleteTransactions");
  try {
    // recupero la transazione
    const Transaction = await transactionsSchema.findById(
      req.params.transactionId
    );
    // se la transazione non esiste genero errore
    if (!Transaction) throw new Error("Transaction not found");
    console.log(Transaction);
    // verifico che l'id dell'utente loggato sia uguale all'id della transazione
    if (Transaction.user.toString() !== req.LoggedUser.id)
      throw new Error("Error on user id");
    // recupero i totali dell'utente
    const Total = await totalsSchema.findOne({ user: req.LoggedUser.id });
    // modifico il totale sottraendo la transazione da eliminare
    console.log(Transaction.inOut, Transaction.amount);
    console.log(Total.totalIn, Total.totalOut);
    Transaction.inOut === "in"
      ? (Total.totalIn -= Transaction.amount)
      : (Total.totalOut -= Transaction.amount);
    // salvo i totali
    Total.save();
    // elimino la transazione
    const DeletedTransaction = await transactionsSchema.findByIdAndDelete(
      req.params.transactionId,
      { new: true }
    );
    if (!DeletedTransaction)
      throw new Error("Error while deleting payment method");
    res.status(200).send("Payment method deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};
