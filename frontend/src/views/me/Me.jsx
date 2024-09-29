import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export const Me = () => {
  console.log("VIEWS => Me.jsx");
  // * PROPS
  // * CONTEXT
  const { Token, LoggedUser } = useContext(UserContext);
  // * STATI
  // * FUNZIONI
  // ??? meglio usare map o foreach
  if (Token && LoggedUser)
    return (
      <Container>
        <Row>
          <h1>Dati utente</h1>
          <Col>
            <Form>
              {Object.keys(LoggedUser).map((key) => (
                <Form.Group key={key}>
                  <Row className="mb-2">
                    <Col md={6} className="w-25">
                      <Form.Label>{key}</Form.Label>
                    </Col>
                    <Col md={6} className="w-75">
                      <Form.Label>{LoggedUser[key]}</Form.Label>
                    </Col>
                  </Row>
                </Form.Group>
              ))}
            </Form>
            <Button variant="primary">Modifica dati</Button>
          </Col>
        </Row>
      </Container>
    );
};
