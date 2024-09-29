import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate, Outlet } from "react-router-dom";

export const UnprotectedRoutes = () => {
  console.log("ROUTES MANAGE => UnprotectedRoutes.jsx");
  const { Token } = useContext(UserContext);
  // * se il token non è presente, renderizza i figli che sarà la schermata di login altrimenti renderizza la home
  return !Token ? <Outlet /> : <Navigate to="/dashboard" />;
};
