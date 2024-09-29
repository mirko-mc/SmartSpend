import { Button, Container, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { LoginMailPassword } from "../../components/authentication/LoginMailPassword";
import { LoginGoogle } from "../../components/authentication/LoginGoogle";
import { ChangePassword } from "../../components/authentication/RecoveryPassword";
import { Dashboard } from "../dashboard/Dashboard";
import { Register } from "../../components/authentication/Register";

export const Home = () => {
  console.log("VIEW => Home.jsx");
  // * CONTEXT
  const { Token, SetToken } = useContext(UserContext);
  // * STATI
  const [ShowLoginRegister, SetShowLoginRegister] = useState(true);
  const [ShowLoginResetPassword, SetShowLoginResetPassword] = useState(false);
  /**
   * * login
   * * register
   * * recupero password
   * * login register
   * *  - v    - f
   * * login reset
   * *  - v    - r
   */
  // * FUNZIONI
  if (!Token)
    return (
      <Container>
        {ShowLoginRegister && (
          <Row>
            {ShowLoginResetPassword ? (
              <ChangePassword
                SetShowLoginResetPassword={SetShowLoginResetPassword}
              />
            ) : (
              <>
                <LoginMailPassword
                  SetShowLoginResetPassword={SetShowLoginResetPassword}
                />
                <LoginGoogle />
              </>
            )}
            <Button
              variant="primary"
              onClick={() => SetShowLoginRegister(false)}
            >
              Registrazione
            </Button>
          </Row>
        )}
        {!ShowLoginRegister && (
          <Row>
            <Register />
            <Button variant="link" onClick={() => SetShowLoginRegister(true)}>
              Vai ai metodi d'accesso
            </Button>
          </Row>
        )}
      </Container>
    );
  if (Token)
    return (
      <Container>
        <Row>
          <Dashboard />
        </Row>
      </Container>
    );
};
