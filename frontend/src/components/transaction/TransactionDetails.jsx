import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GetTransactions } from "../../data/fetch";

export const TransactionDetails = ({ transaction }) => {
  console.log("COMPONENT => Transaction.jsx");
  // * STATI
  const [TransactionToRender, SetTransactionToRender] = useState(null);
  const Navigate = useNavigate();
  const { transactionId } = useParams();
  // * FUNZIONI
  const HandleGetTransaction = async () => {
    GetTransactions(transactionId)
      .then((data) => SetTransactionToRender(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!transaction) HandleGetTransaction();
  }, [TransactionToRender]);
  
  console.log(transaction);
  console.log(TransactionToRender);
  if (!TransactionToRender && !transaction)
    return (
      <Container>
        <Row>
          <Col className="d-flex justify-content-center align-items-center m-5">
            Loading...
          </Col>
        </Row>
      </Container>
    );

  if (!TransactionToRender)
    return (
      <Card className="mb-3 shadow">
        <Card.Header className="d-flex justify-content-between">
          <Button
            variant="primary"
            onClick={() => Navigate(`/transactions/${transaction._id}`)}
          >
            Visualizza
          </Button>
          <Card.Title>Transazione n° {transaction._id}</Card.Title>
          <Button variant="outline-secondary" onClick={() => Navigate(-1)}>
            IndietroIndietro
          </Button>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <Row className="mb-2">
            <Col xs={12} md={4} className="d-flex align-items-center">
              Data: {transaction.date}
            </Col>
            <Col xs={12} md={4} className="d-flex align-items-center">
              Categoria: {transaction.category?.name}
            </Col>
            <Col xs={12} md={4} className="d-flex align-items-center">
              Importo: {transaction.amount} €
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="d-flex align-items-center">
              Descrizione: {transaction.description}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  if (TransactionToRender)
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
