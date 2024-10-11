import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { GetPaymentMethod } from "../../data/fetch";
import { CardLoader } from "../loader/CardLoader";
import { SinglePaymentMethod } from "./SinglePaymentMethod";

export const PaymentMethodDetails = () => {
  console.log("COMPONENT => PaymentMethodDetails.jsx");
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  // * STATI
  const PaymentMethodId = useParams().paymentMethodId;
  const [PaymentMethod, SetPaymentMethod] = useState(null);
  console.log(PaymentMethodId);
  // * FUNZIONI
  useEffect(() => {
    PaymentMethodId &&
      GetPaymentMethod(PaymentMethodId)
        .then((data) => SetPaymentMethod(data))
        .catch((err) => console.log(err));
  }, [PaymentMethodId]);
  if (!PaymentMethod) return <CardLoader />;
  if (PaymentMethod)
    return (
      <Container data-bs-theme={Theme} bg={`bg-${Theme}`}>
        <Row>
          <Col xs={1} className="mb-3"></Col>
          <Col xs={10} className="mb-3">
            <SinglePaymentMethod paymentMethod={PaymentMethod} type="full" />
          </Col>
        </Row>
      </Container>
    );
};
