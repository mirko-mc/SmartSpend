import { Col, Form, Row } from "react-bootstrap";

export const NewCategory = ({
  SetNewCPMFormValue,
  HandleNewCPM,
  NewCPMFormValue,
}) => {
  // * CONTEXT
  // * STATI
  // * FUNZIONI
  // gestisco l'inserimento dei dati nel form value raccogliendoli dagli input dell'utente
  const HandleOnChange = (e) => {
    SetNewCPMFormValue({ ...NewCPMFormValue, [e.target.name]: e.target.value });
  };
  return (
    <Form onSubmit={HandleNewCPM}>
      <Row>
        <Col xs={3}>
          <Form.Group className="mb-3">
            <Form.Label>Colore</Form.Label>
            <Form.Control
              type="color"
              name="color"
              id="color"
              value={NewCPMFormValue.color}
              onChange={HandleOnChange}
            />
          </Form.Group>
        </Col>
        <Col xs={9}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci nome"
              name="name"
              id="name"
              maxLength={50}
              value={NewCPMFormValue.name}
              onChange={HandleOnChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Descrizione</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          rows={3}
          placeholder="Inserisci descrizione"
          name="description"
          id="description"
          maxLength={50}
          value={NewCPMFormValue.description}
          onChange={HandleOnChange}
        />
      </Form.Group>
    </Form>
  );
};
