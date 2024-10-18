import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { GetTransaction } from "../../data/fetch";
import { CardLoader } from "../loader/CardLoader";
import { SingleTransaction } from "./SingleTransaction";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";

export const TransactionDetails = () => {
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const TransactionId = useParams().transactionId;
  const [Transaction, SetTransaction] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    TransactionId &&
      GetTransaction(TransactionId)
        .then((data) => SetTransaction(data))
        .catch((err) => {
          SetAlertFormValue(
            "getTransaction",
            "danger",
            "ERROR",
            "Si è verificato un errore, riprova più tardi"
          ).then((AlertFormValue) => {
            SetShowAlert(AlertFormValue);
          });
          setTimeout(() => {
            SetShowAlert(false);
          }, 3 * 1000);
        });
  }, [TransactionId]);
  if (!Transaction) return <CardLoader />;
  if (Transaction)
    return (
      <Container>
        <Row className="pt-3">
          <h1 className="text-center">Dettaglio del movimento</h1>
          <Col xs={10} className="mt-4 offset-1">
            {ShowAlert?.Type === "getTransaction" ? (
              <MyAlert />
            ) : (
              <SingleTransaction transaction={Transaction} type="full" />
            )}
          </Col>
        </Row>
      </Container>
    );
};
