import { model, Schema } from "mongoose";

const Transactions = new Schema(
  {
    // data della transazione nel formato italiano
    date: {
      type: Date,
      required: true,
    },
    // in quale negozio è stata effettuata la transazione
    shop: {
      type: String,
      required: true,
    },
    // indirizzo del negozio
    address: {
      type: String,
    },
    // descrizione della transazione
    description: {
      type: String,
      required: true,
    },
    // importo della transazione
    amount: {
      type: Number,
      required: true,
    },
    // categoria della transazione
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    // metodo di pagamento usato per effettuare la transazione
    paymentMethod: {
      type: Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },
    // utente che ha effettuato la transazione
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "transactions",
    timestamps: true,
  }
);
export default model("Transaction", Transactions);
