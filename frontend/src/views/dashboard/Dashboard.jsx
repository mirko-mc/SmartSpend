import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { RecentTransaction } from "../../components/transaction/RecentTransaction.jsx";
import { NewTransaction } from "../../components/transaction/NewTransaction.jsx";
import { Charts } from "../../components/charts/Charts.jsx";
import { CardLoader } from "../../components/loader/CardLoader.jsx";
import { GetTotals } from "../../data/fetch.js";

export const Dashboard = () => {
  console.log("VIEWS => Dashboard.jsx");
  // * CONTEXT
  const { LoggedUser, Theme, IsPrivacy, ThemeClassName } =
    useContext(UserContext);
  // * STATI
  const [IsNewTransaction, SetIsNewTransaction] = useState(false);
  // * FUNZIONI
  // * STATI
  const [TotalIn, SetTotalIn] = useState(null);
  const [TotalOut, SetTotalOut] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    LoggedUser &&
      !IsNewTransaction &&
      GetTotals(LoggedUser._id).then((data) => {
        SetTotalIn(data.totalIn);
        SetTotalOut(data.totalOut);
      });
  }, [LoggedUser, IsNewTransaction]);

  if (LoggedUser)
    return (
      <Container data-bs-theme={Theme} className={`pt-3 ${ThemeClassName()}`}>
        <Row className="mb-3">
          <Col>
            <h1>Dashboard</h1>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            {!LoggedUser || !Theme ? (
              <CardLoader />
            ) : (
              <Card className="shadow h-100 mb-0 p-0">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <Card.Title>Saldo totale</Card.Title>
                </Card.Header>
                <Card.Body className="d-flex justify-content-center align-items-center">
                  <Card.Text className="display-1 text-center fw-bold">
                    {IsPrivacy ? "******" : (TotalIn - TotalOut).toFixed(2)}
                  </Card.Text>
                </Card.Body>
                <CardFooter className="text-center">
                  {TotalIn - TotalOut > 0 ? "Sei in credito" : "Sei in debito"}
                </CardFooter>
              </Card>
            )}
          </Col>

          <Col md={6}>
            {!LoggedUser || !Theme ? (
              <CardLoader />
            ) : (
              <Card className="shadow h-100 mb-0 p-0">
                <CardHeader>
                  <CardTitle>Rapporto entrate - uscite</CardTitle>
                </CardHeader>
                <CardBody>
                  <Charts TotalIn={TotalIn} TotalOut={TotalOut} />
                </CardBody>
                <CardFooter className="text-center">
                  {
                    <CardText>
                      Entrate:{" "}
                      {((TotalIn / (TotalIn + TotalOut)) * 100).toFixed(2)}% -
                      Uscite:{" "}
                      {((TotalOut / (TotalIn + TotalOut)) * 100).toFixed(2)}%
                    </CardText>
                  }
                </CardFooter>
              </Card>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            {!LoggedUser || !Theme ? (
              <CardLoader />
            ) : (
              IsNewTransaction && (
                <NewTransaction SetIsNewTransaction={SetIsNewTransaction} />
              )
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {!LoggedUser || !Theme ? (
              <CardLoader />
            ) : (
              !IsNewTransaction && (
                <RecentTransaction SetIsNewTransaction={SetIsNewTransaction} />
              )
            )}
          </Col>
        </Row>
      </Container>
    );
};
