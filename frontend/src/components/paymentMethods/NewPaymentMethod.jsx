import { Col, Form, Row } from "react-bootstrap";

export const NewPaymentMethod = ({
  SetNewCPMFormValue,
  HandleNewCPM,
  NewCPMFormValue,
}) => {
  // * CONTEXT
  // * STATI

  // * FUNZIONI
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
        <Col md={6} className="w-50">
          <Form.Label>Tipo</Form.Label>
          <Form.Select
            name="type"
            id="type"
            required
            value={NewCPMFormValue.type}
            onChange={HandleOnChange}
          >
            <option value="">Seleziona un metodo di pagamento</option>
            <option value="cash">Contanti</option>
            <option value="debitCard">Carta di debito</option>
            <option value="creditCard">Carta di credito</option>
            <option value="digitalWallet">Portafoglio digitale</option>
          </Form.Select>
        </Col>
        <Col md={6} className="w-50">
          <Form.Label>Saldo iniziale</Form.Label>
          <Form.Control
            type="number"
            name="initialBalance"
            id="initialBalance"
            value={NewCPMFormValue.initialBalance}
            onChange={HandleOnChange}
            min={0}
            step={0.01}
            required
          />
        </Col>
      </Form.Group>

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
