import { useContext, useEffect, useState } from "react";
import {
  Row,
  Card,
  Button,
  Container,
  ListGroup,
  CardFooter,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";
import { GetPaymentMethods } from "../../data/fetch";
import { NewModal } from "../modals/NewModal";
import { CardLoader } from "../loader/CardLoader";
import { useNavigate } from "react-router-dom";
import { SinglePaymentMethod } from "./SinglePaymentMethod";

export const PaymentMethods = () => {
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  // * STATI
  const [Show, SetShow] = useState(false);
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const [Editing, SetEditing] = useState(false);
  const Navigate = useNavigate();
  // * FUNZIONI
  useEffect(() => {
    !Show &&
      LoggedUser &&
      GetPaymentMethods()
        .then((data) => SetPaymentMethods(data))
        .catch((err) => console.log(err));
  }, [LoggedUser, Show]);
  if (!PaymentMethods)
    return (
      <Container>
        <Row>
          <CardLoader />
        </Row>
      </Container>
    );
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <Card.Title>I miei metodi di pagamento</Card.Title>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {PaymentMethods.map((PaymentMethod, index) => (
            <SinglePaymentMethod
              key={PaymentMethod._id}
              paymentMethod={PaymentMethod}
              index={index}
              type="mini"
            />
          ))}
        </ListGroup>
      </Card.Body>
      <CardFooter>
        <Button
          variant={Theme === "dark" ? "outline-light" : "dark"}
          onClick={() => Navigate("/paymentMethods")}
          size="sm"
        >
          Visualizza tutti
        </Button>
        <Button variant={Theme} onClick={() => SetShow(true)}>
          Aggiungi metodo di pagamento
        </Button>
      </CardFooter>
      <NewModal Show={Show} SetShow={SetShow} tipo="paymentMethod" />
    </Card>
  );
};
