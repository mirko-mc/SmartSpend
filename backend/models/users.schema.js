import { model, Schema } from "mongoose";
/** new Schema({},{}) vuole 2 oggetti:
 *  1. schema (struttura dei dati)
 *  2. collection (nome della collection in mongo)
 */
const Users = new Schema(
  {
    googleId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
      select: false,
    },
    avatar: {
      type: String,
      default:
        "https://njhalloffame.org/wp-content/uploads/2021/04/generic-avatar-300x300.png",
    },
  },
  /** naming convention: la collection plurale */
  { collection: "users" }
);
/** naming convention: il model singolare */
export default model("User", Users);
