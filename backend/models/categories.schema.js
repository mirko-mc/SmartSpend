import { model, Schema } from "mongoose";

const Categories = new Schema(
  {
    // nome della categoria
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    // descrizione della categoria
    description: {
      type: String,
      maxLength: 100,
    },
    // tipo di categoria
    type: {
      type: String,
      enum: ["in", "out"],
      required: true,
    },
    // colore della categoria
    color: {
      type: String,
      maxLength: 10,
      default: "#000000",
    },
    // utente che ha creato la categoria
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);
export default model("Category", Categories);
