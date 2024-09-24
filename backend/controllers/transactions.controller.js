import transactionsSchema from "../models/transactions.schema.js";
import { transactionCheck } from "../utils/bodyCheck.js";

// * passare i dati uno ad uno anziché il body completo
// ??? i req.params.userId devono diventare req.LoggedUser.id e rimuovere :userId dalla rotta?

// todo
/** GET /transaction recuperare una o tutte le transazioni */
export const GetTransactions = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => GetTransactions");
  try {
    const Transactions = await transactionsSchema
      .find({ user: req.LoggedUser.id })
      .populate("user", "category", "paymentMethod");
    if (!Transactions) throw new Error("Error while getting payment methods");
    res.status(200).send(Transactions);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// todo
/** POST /transaction creare un nuovo metodo di pagamento */
export const PostTransaction = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => PostTransaction");
  try {
    const Data = await transactionCheck(req.body);
    console.log(Data);
    const NewTransaction = (await transactionsSchema.create(Data));
    if (!NewTransaction) throw new Error("Error while creating payment method");
    res.status(200).send(NewTransaction);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// todo
/** PUT /transaction/:transactionId modificare un metodo di pagamento */
export const PutTransaction = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => PutTransaction");
  try {
    const Data = await transactionCheck(req.body);
    console.log(Data);
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

// todo
/** DELETE /transaction/:transactionId eliminare un metodo di pagamento */
export const DeleteTransaction = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => DeleteTransactions");
  try {
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
