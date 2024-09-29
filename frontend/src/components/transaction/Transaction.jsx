import { Button, Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export const Transaction = ({ transaction }) => {
  console.log("COMPONENT => Transaction.jsx");
  return (
    <Row>
      <Col xs={12} key={transaction._id} className="mb-3 d-flex">
        <Button
          variant="primary"
          onClick={() => (
            <Navigate to={`/transactions`} transaction={transaction} />
          )}
        >
          Visualizza
        </Button>
        <Col>{transaction.date}</Col>
        <Col>{transaction.amount}</Col>
        <Col>{transaction.description}</Col>
        <Col>{transaction.user?.name}</Col>
        <Col>{transaction.category?.name}</Col>
        <Col>{transaction.paymentMethod?.name}</Col>
      </Col>
    </Row>
  );
};
