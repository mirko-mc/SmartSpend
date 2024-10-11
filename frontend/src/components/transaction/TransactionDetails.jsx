import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { GetTransaction } from "../../data/fetch";
import { CardLoader } from "../loader/CardLoader";
import { SingleTransaction } from "./SingleTransaction";

export const TransactionDetails = () => {
  console.log("COMPONENT => TransactionDetails.jsx");
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  // * STATI
  const TransactionId = useParams().transactionId;
  const [Transaction, SetTransaction] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    TransactionId &&
      GetTransaction(TransactionId)
        .then((data) => SetTransaction(data))
        .catch((err) => console.log(err));
  }, [TransactionId]);
  if (!Transaction) return <CardLoader />;
  if (Transaction)
    return (
      <Container data-bs-theme={Theme} bg={`bg-${Theme}`}>
        <Row>
          <Col xs={1} className="mb-3"></Col>
          <Col xs={10} className="mb-3">
            <SingleTransaction transaction={Transaction} type="full" />
          </Col>
        </Row>
      </Container>
    );
};
