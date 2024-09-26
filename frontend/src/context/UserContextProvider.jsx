import { createContext, useEffect, useState } from "react";
import { GetUser } from "../data/fetch";

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  // stato per contenere l'oggetto coi dati dell'utente loggato inizializzato a null (non loggato)
  const [LoggedUser, SetLoggedUser] = useState(null);
  // stato per contenere il token di autenticazione inizializzato a null (non loggato)
  const [Token, SetToken] = useState(localStorage.getItem("token"));

  // TODO verificare
  // funzione asincrona per recuperare i dati dell'utente loggato e settarli nello stato
  const GetMeData = async () => {
    console.log("CONTEXT => UserContextProvider => GetMeData");
    try {
      // setto i dati dell'utente nello stato
      const MeData = await GetUser();
      SetLoggedUser(MeData);
    } catch (err) {
      // rimuovo il token dal localStorage e dallo stato
      localStorage.removeItem("token");
      SetToken(null);
    }
  };
  // use effect che al cambio del Token esegue la funzione asincrona per settare i valori nei rispettivi stati
  useEffect(() => {
    Token && GetMeData();
  }, [Token]);

  // valori resi disponibili tramite context
  const Value = { LoggedUser, Token, SetToken };
  return <UserContext.Provider value={Value}>{children}</UserContext.Provider>;
};
