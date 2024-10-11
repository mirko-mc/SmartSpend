import { Button, Container, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { LoginMailPassword } from "../../components/authentication/LoginMailPassword";
import { LoginGoogle } from "../../components/authentication/LoginGoogle";
import { Dashboard } from "../dashboard/Dashboard";
import { Register } from "../../components/authentication/Register";

export const Home = () => {
  console.log("VIEW => Home.jsx");
  // * CONTEXT
  const { Token, Theme, ThemeClassName } = useContext(UserContext);
  // * STATI
  const [ShowLoginRegister, SetShowLoginRegister] = useState(true);
  // * FUNZIONI
  if (!Token)
    return (
      <Container data-bs-theme={Theme} className={ThemeClassName()}>
        {ShowLoginRegister && (
          <Row>
            <LoginMailPassword />
            <LoginGoogle />
            <Button variant={Theme} onClick={() => SetShowLoginRegister(false)}>
              Registrazione
            </Button>
          </Row>
        )}
        {!ShowLoginRegister && (
          <Row>
            <Register SetShowLoginRegister={SetShowLoginRegister}/>
            
          </Row>
        )}
      </Container>
    );
  if (Token && Theme)
    return (
      <Container data-bs-theme={Theme} bg={`bg-${Theme}`}>
        <Row>
          <Dashboard />
        </Row>
      </Container>
    );
};
