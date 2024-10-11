import paymentMethodsSchema from "../models/paymentMethods.schema.js";
import categoriesSchema from "../models/categories.schema.js";
import transactionsSchema from "../models/transactions.schema.js";
import { transactionCheck } from "../utils/bodyCheck.js";

// todo creare endpoint che prende tutte le transazioni e le salva in una variabile
// todo tr = aw sch. find inOut amount
// todo ciclare per ottenere somma
// todo res => saldo
// GET "/totals" => recupera i totali di tutte le transazioni
export const GetTotals = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => GetTotals");
  try {
    const Transaction = await transactionsSchema
      .find({ user: req.LoggedUser.id })
      .select("inOut amount");
    if (!Transaction) throw new Error("Totals not found");
    let TotalIn = 0;
    let TotalOut = 0;
    Transaction.forEach((total) => {
      if (total.inOut === "in") {
        TotalIn += total.amount;
      } else {
        TotalOut += total.amount;
      }
    });

    const PaymentMethod = await paymentMethodsSchema
      .find({ user: req.LoggedUser.id })
      .select("initialBalance");
    if (!PaymentMethod) throw new Error("Totals not found");
    PaymentMethod.forEach((total) => {
      TotalIn += total.initialBalance;
    });
    res.status(200).send({ totalIn: TotalIn, totalOut: TotalOut });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: err.message });
  }
};

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
    console.error(err);
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
    console.error(err);
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
    const NewTransaction = await transactionsSchema.create(TransactionData);
    if (!NewTransaction) throw new Error("Error while creating payment method");
    res.status(200).send(NewTransaction);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: Error.message });
  }
};

// PUT /:transactionId => modificare una transazione
export const PutTransaction = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => PutTransaction");
  try {
    if (req.body.user._id !== req.LoggedUser.id)
      throw new Error("Error on user id");
    const Transaction = await transactionsSchema.findById(
      req.params.transactionId
    );
    if (!Transaction) throw new Error("Transaction not found");

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
    const TransactionData = await transactionCheck(req.body, false);
    const EditTransaction = await transactionsSchema.findByIdAndUpdate(
      req.params.transactionId,
      TransactionData,
      { new: true }
    );
    if (!EditTransaction)
      throw new Error("Error while updating payment method");
    res.status(200).send(EditTransaction);
  } catch (err) {
    console.error(err);
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
    // verifico che l'id dell'utente loggato sia uguale all'id della transazione
    if (Transaction.user.toString() !== req.LoggedUser.id)
      throw new Error("Error on user id");
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
