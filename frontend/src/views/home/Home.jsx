import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { PostLogin } from "../../data/fetch";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";

export const Home = () => {
  console.log("VIEW => Home.jsx");
  const { SetToken } = useContext(UserContext);
  const handleLogin = (event) => {
    event.preventDefault();
    PostLogin({
      email: event.target[0].value,
      password: event.target[1].value,
    })
      .then((data) => {
        console.log(data);
        SetToken(data.token);
        localStorage.setItem("token", data.token);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container className="d-flex flex-column align-items-center">
      <Row className="mb-3">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <Form
            onSubmit={handleLogin}
            className="d-flex flex-column align-items-center"
          >
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci password"
                minLength={6}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Accedi
            </Button>
          </Form>
        </Col>

        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <a href={`${process.env.REACT_APP_API_URL}/api/v1/auth/login-google`}>
            <Button
              className="d-flex align-items-center justify-content-center"
              variant="primary"
              type="submit"
            >
              Login con Google
            </Button>
          </a>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-center align-items-center">
          <div className="d-flex align-items-center">
            <Button variant="primary" type="button">
              Registrazione
            </Button>
            <Button variant="link" type="button" className="ms-2">
              Recupera password
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
