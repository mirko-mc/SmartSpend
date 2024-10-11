import { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Container,
  ListGroup,
  CardFooter,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";
import { DeletePaymentMethod, GetPaymentMethods } from "../../data/fetch";
import { NewModal } from "../modals/NewModal";
import { CardLoader } from "../loader/CardLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { SinglePaymentMethod } from "./SinglePaymentMethod";

export const PaymentMethods = () => {
  console.log("COMPONENTS => paymentMethods.jsx");
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  // * STATI
  const [Show, SetShow] = useState(false);
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const [Editing, SetEditing] = useState(false);
  const Navigate = useNavigate();
  // * FUNZIONI
  useEffect(() => {
    GetPaymentMethods()
      .then((data) => SetPaymentMethods(data))
      .catch((err) => console.log(err));
  }, [LoggedUser]);
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
        <Button variant="primary" onClick={() => SetShow(true)}>
          Aggiungi metodo di pagamento
        </Button>
      </CardFooter>
      <NewModal Show={Show} SetShow={SetShow} tipo="paymentMethod" />
    </Card>
  );
};
