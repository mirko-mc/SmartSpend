import { CrudDelete, CrudGet, CrudPost, CrudPut } from "../config/CRUD.js";
import paymentMethodsSchema from "../models/paymentMethods.schema.js";
// TODO
// * passare i dati uno ad uno anziché il body completo
// ??? i req.params.userId devono diventare req.LoggedUser.id e rimuovere :userId dalla rotta?

// todo
/** GET /user/:userId/paymentMethods recuperare uno o tutti i metodi di pagamento */
export const GetPaymentMethods = async (req, res) => {
  const [Err, Results] = await CrudGet(req, paymentMethodsSchema);
  /** se l'errore è valorizzato, loggo l'errore e restituisco errore all'utente
   * altrimenti invio i dati all'utente
   * */
  if (Err) {
    console.log(Err);
    res.status(400).send("Error while getting payment methods");
  } else res.status(200).send(Results);
};

// todo
/** POST /user/:userId/paymentMethod creare un nuovo metodo di pagamento */
export const PostPaymentMethod = async (req, res) => {
  const [Err, Results] = await CrudPost(req, paymentMethodsSchema);
  /** se l'errore è valorizzato, loggo l'errore e restituisco l'errore all'utente
   * altrimenti invio all'utente il metodo di pagamento appena creato
   * */
  if (Err) {
    console.log(Err);
    res.status(400).send("Error while creating payment method");
  } else res.status(200).send(Results);
};

// todo
/** PUT /user/:userId/paymentMethod/:paymentMethodId modificare un metodo di pagamento */
export const PutPaymentMethod = async (req, res) => {
  const [Err, Results] = await CrudPut(req, paymentMethodsSchema);
  /** se l'errore è valorizzato, loggo l'errore
   * altrimenti invio i dati modificati all'utente
   * */
  if (Err) {
    console.log(Err);
    res.status(400).send("Error while updating payment method");
  } else res.status(200).send(Results);
};

// todo
/** DELETE /user/:userId/paymentMethod/:paymentMethodId eliminare un metodo di pagamento */
export const DeletePaymentMethods = async (req, res) => {
  const [Err, Results] = await CrudDelete(req, paymentMethodsSchema);
  console.log(Results);
  /** se l'errore è valorizzato, loggo l'errore
   * altrimenti invio all'utente che il metodo di pagamento è stata eliminato
   * */
  if (Err) {
    console.log(Err);
    res.status(400).send("Error while deleting payment method");
  } else res.status(200).send("Payment method deleted successfully");
};
