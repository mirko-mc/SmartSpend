import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { RecentTransaction } from "../../components/transaction/RecentTransaction.jsx";
import { NewTransaction } from "../../components/transaction/NewTransaction.jsx";

export const Dashboard = () => {
  console.log("VIEWS => Dashboard.jsx");
  // * CONTEXT
  const { LoggedUser } = useContext(UserContext);
  console.log(LoggedUser);
  // * STATI
  const [IsPrivacy, SetIsPrivacy] = useState(true);
  const [IsNewTransaction, SetIsNewTransaction] = useState(false);
  // todo sistemare il rendering condizionale della nuova transazione e lista transazioni in base allo stato
  // * FUNZIONI
  if (LoggedUser)
    return (
      <Container>
        <Row>
          <Col md={12} className="mb-3 d-flex justify-content-between">
            <h1>Dashboard - {LoggedUser.name}</h1>
            <Button
              variant="secondary"
              className="float-end"
              onClick={() => SetIsPrivacy(!IsPrivacy)}
            >
              {IsPrivacy ? "👁" : "🔐"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Card>
              <Card.Header>
                <Card.Title>Saldo totale</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {IsPrivacy ? "******" : LoggedUser.balance}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Row>
                  <Col xs={3}>
                    <Image src="https://picsum.photos/200" rounded />
                  </Col>
                  <Col xs={9}>
                    <Card.Title>Budget residuo</Card.Title>
                    <Card.Text>{LoggedUser.name}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Row className="mb-3">
              <Col xs={6}>
                <Card>
                  <Card.Header>Grafico 1</Card.Header>
                  <Card.Body>
                    <p>GRAFICO</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6}>
                <Card>
                  <Card.Header>Grafico 2</Card.Header>
                  <Card.Body>
                    <p>GRAFICO</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6}>
                <Card>
                  <Card.Header>Grafico 3</Card.Header>
                  <Card.Body>
                    <p>GRAFICO</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6}>
                <Card>
                  <Card.Header>Grafico 4</Card.Header>
                  <Card.Body>
                    <p>GRAFICO</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <NewTransaction SetIsNewTransaction={SetIsNewTransaction} />
          </Col>
        </Row>
        <Row>
          <Col>
            <RecentTransaction SetIsNewTransaction={SetIsNewTransaction} />
          </Col>
        </Row>
      </Container>
    );
};
