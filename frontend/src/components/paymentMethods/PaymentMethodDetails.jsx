import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { GetPaymentMethod } from "../../data/fetch";
import { CardLoader } from "../loader/CardLoader";
import { SinglePaymentMethod } from "./SinglePaymentMethod";

export const PaymentMethodDetails = () => {
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  // * STATI
  const PaymentMethodId = useParams().paymentMethodId;
  const [PaymentMethod, SetPaymentMethod] = useState(null);
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
      <Container className="pt-xs-2 pt-md-3 pt-lg-5">
        <Row>
          <Col xs={10} className="mb-3 offset-1">
            <SinglePaymentMethod paymentMethod={PaymentMethod} type="full" />
          </Col>
        </Row>
      </Container>
    );
};
