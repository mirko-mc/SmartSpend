import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { NewTransaction } from "../../components/transaction/NewTransaction";
import { RecentTransaction } from "../../components/transaction/RecentTransaction";
import { NewCategory } from "../../components/categories/NewCategory";
import { Outlet, useParams } from "react-router-dom";
import { SingleTransaction } from "../../components/transaction/SingleTransaction";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetTransactions } from "../../data/fetch";
import { CardLoader } from "../../components/loader/CardLoader";

export const AllTransactions = () => {
  console.log("VIEW => AllTransactions.jsx");
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  // * STATI
  const [Transactions, SetTransactions] = useState(null);
  const TransactionId = useParams();
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser) {
      GetTransactions()
        .then((data) => SetTransactions(data))
        .catch((err) => console.log(err));
    }
  }, [LoggedUser]);
  if (!Transactions) return <CardLoader />;

  console.log(TransactionId === true);

  if (Transactions)
    return (
      <Container>
        <Row>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title>Transazioni recenti</Card.Title>
                <Button variant={Theme}>Visualizza tutte</Button>
              </Card.Header>
              <Card.Body>
                {/* <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Importo</th>
                      <th>Descrizione</th>
                      <th>Metodo di pagamento</th>
                      <th>Azioni</th>
                    </tr>
                  </thead>
                  <tbody> */}
                    {Transactions.map((transaction) => (
                      <SingleTransaction
                        key={transaction._id}
                        transaction={transaction}
                        // IsPrivacy={IsPrivacy}
                      />
                    ))}
                  {/* </tbody>
                </Table> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
