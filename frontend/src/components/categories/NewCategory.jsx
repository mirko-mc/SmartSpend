import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { SetInitialFormValues } from "../../data/formValue";
import { UserContext } from "../../context/UserContextProvider";
import { PostCategory } from "../../data/fetch";

export const NewCategory = () => {
  console.log("COMPONENT => NewTransaction.jsx");
  // * CONTEXT
  const { LoggedUser } = useContext(UserContext);
  // * STATI
  const [NewCategory, SetNewCategory] = useState(
    SetInitialFormValues("category")
  );
  // * FUNZIONI
  // gestisco l'inserimento dei dati nel form value raccogliendoli dagli input dell'utente
  const HandleOnChange = (e) => {
    SetNewCategory({ ...NewCategory, [e.target.name]: e.target.value });
    if (!NewCategory.user)
      SetNewCategory({ ...NewCategory, user: LoggedUser._id });
  };
  // gestisco il salvataggio della nuova transazione
  const HandleSaveNewCategory = async () => {
    // todo gestire errore creazione categoria
    // todo implementare alert di conferma/errore creazione categoria
    await PostCategory(NewCategory);
  };
  return (
    <Col>
      <Card className="mb-3 shadow">
        <Form onSubmit={HandleSaveNewCategory}>
          <Card.Header>
            <Card.Title>Nuova categoria</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome"
                name="name"
                id="name"
                maxLength={50}
                value={NewCategory.name}
                onChange={HandleOnChange}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col md={6} className="w-50">
                <Form.Label>Tipo</Form.Label>
                <Form.Select
                  name="type"
                  id="type"
                  required
                  value={NewCategory.type}
                  onChange={HandleOnChange}
                >
                  <option value="in">Entrata</option>
                  <option value="out">Uscita</option>
                </Form.Select>
              </Col>
              <Col md={6} className="w-50">
                <Form.Label>Colore</Form.Label>
                <Form.Control
                  type="color"
                  name="color"
                  id="color"
                  value={NewCategory.color}
                  onChange={HandleOnChange}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci descrizione"
                name="description"
                id="description"
                maxLength={50}
                value={NewCategory.description}
                onChange={HandleOnChange}
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary">Annulla ❌</Button>
            <Button variant="primary"type="submit">Salva 💾</Button>
          </Card.Footer>
        </Form>
      </Card>
    </Col>
  );
};
