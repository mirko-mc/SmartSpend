import paymentMethodsSchema from "../models/paymentMethods.schema.js";
import { paymentMethodCheck } from "../utils/bodyCheck.js";

// * /api/v1/paymentMethod
// GET /:paymentMethodId => recuperare un metodo di pagamento
export const GetPaymentMethod = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => GetPaymentMethod");
  try {
    const PaymentMethod = await paymentMethodsSchema.findById(
      req.params.paymentMethodId
    );
    if (!PaymentMethod) throw new Error("Payment method not found");
    if (PaymentMethod.user._id.toString() !== req.LoggedUser.id) throw new Error("Error on user id");
    res.status(200).send(PaymentMethod);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// GET "" => recuperare tutti i metodi di pagamento
export const GetPaymentMethods = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => GetPaymentMethods");
  try {
    const PaymentMethods = await paymentMethodsSchema.find({
      user: req.LoggedUser.id,
    });
    if (!PaymentMethods) throw new Error("Error while getting payment methods");
    // if (PaymentMethods.user.toString() !== req.LoggedUser.id) throw new Error("Error on user id");
    res.status(200).send(PaymentMethods);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// POST "" => creare un nuovo metodo di pagamento
export const PostPaymentMethod = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => PostPaymentMethod");
  try {
    console.log(req.body);
    if (req.body.user !== req.LoggedUser.id)
      throw new Error("Error on user id");
    const Data = await paymentMethodCheck(req.body, true);
    if (!Data) throw new Error("Data not valid");
    const NewPaymentMethod = await paymentMethodsSchema.create(Data);
    if (!NewPaymentMethod)
      throw new Error("Error while creating payment method");
    res.status(200).send(NewPaymentMethod);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// PUT /:paymentMethodId => modificare un metodo di pagamento
export const PutPaymentMethod = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => PutPaymentMethod");
  try {
    if (req.body.user !== req.LoggedUser.id)
      throw new Error("Error on user id");
    const PaymentMethod = await paymentMethodsSchema.findById(
      req.params.paymentMethodId
    );
    if (!PaymentMethod) throw new Error("Payment method not found");
    const Data = await paymentMethodCheck(req.body, false);
    if (!Data) throw new Error("Data not valid");
    const EditedPaymentMethod = await paymentMethodsSchema.findByIdAndUpdate(
      req.params.paymentMethodId,
      Data,
      { new: true }
    );
    if (!EditedPaymentMethod)
      throw new Error("Error while updating payment method");
    res.status(200).send(EditedPaymentMethod);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// DELETE /:paymentMethodId => eliminare un metodo di pagamento
export const DeletePaymentMethod = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => DeletePaymentMethods");
  try {
    // if (req.body.user !== req.LoggedUser.id)
    //   throw new Error("Error on user id");
    const DeletedPaymentMethod = await paymentMethodsSchema.findByIdAndDelete(
      req.params.paymentMethodId,
      { new: true }
    );
    if (!DeletedPaymentMethod)
      throw new Error("Error while deleting payment method");
    res.status(200).send("Payment method deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};
