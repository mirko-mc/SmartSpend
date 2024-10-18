import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { SingleTransaction } from "../../components/transaction/SingleTransaction";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetTransactions } from "../../data/fetch";
import { CardLoader } from "../../components/loader/CardLoader";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../../components/utils/MyAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { NewTransaction } from "../../components/transaction/NewTransaction";

export const AllTransactions = () => {
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const [Transactions, SetTransactions] = useState(null);
  const TransactionId = useParams().transactionId;
  const [IsNewTransaction, SetIsNewTransaction] = useState(false);
  const [ResultSearch, SetResultSearch] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser && !ShowAlert) {
      GetTransactions()
        .then((data) => SetTransactions(data))
        .catch((err) => {
          SetAlertFormValue(
            "getTransactions",
            "danger",
            "ERROR",
            "Errore nel recupero dei movimenti, riprova più tardi."
          ).then((AlertFormValue) => {
            SetShowAlert(AlertFormValue);
          });
          setTimeout(() => {
            SetShowAlert(false);
          }, 3 * 1000);
        });
    }
  }, [LoggedUser, ShowAlert]);

  const HandleChange = (e) => {
    e.preventDefault();
    SetResultSearch(
      Transactions.filter((transaction) =>
        transaction.shop.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    if (!e.target.value) SetResultSearch(null);
  };

  if (!Transactions) return <CardLoader />;
  if (TransactionId) return <Outlet />;
  if (IsNewTransaction)
    return (
      <Container className="pt-4">
        <Row>
          <h1 className="text-center mb-3">Nuovo movimento</h1>
          <Col>
            <NewTransaction SetIsNewTransaction={SetIsNewTransaction} />;
          </Col>
        </Row>
      </Container>
    );
  if (Transactions || ResultSearch)
    return (
      <Container className="pt-4">
        <Row>
          <h1 className="text-center mb-3">Movimenti in entrata e uscita</h1>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title>Elenco movimenti</Card.Title>
                <Button
                  variant={
                    Theme === "light" ? "outline-primary" : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => SetIsNewTransaction(true)}
                >
                  <span className="d-none d-md-inline">
                    Nuovo movimento &nbsp;
                  </span>
                  <FontAwesomeIcon
                    icon={faAdd}
                    size="xl"
                    onClick={() => SetIsNewTransaction(true)}
                  />
                </Button>
              </Card.Header>
              <Card.Body className="px-0">
                {ShowAlert?.Type === "getTransactions" && <MyAlert />}
                {!Transactions[0]?.date ? (
                  <Card.Text className="text-center">
                    Non ci sono movimenti.
                  </Card.Text>
                ) : (
                  <FormGroup className="mb-3 w-75 mx-auto">
                    <FormControl
                      type="text"
                      onChange={HandleChange}
                      placeholder="Cerca un movimento nel negozio...."
                    />
                  </FormGroup>
                )}

                {ResultSearch
                  ? ResultSearch.map((transaction, index) => (
                      <SingleTransaction
                        key={transaction._id}
                        transaction={transaction}
                        index={index}
                        type="mini"
                      />
                    ))
                  : Transactions.map((transaction, index) => (
                      <SingleTransaction
                        key={transaction._id}
                        transaction={transaction}
                        index={index}
                        type="mini"
                      />
                    ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
