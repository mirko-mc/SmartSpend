import { Button, Col, Row } from "react-bootstrap";

export const ChangePassword = () => {
  // FUNZIONI
  // todo
  // se il token è presente, 
  return (
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
  );
};
