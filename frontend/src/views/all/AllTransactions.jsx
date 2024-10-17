import {
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

export const AllTransactions = () => {
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const [Transactions, SetTransactions] = useState(null);
  const TransactionId = useParams();
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser) {
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
          }, 5 * 1000);
        });
    }
  }, [LoggedUser]);
  const HandleChange = (e) => {
    // todo implementa ricerca
  };
  if (!Transactions) return <CardLoader />;

  if (TransactionId?.transactionId) return <Outlet />;

  if (Transactions)
    return (
      <Container className="pt-xs-2 pt-md-3 pt-lg-5">
        <Row>
          <h1 className="text-center mb-3">Movimenti in entrata e uscita</h1>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title>Elenco movimenti</Card.Title>
              </Card.Header>
              <Card.Body>
                <FormGroup>
                  <FormControl type="text" onChange={HandleChange} />
                </FormGroup>

                {ShowAlert?.Type === "getTransactions" && <MyAlert />}
                {!Transactions[0]?.date ? (
                  <Card.Text className="text-center">
                    Non ci sono movimenti.
                  </Card.Text>
                ) : (
                  Transactions.map((transaction) => (
                    <SingleTransaction
                      key={transaction._id}
                      transaction={transaction}
                      type="mini"
                    />
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
