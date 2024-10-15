import { createContext, useEffect, useState } from "react";
import { GetMeInfo } from "../data/fetch";

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  // * STATI
  // stato per contenere l'oggetto coi dati dell'utente loggato inizializzato a null (non loggato)
  const [LoggedUser, SetLoggedUser] = useState(null);
  // stato per contenere il token di autenticazione inizializzato a null (non loggato)
  const [Token, SetToken] = useState(localStorage.getItem("token"));
  const [Theme, SetTheme] = useState("light");
  const [IsPrivacy, SetIsPrivacy] = useState(false);
  // * FUNZIONI
  // funzione per rimuovere il token dal localStorage e dallo stato
  const Logout = () => {
    localStorage.removeItem("token");
    SetToken(null);
    SetLoggedUser(null);
  };

  // funzione asincrona per recuperare i dati dell'utente loggato e settarli nello stato
  const GetMeData = async () => {
    try {
      // setto i dati dell'utente nello stato
      const MeData = await GetMeInfo();
      SetLoggedUser(MeData);
    } catch (err) {
      console.log(err);
      // rimuovo il token dal localStorage e dallo stato
      Logout();
    }
  };
  // use effect che al cambio del Token esegue la funzione asincrona per settare i valori nei rispettivi stati
  useEffect(() => {
    Token && GetMeData();
  }, [Token]);

  // salvo il tema preferito dell'utente nello stato
  useEffect(() => {
    LoggedUser && SetTheme(LoggedUser.favoriteTheme);
  }, [LoggedUser]);

  // gestisco il className del tema
  const ThemeClassName = () => (Theme === "light" ? "light" : "dark");

  // valori resi disponibili tramite context
  const Value = {
    LoggedUser,
    Token,
    SetToken,
    Logout,
    Theme,
    SetTheme,
    IsPrivacy,
    SetIsPrivacy,
    ThemeClassName,
  };
  return <UserContext.Provider value={Value}>{children}</UserContext.Provider>;
};
