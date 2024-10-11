import { createContext, useEffect, useState } from "react";
import { GetMeInfo } from "../data/fetch";

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  console.log("CONTEXT => UserContextProvider.jsx");
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
    console.log("CONTEXT => UserContextProvider => GetMeData");
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
  const ThemeClassName = (Theme) =>
    !Theme ? "bg-warning text-dark" : "bg-dark text-warning";

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

// TODO
// * gestire il token ricevuto da Google che dovrebbe arrivare successivamente il le rotte che sono immediate
/**
       * const manageToken = function (){
            // recupero l'eventuale token dall'url (ricevuto da un login oauth)
            const objUrlParams = new URLSearchParams(window.location.search)
            const urlToken = objUrlParams.get('token')
            // verifico se è presente un token nel localstorage
            const storageToken = localStorage.getItem('token')
            // se c'è il token nell'url uso quello perchè è di sicuro il più recente
            if(urlToken){
                setToken(urlToken)
                localStorage.setItem('token', urlToken)
            }
            // se non c'è nell'url, ma c'è nello storage, allora considero quello
            if(!urlToken && storageToken){
                setToken(storageToken)
            }
        }
        useEffect(manageToken, [])
       */
