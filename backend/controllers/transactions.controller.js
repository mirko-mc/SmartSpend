import transactionsSchema from "../models/transactions.schema.js";
import { transactionCheck } from "../utils/bodyCheck.js";

// * passare i dati uno ad uno anziché il body completo
// ??? i req.params.userId devono diventare req.LoggedUser.id e rimuovere :userId dalla rotta?

// todo FUNZIONA
/** GET /transaction recuperare una o tutte le transazioni */
export const GetTransactions = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => GetTransactions");
  try {
    const Transactions = await transactionsSchema
      .find({ user: req.LoggedUser.id })
      .populate("user")
      .populate("paymentMethod")
      .populate("category");
    if (!Transactions) throw new Error("Error while getting payment methods");
    res.status(200).send(Transactions);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// todo FUNZIONA
/** POST /transaction creare un nuovo metodo di pagamento */
export const PostTransaction = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => PostTransaction");
  try {
    if (req.body.user === req.LoggedUser.id)
      req.body = { ...req.body, user: req.LoggedUser.id };
    else throw new Error("Error on user id");
    const Data = await transactionCheck(req.body);
    const NewTransaction = await transactionsSchema.create(Data);
    if (!NewTransaction) throw new Error("Error while creating payment method");
    res.status(200).send(NewTransaction);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: Error.message });
  }
};

// todo FUNZIONA
/** PUT /transaction/:transactionId modificare un metodo di pagamento */
export const PutTransaction = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => PutTransaction");
  try {
    if (req.body.user === req.LoggedUser.id)
      req.body = { ...req.body, user: req.LoggedUser.id };
    else throw new Error("Error on user id");
    const Data = await transactionCheck(req.body);
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

// todo FUNZIONA
/** DELETE /transaction/:transactionId eliminare un metodo di pagamento */
export const DeleteTransaction = async (req, res) => {
  console.log("CONTROLLER TRANSACTIONS => DeleteTransactions");
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
