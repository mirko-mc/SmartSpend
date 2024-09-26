import paymentMethodsSchema from "../models/paymentMethods.schema.js";
// TODO
// * passare i dati uno ad uno anziché il body completo

// todo FUNZIONA
// GET /paymentMethods recuperare uno o tutti i metodi di pagamento
export const GetPaymentMethods = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => GetPaymentMethods");
  try {
    const PaymentMethods = await paymentMethodsSchema.find({
      user: req.LoggedUser.id,
    })
    console.log(!PaymentMethods);
    if (!PaymentMethods) throw new Error("Error while getting payment methods");
    res.status(200).send(PaymentMethods);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// todo FUNZIONA
// POST /paymentMethod creare un nuovo metodo di pagamento
export const PostPaymentMethod = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => PostPaymentMethod");
  try {
    const NewPaymentMethod = await paymentMethodsSchema.create({ ...req.body });
    if (!NewPaymentMethod)
      throw new Error("Error while creating payment method");
    res.status(200).send(NewPaymentMethod);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// todo FUNZIONA
// PUT /paymentMethod/:paymentMethodId modificare un metodo di pagamento
export const PutPaymentMethod = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => PutPaymentMethod");
  try {
    const EditPaymentMethod = await paymentMethodsSchema.findByIdAndUpdate(
      req.params.paymentMethodId,
      { ...req.body },
      { new: true }
    );
    if (!EditPaymentMethod)
      throw new Error("Error while updating payment method");
    res.status(200).send(EditPaymentMethod);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// todo FUNZIONA
// DELETE /paymentMethod/:paymentMethodId eliminare un metodo di pagamento
export const DeletePaymentMethod = async (req, res) => {
  console.log("CONTROLLER PAYMENT METHODS => DeletePaymentMethods");
  try {
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
