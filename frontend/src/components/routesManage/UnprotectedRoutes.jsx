import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export const UnprotectedRoutes = () => {
  console.log("ROUTES MANAGE => UnprotectedRoutes.jsx");
  const { Token, ThemeClassName } = useContext(UserContext);
  // * se il token non è presente, renderizza i figli che sarà la schermata di login altrimenti renderizza la home
  return !Token ? (
    <>
      <Container fluid className={ThemeClassName()}>
        <Outlet />
      </Container>
    </>
  ) : (
    <Navigate to="/dashboard" />
  );
};
