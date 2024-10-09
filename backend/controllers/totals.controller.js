import totalsSchema from "../models/totals.schema.js";

// * /api/v1/total
export const GetTotal = async (req, res) => {
  console.log("CONTROLLER TOTALS => GetTotals");
  try {
    const Totals = await totalsSchema.findOne({ user: req.params.userId });
    if (!Totals) throw new Error("Error while getting totals");
    res.status(200).send(Totals);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const PostTotal = async (FormValues) => {
  console.log("CONTROLLER TOTALS => PostTotals");
  try {
    console.log(FormValues);
    // // verifico che l'id dell'utente loggato sia uguale all'id ricevuto
    // if (req.body.user !== req.LoggedUser.id)
    //   throw new Error("Error on user id");
    // // controllo il body e genero l'oggetto da passare al database
    // const Data = await totalCheck({
    //   user: UserId,
    //   inOut: inOut,
    //   amount: Amount,
    // });

    // creo i totali
    const NewTotal = await totalsSchema.create(FormValues);
    if (!NewTotal) throw new Error("Error while creating total");
    return NewTotal;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const PutTotal = async (FormValues) => {
  console.log("CONTROLLER TOTALS => PutTotals");
  try {
    // // verifico che l'id dell'utente loggato sia uguale all'id ricevuto
    // if (req.body.user !== req.LoggedUser.id)
    //   throw new Error("Error on user id");
    // verifico se i totali dell'utente esistono
    // const Data = await totalCheck(req.body);

    console.log(FormValues);
    // recupero i totali dal database
    const Totals = await totalsSchema.findOne({ user: FormValues.user });
    // se i totali non esistono genero un errore
    if (!Totals) throw new Error("Totals not found");
    // calcolo il nuovo totale
    FormValues?.totalIn
      ? (Totals.totalIn += +FormValues.totalIn)
      : (Totals.totalOut += +FormValues.totalOut);

    // aggiorno i totali
    Totals.save();

    return Totals;
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
};

export const DeleteTotal = async (req, res) => {
  console.log("CONTROLLER TOTALS => DeleteTotals");
  try {
    const DeletedTotals = await totalsSchema.findOneAndDelete(
      { user: req.LoggedUser.id },
      { new: true }
    );
    if (!DeletedTotals) throw new Error("Error while deleting totals");
    res.status(200).send("Totals deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};
