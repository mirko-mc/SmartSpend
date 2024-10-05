import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  PlaceholderButton,
  Row,
} from "react-bootstrap";
import { RecentTransaction } from "../../components/transaction/RecentTransaction.jsx";
import { NewTransaction } from "../../components/transaction/NewTransaction.jsx";
import { Charts } from "../../components/charts/Charts.jsx";
import { CardLoader } from "../../components/loader/CardLoader.jsx";

export const Dashboard = () => {
  console.log("VIEWS => Dashboard.jsx");
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  // * STATI
  const [IsPrivacy, SetIsPrivacy] = useState(true);
  const [IsNewTransaction, SetIsNewTransaction] = useState(false);
  // * FUNZIONI

  return (
    <Container data-bs-theme={Theme} bg={Theme}>
      <Row>
        <Col className="mb-3">
          <h1>Dashboard</h1>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          {!LoggedUser || !Theme ? (
            <CardLoader />
          ) : (
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title>Saldo totale</Card.Title>
                <Button
                  variant={"secondary"}
                  className="float-end"
                  onClick={() => SetIsPrivacy(!IsPrivacy)}
                  size="sm"
                >
                  {IsPrivacy ? "👁" : "🔐"}
                </Button>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {IsPrivacy ? "******" : LoggedUser.balance}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={6}>
          {!LoggedUser || !Theme ? (
            <CardLoader />
          ) : (
            <Card className="mb-3">
              <Card.Header>
                <Card.Title>Budget residuo</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {IsPrivacy ? "******" : LoggedUser.balance}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={5}>{!LoggedUser || !Theme ? <CardLoader /> : <Charts />}</Col>
        <Col md={2}>
          {!Theme ? (
            <PlaceholderButton />
          ) : (
            <Button
              variant={Theme}
              onClick={() => SetIsNewTransaction(!IsNewTransaction)}
            >
              Nuova transazione
            </Button>
          )}
        </Col>
        <Col md={5}>{!LoggedUser || !Theme ? <CardLoader /> : <Charts />}</Col>
      </Row>

      <Row>
        <Col md={12}>
          {!LoggedUser || !Theme ? (
            <CardLoader />
          ) : (
            IsNewTransaction && <NewTransaction />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {!LoggedUser || !Theme ? (
            <CardLoader />
          ) : (
            !IsNewTransaction && <RecentTransaction IsPrivacy={IsPrivacy} />
          )}
        </Col>
      </Row>
    </Container>
  );
};
