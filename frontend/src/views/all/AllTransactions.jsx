import { Card, Col, Container, Row } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { SingleTransaction } from "../../components/transaction/SingleTransaction";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetTransactions } from "../../data/fetch";
import { CardLoader } from "../../components/loader/CardLoader";

export const AllTransactions = () => {
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

  if (TransactionId?.transactionId) return <Outlet />;

  if (Transactions)
    return (
      <Container data-bs-theme={Theme} bg={`bg-${Theme}`}>
        <Row>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title>Elenco movimenti</Card.Title>
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
                    type="mini"
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
