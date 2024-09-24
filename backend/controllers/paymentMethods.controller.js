import paymentMethodsSchema from "../models/paymentMethods.schema.js";
// TODO
// * passare i dati uno ad uno anziché il body completo
// ??? i req.params.userId devono diventare req.LoggedUser.id e rimuovere :userId dalla rotta?

// todo
/** GET /user/:userId/paymentMethods recuperare uno o tutti i metodi di pagamento */
export const GetPaymentMethods = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => GetPaymentMethods");
  try {
    const PaymentMethods = await CrudGet(req, paymentMethodsSchema);
    if (!PaymentMethods) throw new Error("Error while getting payment methods");
    res.status(200).send(PaymentMethods);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// todo
/** POST /user/:userId/paymentMethod creare un nuovo metodo di pagamento */
export const PostPaymentMethod = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => PostPaymentMethod");
  try {
    const NewPaymentMethod = await CrudPost(req, paymentMethodsSchema);
    if (!NewPaymentMethod)
      throw new Error("Error while creating payment method");
    res.status(200).send(NewPaymentMethod);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// todo
/** PUT /user/:userId/paymentMethod/:paymentMethodId modificare un metodo di pagamento */
export const PutPaymentMethod = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => PutPaymentMethod");
  try {
    const EditPaymentMethod = await CrudPut(req, paymentMethodsSchema);
    if (!EditPaymentMethod)
      throw new Error("Error while updating payment method");
    res.status(200).send(EditPaymentMethod);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// todo
/** DELETE /user/:userId/paymentMethod/:paymentMethodId eliminare un metodo di pagamento */
export const DeletePaymentMethod = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => DeletePaymentMethods");
  try {
    const DeletedPaymentMethod = await CrudDelete(req, paymentMethodsSchema);
    if (!DeletedPaymentMethod)
      throw new Error("Error while deleting payment method");
    res.status(200).send("Payment method deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};
