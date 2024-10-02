import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";

export const Me = () => {
  console.log("VIEWS => Me.jsx");
  // * PROPS
  // * CONTEXT
  const { Token, LoggedUser } = useContext(UserContext);
  // * STATI
  // * FUNZIONI
  // ??? meglio usare map o foreach
  // !!! iniziato styling a lavoro
  if (Token && LoggedUser)
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col sm={8} md={6} lg={4}>
            <Card className="mb-3">
              <Card.Header className="d-flex justify-content-between">
                <span className="">{LoggedUser.name}</span>
                <Button variant="outline-primary" size="sm">
                  Modifica dati
                </Button>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome"
                      value={LoggedUser.name}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cognome"
                      value={LoggedUser.surname}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={LoggedUser.email}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tema preferito</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tema"
                      value={LoggedUser.favoriteTheme}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button variant="outline-secondary" size="sm">
                  Annulla
                </Button>
                <Button variant="outline-primary" size="sm">
                  Salva
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
