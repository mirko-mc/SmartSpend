import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import {
  Button,
  Card,
  CardBody,
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
import { GetTotals } from "../../data/fetch.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export const Dashboard = () => {
  console.log("VIEWS => Dashboard.jsx");
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  // * STATI
  const [IsPrivacy, SetIsPrivacy] = useState(true);
  const [IsNewTransaction, SetIsNewTransaction] = useState(false);
  // * FUNZIONI
  // * STATI
  const [TotalIn, SetTotalIn] = useState(null);
  const [TotalOut, SetTotalOut] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    LoggedUser &&
      GetTotals(LoggedUser._id).then((data) => {
        SetTotalIn(data.totalIn);
        SetTotalOut(data.totalOut);
      });
  }, [LoggedUser]);
  if (LoggedUser)
    return (
      <Container data-bs-theme={Theme} bg={Theme}>
        <Row>
          <Col className="mb-3">
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
                  <Button
                    variant={Theme}
                    className="float-end"
                    onClick={() => SetIsPrivacy(!IsPrivacy)}
                    size="sm"
                  >
                    {IsPrivacy ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {IsPrivacy ? "******" : TotalIn - TotalOut}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col md={6}>
            {!LoggedUser || !Theme ? (
              <CardLoader />
            ) : (
              <Card className="shadow h-100 mb-0 p-0">
                <CardBody>
                  <Charts TotalIn={TotalIn} TotalOut={TotalOut} />
                </CardBody>
              </Card>
            )}
          </Col>
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
