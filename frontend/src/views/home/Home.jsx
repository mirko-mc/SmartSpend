import { Button, Col, Container, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { LoginMailPassword } from "../../components/authentication/LoginMailPassword";
import { LoginGoogle } from "../../components/authentication/LoginGoogle";
import { Dashboard } from "../dashboard/Dashboard";
import { Register } from "../../components/authentication/Register";

export const Home = () => {
  // * CONTEXT
  const { Token, Theme, ThemeClassName } = useContext(UserContext);
  // * STATI
  const [ShowLoginRegister, SetShowLoginRegister] = useState(true);
  // * FUNZIONI
  if (!Token)
    return (
      <Container
        data-bs-theme={Theme}
        className={`h-100 ${ThemeClassName()} d-flex justify-content-center align-items-center`}
        bg={`bg-${Theme}`}
        fluid
      >
        {ShowLoginRegister && (
          <Row>
            <h1 className="text-center">Benvenuto su SmartSpend</h1>
            <p className="text-center">
              Il sito che ti permette di creare la cronologia dei tuoi movimenti
              finanziari.
            </p>
            <h4 className="text-center">Accedi...</h4>
            <LoginMailPassword />
            <LoginGoogle />
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <h4 className="text-center mt-5">...oppure registrati</h4>
              <Button
                className="mt-3"
                variant="dark"
                onClick={() => SetShowLoginRegister(false)}
              >
                Registrazione
              </Button>
            </Col>
          </Row>
        )}
        {!ShowLoginRegister && (
          <Row>
            <Col>
              <Register SetShowLoginRegister={SetShowLoginRegister} />
            </Col>
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
