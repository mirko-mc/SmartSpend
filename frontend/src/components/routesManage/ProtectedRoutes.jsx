import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export const ProtectedRoutes = () => {
  // * CONTEXT
  const { Token, SetToken, ThemeClassName } = useContext(UserContext);
  // * FUNZIONI
  // prendo il token dall'url
  const JwtToken = new URLSearchParams(window.location.search).get("token");
  // * blocco accesso google
  useEffect(() => {
    // se esiste salvo il token nel localStorage, nel context e redirect alla home
    if (JwtToken) {
      localStorage.setItem("token", JwtToken);
      SetToken(JwtToken);
    }
  }, []);
  // * fine blocco accesso google
  // * outlet è un componente standard che permette di renderizzare le rotte innestate (figlie)
  return Token ? (
    <>
      <Container fluid className={ThemeClassName()}>
        <Outlet />
      </Container>
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};
