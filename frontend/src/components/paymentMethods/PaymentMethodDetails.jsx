import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { GetPaymentMethod } from "../../data/fetch";
import { CardLoader } from "../loader/CardLoader";
import { SinglePaymentMethod } from "./SinglePaymentMethod";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";

export const PaymentMethodDetails = () => {
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const PaymentMethodId = useParams().paymentMethodId;
  const [PaymentMethod, SetPaymentMethod] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    PaymentMethodId &&
      GetPaymentMethod(PaymentMethodId)
        .then((data) => SetPaymentMethod(data))
        .catch((err) => {
          SetAlertFormValue(
            "getPaymentMethod",
            "danger",
            "ERROR",
            "Si è verificato un errore, riprova più tardi"
          ).then((AlertFormValue) => {
            SetShowAlert(AlertFormValue);
          });
          setTimeout(() => {
            SetShowAlert(false);
          }, 5 * 1000);
        });
  }, [PaymentMethodId]);
  if (!PaymentMethod) return <CardLoader />;
  if (PaymentMethod)
    return (
      <Container className="pt-xs-2 pt-md-3 pt-lg-5">
        <Row>
          <Col xs={10} className="mb-3 offset-1">
            {ShowAlert?.Type === "getCategories" ? (
              <MyAlert />
            ) : (
              <SinglePaymentMethod paymentMethod={PaymentMethod} type="full" />
            )}
          </Col>
        </Row>
      </Container>
    );
};
