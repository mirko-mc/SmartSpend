import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { RecentTransaction } from "../../components/transaction/RecentTransaction.jsx";
import { NewTransaction } from "../../components/transaction/NewTransaction.jsx";
import { Charts } from "../../components/charts/Charts.jsx";

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
          <Col md={5}>
            <Charts />
          </Col>
          <Col md={2}>
            <Button
              variant="primary"
              onClick={() => SetIsNewTransaction(!IsNewTransaction)}
            >
              Nuova transazione
            </Button>
          </Col>
          <Col md={5}>
            <Charts />
          </Col>
        </Row>

        <Row>
          <Col md={12}>{IsNewTransaction && <NewTransaction />}</Col>
        </Row>
        <Row>
          <Col>{!IsNewTransaction && <RecentTransaction />}</Col>
        </Row>
      </Container>
    );
};
