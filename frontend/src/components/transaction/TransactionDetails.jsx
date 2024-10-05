import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const TransactionDetails = () => {
  console.log("COMPONENT => TransactionDetails.jsx");
  // * CONTEXT
  // * STATI
  const { IdTransaction } = useParams();
  // * FUNZIONI
  const TransactionToRender = null;
  if (!IdTransaction)
    return (
      <Row>
        <Col xs={12} className="mb-3 d-flex">
          <Col>
            <Card>
              <Card.Header>Dettagli Transazione</Card.Header>
              <Card.Body>
                <Card.Title>Data: </Card.Title>
                <Card.Text>Importo: </Card.Text>
                <Card.Text>Descrizione: </Card.Text>
                <Card.Text>Utente: </Card.Text>
                <Card.Text>Categoria: </Card.Text>
                <Card.Text>Metodo di pagamento: </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Col>
      </Row>
    );
  return (
    <Row>
      <Col xs={12} key={TransactionToRender._id} className="mb-3 d-flex">
        <Col>
          <Card>
            <Card.Header>Dettagli Transazione</Card.Header>
            <Card.Body>
              <Card.Title>Data: {TransactionToRender.date}</Card.Title>
              <Card.Text>Importo: {TransactionToRender.amount}</Card.Text>
              <Card.Text>
                Descrizione: {TransactionToRender.description}
              </Card.Text>
              <Card.Text>Utente: {TransactionToRender.user?.name}</Card.Text>
              <Card.Text>
                Categoria: {TransactionToRender.category?.name}
              </Card.Text>
              <Card.Text>
                Metodo di pagamento: {TransactionToRender.paymentMethod?.name}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Col>
    </Row>
  );
};
