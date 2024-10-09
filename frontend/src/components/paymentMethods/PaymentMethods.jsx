import { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Container,
  ListGroup,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";
import { DeletePaymentMethod, GetPaymentMethods } from "../../data/fetch";
import { NewModal } from "../modals/NewModal";
import { CardLoader } from "../loader/CardLoader";

export const PaymentMethods = () => {
  console.log("COMPONENTS => paymentMethods.jsx");
  // * CONTEXT
  const { LoggedUser } = useContext(UserContext);
  // * STATI
  const [Show, SetShow] = useState(false);
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const [Editing, SetEditing] = useState(false);
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
        <Button variant="primary" onClick={() => SetShow(true)}>
          Aggiungi metodo di pagamento
        </Button>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {PaymentMethods.map((PaymentMethod) => (
            <ListGroup.Item
              key={PaymentMethod._id}
              className="d-flex justify-content-evenly align-items-center"
            >
              <Form.Control
                type="text"
                name="name"
                value={PaymentMethod.name}
                disabled
              />
              <Form.Control
                type="text"
                name="type"
                value={PaymentMethod.type}
                disabled
              />
              <Form.Control
                type="text"
                value={PaymentMethod.description}
                disabled
              />
              <Form.Control
                type="color"
                name="color"
                id="color"
                value={PaymentMethod.color}
                disabled
              />
              <Button variant="primary" onClick={() => SetEditing(true)}>
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => DeletePaymentMethod(PaymentMethod._id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
      <NewModal Show={Show} SetShow={SetShow} tipo="paymentMethod" />
    </Card>
  );
};
