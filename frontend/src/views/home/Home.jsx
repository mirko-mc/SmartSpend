import { Button, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { LoginMailPassword } from "../../components/login/LoginMailPassword";
import { LoginGoogle } from "../../components/login/LoginGoogle";
import { ChangePassword } from "../../components/register/ChangePassword";
import { NewModals } from "../../components/modals/NewModals";

export const Home = () => {
  console.log("VIEW => Home.jsx");
  const { Token, SetToken } = useContext(UserContext);

  if (!Token)
    return (
      <Container>
        <Row>
          <LoginMailPassword />
          <LoginGoogle />
        </Row>
        <Row>
          <ChangePassword />
        </Row>
        <Row>
          <NewModals />
        </Row>
      </Container>
    );
  if (Token)
    return (
      <Container>
        <Row>
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              SetToken(null);
            }}
          >
            Logout
          </Button>
        </Row>
      </Container>
    );
};
