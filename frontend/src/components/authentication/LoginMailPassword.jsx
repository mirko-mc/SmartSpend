import { Button, Col, Form } from "react-bootstrap";
import { PostLogin } from "../../data/fetch";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";

export const LoginMailPassword = ({ SetShowLoginResetPassword }) => {
  console.log("AUTHENTICATION => HandleLogin");
  // * CONTEXT
  const { SetToken } = useContext(UserContext);
  // * FUNZIONI
  const HandleLogin = (event) => {
    // evito che si aggiorni la pagina
    event.preventDefault();
    PostLogin({ email: event.target[0].value, password: event.target[1].value })
      .then((data) => {
        localStorage.setItem("token", data.token);
        SetToken(data.token);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Col
      md={6}
      className="d-flex align-items-center justify-content-center flex-column"
    >
      <Form
        onSubmit={HandleLogin}
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
  );
};
