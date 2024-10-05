import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { SingleTransaction } from "./SingleTransaction";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetTransactions } from "../../data/fetch";
import { CardLoader } from "../loader/CardLoader";

export const RecentTransaction = ({ IsPrivacy }) => {
  console.log("COMPONENT => RecentTransaction.jsx");
  // * CONTEXT
  const { LoggedUser } = useContext(UserContext);
  // * STATI
  const [Transactions, SetTransactions] = useState(null);
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
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Data</th>
                <th>Importo</th>
                <th>Descrizione</th>
                <th>Metodo di pagamento</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {Transactions.slice(0, 5).map((transaction) => (
                <SingleTransaction
                  key={transaction._id}
                  transaction={transaction}
                  IsPrivacy={IsPrivacy}
                />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
};
