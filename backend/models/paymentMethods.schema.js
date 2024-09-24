import { model, Schema } from "mongoose";

const PaymentMethods = new Schema(
  {
    // nome del metodo di pagamento
    name: {
      type: String,
      required: true,
    },
    // descrizione del metodo di pagamento
    description: {
      type: String,
      maxLength: 100,
    },
    // tipo di metodo di pagamento
    type: {
      type: String,
      enum: ["cash", "debitCard", "creditCard", "digitalWallet"],
    },
    // saldo iniziale
    initialBalance: {
      type: Number,
      required: true,
    },
    // utente che ha creato il metodo di pagamento
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "paymentMethods",
    timestamps: true,
  }
);
export default model("PaymentMethod", PaymentMethods);
