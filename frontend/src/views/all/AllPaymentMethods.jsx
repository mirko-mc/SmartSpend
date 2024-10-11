import { Card, Col, Container, Row } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetPaymentMethods } from "../../data/fetch";
import { CardLoader } from "../../components/loader/CardLoader";
import { SinglePaymentMethod } from "../../components/paymentMethods/SinglePaymentMethod";

export const AllPaymentMethods = () => {
  console.log("VIEW => AllPaymentMethods.jsx");
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  // * STATI
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const PaymentMethodId = useParams().paymentMethodId;
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser) {
      GetPaymentMethods()
        .then((data) => SetPaymentMethods(data))
        .catch((err) => console.log(err));
    }
  }, [LoggedUser]);
  if (!PaymentMethods) return <CardLoader />;

  if (PaymentMethodId) return <Outlet />;

  if (PaymentMethods)
    return (
      <Container data-bs-theme={Theme} bg={`bg-${Theme}`}>
        <Row>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title>Elenco metodi di pagamento</Card.Title>
              </Card.Header>
              <Card.Body>
                {PaymentMethods.map((paymentMethod, index) => (
                  <SinglePaymentMethod
                    key={paymentMethod._id}
                    paymentMethod={paymentMethod}
                    type="mini"
                    index={index}
                  />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
