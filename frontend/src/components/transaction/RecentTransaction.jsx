import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { TransactionDetails } from "./TransactionDetails";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetTransactions } from "../../data/fetch";

export const RecentTransaction = () => {
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

  if (!Transactions)
    return (
      <Container>
        <Row>
          <Col>Loading...</Col>
        </Row>
      </Container>
    );
  if (Transactions)
    return (
      <Card className="mb-3 shadow">
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>Transazioni recenti</Card.Title>
        </Card.Header>
        <Card.Body>
          {Transactions.slice(0, 5).map((transaction) => (
            <TransactionDetails
              key={transaction._id}
              transaction={transaction}
            />
          ))}
        </Card.Body>
      </Card>
    );
};
