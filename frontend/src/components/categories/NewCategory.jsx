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

      <Form.Group as={Row} className="mb-3">
        <Col md={6} className="w-50"></Col>
        <Col md={6} className="w-50">
          <Form.Label>Colore</Form.Label>
          <Form.Control
            type="color"
            name="color"
            id="color"
            value={NewCPMFormValue.color}
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
          value={NewCPMFormValue.description}
          onChange={HandleOnChange}
        />
      </Form.Group>
    </Form>
  );
};
