import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetPaymentMethods } from "../../data/fetch";
import { CardLoader } from "../../components/loader/CardLoader";
import { SinglePaymentMethod } from "../../components/paymentMethods/SinglePaymentMethod";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../../components/utils/MyAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NewModal } from "../../components/modals/NewModal";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export const AllPaymentMethods = () => {
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const PaymentMethodId = useParams().paymentMethodId;
  const [Show, SetShow] = useState(false);
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser && !Show) {
      GetPaymentMethods()
        .then((data) => SetPaymentMethods(data))
        .catch((err) => {
          SetAlertFormValue(
            "getPaymentMethods",
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
    }
  }, [LoggedUser, Show]);
  if (!PaymentMethods) return <CardLoader />;
  if (PaymentMethodId) return <Outlet />;

  if (PaymentMethods)
    return (
      <Container className="pt-4">
        <Row>
          <h1 className="text-center mb-3">Metodi di pagamento</h1>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title>Elenco metodi di pagamento</Card.Title>
                <Button variant={Theme === "light" ? "outline-primary" : "outline-secondary"} size="sm" onClick={() => SetShow(true)}>
                  <span className="d-none d-md-inline">
                    Nuovo metodo di pagamento &nbsp;
                  </span>
                  <FontAwesomeIcon
                    icon={faAdd}
                    size="xl"
                    onClick={() => SetShow(true)}
                  />
                </Button>
              </Card.Header>
              <Card.Body className="px-0">
                {ShowAlert?.Type === "getPaymentMethods" && <MyAlert />}
                {!PaymentMethods[0]?.name ? (
                  <Card.Text className="text-center">
                    Non esistono metodi di pagamento.
                  </Card.Text>
                ) : (
                  PaymentMethods.map((paymentMethod, index) => (
                    <SinglePaymentMethod
                      key={paymentMethod._id}
                      paymentMethod={paymentMethod}
                      type="mini"
                      index={index}
                    />
                  ))
                )}
                <NewModal Show={Show} SetShow={SetShow} tipo="paymentMethod" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
