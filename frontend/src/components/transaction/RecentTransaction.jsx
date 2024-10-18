import { Button, Card, CardFooter } from "react-bootstrap";
import { SingleTransaction } from "./SingleTransaction";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetTransactions } from "../../data/fetch";
import { CardLoader } from "../loader/CardLoader";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";

export const RecentTransaction = ({ SetIsNewTransaction }) => {
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  const { SetAlertFormValue, SetShowAlert, ShowAlert } =
    useContext(AlertContext);
  // * STATI
  const [Transactions, SetTransactions] = useState(null);
  const Navigate = useNavigate();
  const [Loader, SetLoader] = useState(true);
  // * FUNZIONI
  useEffect(() => {
    SetLoader(true);
    if (LoggedUser)
      GetTransactions()
        .then((data) => SetTransactions(data))
        .catch(() => {
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
    SetLoader(false);
  }, [LoggedUser]);

  if (Loader) return <CardLoader />;
  if (Transactions)
    return (
      <Card className="mb-3 shadow">
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>Movimenti recenti</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          {ShowAlert?.Type === "getTransactions" && <MyAlert />}
          {!Transactions[0]?.date ? (
            <Card.Text className="text-center">
              Non ci sono movimenti recenti
            </Card.Text>
          ) : (
            Transactions.slice(0, 5).map((transaction, index) => (
              <SingleTransaction
                key={transaction._id}
                transaction={transaction}
                index={index}
                type="mini"
              />
            ))
          )}
        </Card.Body>
        <CardFooter className="d-flex justify-content-evenly">
          <Button
            variant={Theme === "dark" ? "outline-secondary" : "outline-primary"}
            onClick={() => Navigate("/transactions")}
          >
            Visualizza tutti
          </Button>
          <Button
            variant={Theme === "dark" ? "outline-secondary" : "outline-primary"}
            onClick={() => SetIsNewTransaction(true)}
          >
            Aggiungi movimento
          </Button>
        </CardFooter>
      </Card>
    );
};
