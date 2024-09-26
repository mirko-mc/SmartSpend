import Bcrypt from "bcrypt";

export const userCheck = async (body) => {
  console.log("UTILS => userCheck");
  try {
    // definizione variabili dei dati da inviare al database
    const Name = body?.name;
    const Email = body?.email;
    let password = body?.password;
    const PasswordConfirm = body?.passwordConfirm;
    let avatar = body?.avatar;
    // controllo dati prima di inviarli al database
    // verifica campi
    if (!Name || !Email || !password || !PasswordConfirm)
      throw new Error("Please fill all the fields");
    // !!! sposto l'hash nel controlle
    // verifico la lunghezza della password
    if (password.length < 6)
      throw new Error("Password must be at least 6 characters long");
    // verifico la conferma della password
    if (password !== PasswordConfirm) throw new Error("Passwords do not match");
    // se le password sono valide, calcolo la hash della password
    password = await Bcrypt.hash(password, 10);
    // verifico che l'immagine sia valida altrimenti ne imposto una di default
    !avatar &&
      (avatar =
        "https://njhalloffame.org/wp-content/uploads/2021/04/generic-avatar-300x300.png");
    // se tutti i controlli sono andati a buon fine creo l'oggetto coi dati
    return {
      name: Name,
      surname: body?.surname,
      email: Email,
      password: password,
      avatar: avatar,
      surname: body?.surname,
      favoriteTheme: body?.favoriteTheme,
      googleId: body?.googleId,
    };
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const transactionCheck = async (body) => {
  console.log("UTILS => transactionCheck");
  try {
    const Date = body?.date;
    const Shop = body?.shop;
    const Address = body?.address;
    const Description = body?.description;
    const Amount = body?.amount;
    const Category = body?.category;
    const PaymentMethod = body?.paymentMethod;
    const User = body?.user;
    if (!Date || !Shop || !Description || !Amount || !Address)
      throw new Error("Please fill all the fields");
    if (!Category || !PaymentMethod || !User)
      throw new Error("Error while creating payment method");
    return {
      date: Date,
      shop: Shop,
      address: Address,
      description: Description,
      amount: Amount,
      category: Category,
      paymentMethod: PaymentMethod,
      user: User,
    };
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const categoryCheck = async (body) => {
  console.log("UTILS => categoryCheck");
  try {
    const Name = body?.name;
    const User = body?.user;
    const Description = body?.description;
    const Type = body?.type;
    const Color = body?.color;
    if (!Name || !Type) throw new Error("Please fill all the fields");
    if (!User) throw new Error("Error while creating category");
    return {
      name: Name,
      user: User,
      description: Description,
      type: Type,
      color: Color,
    };
  } catch (err) {
    console.log(err);
    return false;
  }
};
