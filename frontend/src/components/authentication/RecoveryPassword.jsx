import { Button, Container, Form, Row } from "react-bootstrap";

export const ChangePassword = ({ SetShowLoginResetPassword }) => {
  console.log("AUTHENTICATION => ChangePassword.jsx");
  // * STATI
  // * FUNZIONI
  // todo
  // !!! inviare mail all'utente per il recupero della password
  return (
    <Container>
      <Row>
        <h1>Password dimenticata</h1>
        <p>
          Inserisci la tua email e ti invieremo un link per il recupero della
          password.
        </p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci email"
              id="email"
              required
            />
          </Form.Group>
        </Form>
        <Button variant="primary">Invia</Button>
        <Button
          variant="primary"
          onClick={() => SetShowLoginResetPassword(false)}
        >
          Indietro
        </Button>
      </Row>
    </Container>
  );
};
