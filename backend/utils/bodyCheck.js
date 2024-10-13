export const userCheck = async (body, post) => {
  try {
    // definizione variabili dei dati da inviare al database
    const Name = body?.name;
    const Email = body?.email;
    const Password = body?.password;
    const PasswordConfirm = body?.passwordConfirm;
    const Birthdate = body?.birthdate;
    // let avatar = body?.avatar;
    // controllo dati prima di inviarli al database
    // verifica campi
    if (
      post &&
      (!Name || !Email || !Password || !PasswordConfirm || !Birthdate)
    )
      throw new Error("Please fill all the fields");
    // verifico la lunghezza della password
    if (Password && Password.length < 6)
      throw new Error("Password must be at least 6 characters long");
    // verifico la conferma della password
    if (Password && Password !== PasswordConfirm)
      throw new Error("Passwords do not match");
    // verifico che l'immagine sia valida altrimenti ne imposto una di default
    // console.log(avatar);
    // !avatar &&
    // (avatar =
    // "https://njhalloffame.org/wp-content/uploads/2021/04/generic-avatar-300x300.png");
    // se tutti i controlli sono andati a buon fine creo l'oggetto coi dati
    return {
      name: Name,
      surname: body?.surname,
      birthdate: Birthdate,
      email: Email,
      password: Password,
      // avatar: avatar,
      favoriteTheme: body?.favoriteTheme,
      googleId: body?.googleId,
      verifiedAt: body?.verifiedAt,
    };
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const transactionCheck = async (body, post) => {
  try {
    const Date = body?.date;
    const Shop = body?.shop;
    const Address = body?.address;
    const Description = body?.description;
    const Amount = body?.amount;
    const Category = body?.category;
    const PaymentMethod = body?.paymentMethod;
    const User = body?.user;
    const InOut = body?.inOut;
    if (
      post &&
      (!Date || !Shop || !Description || !Amount || !Address || !InOut)
    )
      throw new Error("Please fill all the fields");
    if (post && (!Category || !PaymentMethod || !User))
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
      inOut: InOut,
    };
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const categoryCheck = async (body, post) => {
  try {
    const Name = body?.name;
    const User = body?.user;
    const Description = body?.description;
    const Color = body?.color;
    if (post && !Name) throw new Error("Please fill all the fields");
    if (post && !User) throw new Error("Error while creating category");
    return {
      name: Name,
      user: User,
      description: Description,
      color: Color,
    };
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const paymentMethodCheck = async (body, post) => {
  try {
    const Name = body?.name;
    const Description = body?.description;
    const Type = body?.type;
    const InitialBalance = body?.initialBalance;
    const User = body?.user;
    if (post && (!Name || !Type)) throw new Error("Please fill all the fields");
    if (post && InitialBalance >= 0)
      return {
        name: Name,
        user: User,
        description: Description,
        type: Type,
        initialBalance: InitialBalance,
      };
    else if (!post)
      return {
        name: Name,
        user: User,
        description: Description,
        type: Type,
        initialBalance: InitialBalance,
      };
    else throw new Error("Initial balance must be 0 or positive");
  } catch (err) {
    console.log(err);
    return false;
  }
};
