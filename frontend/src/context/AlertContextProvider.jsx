import { createContext, useState } from "react";

export const AlertContext = createContext(null);
export const AlertContextProvider = ({ children }) => {
  // * STATI
  const [ShowAlert, SetShowAlert] = useState(null);
  // * FUNZIONI
  const SetAlertFormValue =async (Type, Variant, Title, Message) => {
    return { Type, Variant, Title, Message };
  };

  return (
    <AlertContext.Provider
      value={{ ShowAlert, SetShowAlert, SetAlertFormValue }}
    >
      {children}
    </AlertContext.Provider>
  );
};
