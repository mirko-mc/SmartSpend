import { Button, Card, Col } from "react-bootstrap";
import { Transaction } from "./Transaction";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetTransactions } from "../../data/fetch";

export const RecentTransaction = ({ SetIsNewTransaction }) => {
  console.log("COMPONENT => RecentTransaction.jsx");
  // * CONTEXT
  const { LoggedUser } = useContext(UserContext);
  // * STATI
  const [Transactions, SetTransactions] = useState(null);
  // * FUNZIONI
  const HandleGetTransaction = async () => {
    const data = await GetTransactions();
    if (data) SetTransactions(data);
  };
  useEffect(() => {
    if (LoggedUser) HandleGetTransaction();
  }, [LoggedUser]);

  if (Transactions)
    return (
        <Card className="mb-3 shadow">
          <Card.Header className="d-flex justify-content-between">
            <Card.Title>Transazioni recenti</Card.Title>
            <Button
              variant="secondary"
              className="float-end"
              // onClick={SetIsNewTransaction(true)}
            >
              ➕
            </Button>
          </Card.Header>
          <Card.Body>
            {Transactions.map((transaction) => (
              <Transaction key={transaction._id} transaction={transaction} />
            ))}
          </Card.Body>
        </Card>
    );
};
