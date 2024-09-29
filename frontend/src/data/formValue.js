export const SetInitialFormValues = (FormValuesType) => {
  switch (FormValuesType) {
    case "user":
      return {
        name: "",
        surname: "",
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
      };
    default:
      return { message: "Type not found" };
  }
};
