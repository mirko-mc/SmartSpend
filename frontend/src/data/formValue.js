export const SetInitialFormValues = (FormValuesType) => {
  switch (FormValuesType) {
    case "user":
      return {
        name: "",
        surname: "",
        birthdate: "",
        email: "",
        password: "",
        passwordConfirm: "",
        avatar: "",
        favoriteTheme: "",
        balance: "",
        // googleId: "",
        // verifiedAt: "",
      };
    case "paymentMethod":
      return {
        name: "",
        description: "",
        type: "",
        inOut: "",
        initialBalance: "",
        user: "",
      };
    case "category":
      return {
        name: "",
        user: "",
        type: "",
        description: "",
        color: "",
      };
    case "transaction":
      return {
        date: "",
        shop: "",
        address: "",
        description: "",
        amount: "",
        category: "",
        paymentMethod: "",
        user: "",
        inOut: "",
      };
    case "typePaymentMethod":
      return {
        debitCard: "Carta di debito",
        creditCard: "Carta di credito",
        cash: "Contanti",
        digitalWallet: "Portafoglio digitale",
      };
    default:
      return { message: "Type not found" };
  }
};
