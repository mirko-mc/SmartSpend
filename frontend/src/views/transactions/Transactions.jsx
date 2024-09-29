import { Col, Container, Row } from "react-bootstrap";
import { NewTransaction } from "../../components/transaction/NewTransaction";
import { RecentTransaction } from "../../components/transaction/RecentTransaction";
import { NewCategory } from "../../components/categories/NewCategory";

export const Transactions = () => {
  console.log("VIEW => Transactions.jsx");
  // * STATI
  // * FUNZIONI
  return (
    <Container>
      <Row>
        <h1>Transazioni</h1>
        <Col>
          <NewCategory />
          <RecentTransaction />
          <NewTransaction />
        </Col>
      </Row>
    </Container>
  );
};
