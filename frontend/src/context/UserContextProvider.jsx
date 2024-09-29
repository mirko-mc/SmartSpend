import { createContext, useEffect, useState } from "react";
import { GetMeInfo } from "../data/fetch";

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  // stato per contenere l'oggetto coi dati dell'utente loggato inizializzato a null (non loggato)
  const [LoggedUser, SetLoggedUser] = useState(null);
  // stato per contenere il token di autenticazione inizializzato a null (non loggato)
  const [Token, SetToken] = useState(localStorage.getItem("token"));

  // TODO
  // * creare funzione per settare e rimuovere token sia da localstorage che da stato e passarla come context anziché passare le singole costanti
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
  // funzione asincrona per recuperare i dati dell'utente loggato e settarli nello stato
  const GetMeData = async () => {
    console.log("CONTEXT => UserContextProvider => GetMeData");
    try {
      // setto i dati dell'utente nello stato
      const MeData = await GetMeInfo();
      console.log("MeData", MeData);
      SetLoggedUser(MeData);
    } catch (err) {
      console.log("sono qui");
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
