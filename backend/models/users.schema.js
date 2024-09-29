import { model, Schema } from "mongoose";

const Users = new Schema(
  {
    // googleId
    googleId: {
      type: String,
      // ??? 2 google id a null non si possono avere e sparse non funziona
      // unique: true,
      // sparse: true,
    },
    // todo facebookId
    // todo telegramId
    // nome dell'utente
    name: {
      type: String,
      required: true,
    },
    // cognome dell'utente
    surname: {
      type: String,
    },
    // email dell'utente
    email: {
      type: String,
      unique: true,
    },
    // password hashata dall'utente
    password: {
      type: String,
      select: false,
    },
    // immagine profilo dell'utente
    avatar: {
      type: String,
      default:
        "https://njhalloffame.org/wp-content/uploads/2021/04/generic-avatar-300x300.png",
    },
    // tema preferito
    favoriteTheme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    // se l'utente ha effettuato la verifica comparirà la data
    verifiedAt: {
      type: Date,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);
export default model("User", Users);
