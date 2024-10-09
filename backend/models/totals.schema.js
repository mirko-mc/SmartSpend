import { model, Schema } from "mongoose";

const Totals = new Schema(
  {
    // totale delle entrate
    totalIn: {
      type: Number,
      required: true,
      default: 0,
    },
    // totale delle uscite
    totalOut: {
      type: Number,
      required: true,
      default: 0,
    },
    // utente referenziato
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "totals",
    timestamps: true,
  }
);
export default model("Total", Totals);
