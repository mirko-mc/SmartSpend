import { JwtCreation } from "../config/jwt.config.js";
import usersSchema from "../models/users.schema.js";
import Bcrypt from "bcrypt";
import { userCheck } from "../utils/bodyCheck.js";
import { PostSendMail } from "../utils/postSendMail.js";

// POST /login => restituisce token di accesso, non protetta
export const PostLogin = async (req, res) => {
  console.log("AUTHENTICATION CONTROLLER => PostLogin");
  try {
    // ricerco l'utente nel database tramite la sua mail prelevando anche il campo password
    const User = await usersSchema
      .findOne({ email: req.body.email })
      .select("+password");
    // se l'utente non è presente nel database genero un errore
    if (!User) throw new Error("User not found");
    // se l'utente è presente nel database verifico la password hashata
    if (!Bcrypt.compare(req.body.password, User.password))
      throw new Error("Wrong credentials");
    // genero un token di accesso
    const Token = JwtCreation(User._id);
    // se il token è vuoto genero un errore
    if (!Token) throw new Error("Error while generating token");
    // restituisco il token di accesso al frontend
    res.status(200).send({ token: Token });
  } catch (err) {
    console.log(err);
    res.status(401).send("Login error");
  }
};

// GET /me => restituisce l'utente collegato al token di accesso, protetta
export const GetMeInfo = async (req, res) => {
  try {
    console.log("AUTHENTICATION CONTROLLER => GetMeInfo");
    // recupero i dati dell'utente dall'headers
    let User = req.LoggedUser;
    // se i dati NON ci sono allora l'utente NON è loggato
    if (!User) throw new Error("Please login, you aren't logged");
    User = await usersSchema.findById(req.LoggedUser.id).populate("totals");
    if (!User) throw new Error("Error while getting user");
    res.status(200).send(User);
  } catch (err) {
    console.log(err);
    res.send(res.status(400).send({ message: err.message }));
  }
};

// POST /register => crea un nuovo utente
export const PostRegister = async (req, res) => {
  console.log("AUTHENTICATION CONTROLLER => PostRegister");
  try {
    // todo controllo che la mail sia in formato valida
    // se l'utente è già presente nel database genero un errore
    if (await usersSchema.findOne({ email: req.body.email }))
      throw new Error("User already exists");
    // dal body controllo che siano presenti almeno i dati obbligatori e recupero solo i dati da inviare al database
    const Data = await userCheck(req.body, true);
    // se i dati sono vuoti genero un errore
    if (!Data) throw new Error("Data not valid");
    Data.password = await Bcrypt.hash(Data.password, 10);
    // creazione utente
    const User = await usersSchema.create(Data);

    // creo categoria generico
    await categoriesSchema.create({
      name: "Generica",
      description: "Categoria generica",
      user: User._id,
      color: "#000000",
    });
    // creo metodo di pagamento contanti
    await paymentMethodsSchema.create({
      name: "Contanti",
      description: "Pagamento per contanti",
      type: "cash",
      initialBalance: 0,
      user: User._id,
    });

    // se l'utente è vuoto genero un errore
    if (!User) throw new Error("Error while creating user");
    // se l'utente è creato gli invio la mail di conferma registrazione
    PostSendMail(User.email, `${User.name} ${User.surname}`).then((result) => {
      if (!result) throw new Error("Error while sending mail");
    });
    // genero un token di accesso
    const Token = JwtCreation(User._id);
    // se il token è vuoto genero un errore
    if (!Token) throw new Error("Error while generating token");
    // restituisco l'utente il token di accesso al frontend
    res.status(201).send({ User, token: Token });
  } catch (err) {
    console.error(err);
    res.status(401).send("Error while creating user");
  }
};

// POST /logout => logout utente (per JWT base non serve backend, basta togliere il token dal localStorage)
export const PostLogout = async (req, res) => {};

// GET login Google => è il link al server google
export const GetLoginGoogle = async (req, res) => {};

// GET callback Google => redirect al frontend
export const GetCallbackGoogle = async (req, res) => {
  console.log("AUTHENTICATION CONTROLLER => GetCallbackGoogle");
  // qui facciamo il redirect al frontend passandogli nella query string il jwt creato in passport che l'ha aggiunto in req.author
  console.log(req.user.token);
  res.redirect(`${process.env.FRONTEND_URL}?token=${req.user.token}`);
};
