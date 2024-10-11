import { Button, Card, CardFooter } from "react-bootstrap";
import { SingleTransaction } from "./SingleTransaction";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetTransactions } from "../../data/fetch";
import { CardLoader } from "../loader/CardLoader";
import { useNavigate } from "react-router-dom";

export const RecentTransaction = ({ SetIsNewTransaction }) => {
  console.log("COMPONENT => RecentTransaction.jsx");
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  // * STATI
  const [Transactions, SetTransactions] = useState(null);
  const Navigate = useNavigate();
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser)
      GetTransactions()
        .then((data) => SetTransactions(data))
        .catch((err) => console.log(err));
  }, [LoggedUser]);

  if (!Transactions) return <CardLoader />;
  if (Transactions)
    return (
      <Card className="mb-3 shadow">
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>Transazioni recenti</Card.Title>
        </Card.Header>
        <Card.Body>
          {Transactions.slice(0, 5).map((transaction, index) => (
            <SingleTransaction
              key={transaction._id}
              transaction={transaction}
              index={index}
              type="mini"
            />
          ))}
        </Card.Body>
        <CardFooter className="d-flex justify-content-evenly">
          <Button variant={Theme} onClick={() => Navigate("/transactions")}>
            Visualizza tutte
          </Button>
          <Button variant={Theme} onClick={() => SetIsNewTransaction(true)}>
            Aggiungi transazione
          </Button>
        </CardFooter>
      </Card>
    );
};
