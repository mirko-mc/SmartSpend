import { Button, Col, Container, Row } from "react-bootstrap";
import { NewTransaction } from "../../components/transaction/NewTransaction";
import { RecentTransaction } from "../../components/transaction/RecentTransaction";
import { NewCategory } from "../../components/categories/NewCategory";

export const AllTransactions = () => {
  console.log("VIEW => Transactions.jsx");
  // * STATI
  // * FUNZIONI
  return (
    <Container>
      <Row>
        <h1>Transazioni</h1>
        <Col>
          <Button variant="primary" onClick={() => <NewCategory />}>
            Nuova categoria
          </Button>
          <Button variant="primary" onClick={() => <NewTransaction />}>
            Nuova transazione
          </Button>
          <RecentTransaction />
        </Col>
      </Row>
    </Container>
  );
};
