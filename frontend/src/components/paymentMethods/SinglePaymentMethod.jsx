import {
  Button,
  Card,
  CardFooter,
  CardText,
  Col,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  DeletePaymentMethod,
  GetPaymentMethods,
  PutPaymentMethod,
} from "../../data/fetch";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faSave,
  faCalendarDays,
} from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../context/UserContextProvider";
import {
  faCancel,
  faEuro,
  faLocationDot,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { CardLoader } from "../loader/CardLoader";
import { SetInitialFormValues } from "../../data/formValue";

export const SinglePaymentMethod = ({ paymentMethod, index, type }) => {
  console.log("COMPONENT => SinglePaymentMethod.jsx");
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  // * STATI
  const Navigate = useNavigate();
  const [EditMode, SetEditMode] = useState(false);
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const [EditPaymentMethodFormValues, SetEditPaymentMethodFormValues] =
    useState(paymentMethod);
  const TypesPaymentMethod = SetInitialFormValues("typePaymentMethod");
  // * FUNZIONI
  useEffect(() => {
    !EditMode && type === "mini"
      ? GetPaymentMethods()
          .then((data) => SetPaymentMethods(data))
          .catch((err) => console.log(err))
      : SetPaymentMethods(paymentMethod);
    console.log(paymentMethod);
  }, [EditMode]);
  const HandleChange = (e) => {
    e.preventDefault();
    SetEditPaymentMethodFormValues({
      ...EditPaymentMethodFormValues,
      [e.target.name]: e.target.value,
    });
  };
  const HandleDeletePaymentMethod = () => {
    DeletePaymentMethod(paymentMethod._id)
      .then(() => {
        // Navigate(0);
        alert("Metodo di pagamento eliminato correttamente!");
      })
      .catch((err) => console.log(err))
      .finally(() => Navigate("/paymentMethods"));
  };
  const HandleEditPaymentMethod = () => {
    PutPaymentMethod(
      EditPaymentMethodFormValues._id,
      EditPaymentMethodFormValues
    )
      .then(() => alert("Metodo di pagamento modificato correttamente!"))
      .catch((err) => console.log(err))
      .finally(() => Navigate(0));
  };
  // * RENDER
  if (paymentMethod && type === "mini")
    return (
      <ListGroup variant="flush" className="mb-1 shadow">
        <ListGroup.Item
          key={paymentMethod._id}
          className="d-flex justify-content-evenly align-items-center w-100"
        >
          <Form.Group>
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <FontAwesomeIcon icon={faCalendarDays} />
              </Form.Label>
            )}
            <Form.Control
              type="text"
              name="name"
              value={paymentMethod.name}
              disabled
            />
          </Form.Group>

          <Form.Group>
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <FontAwesomeIcon icon={faLocationDot} />
              </Form.Label>
            )}
            <Form.Control
              type="text"
              name="type"
              value={TypesPaymentMethod[paymentMethod.type]}
              disabled
            />
          </Form.Group>

          <Form.Group>
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <FontAwesomeIcon icon={faEuro} />
              </Form.Label>
            )}
            <Form.Control
              type="text"
              name="description"
              value={paymentMethod.description}
              disabled
            />
          </Form.Group>

          <Form.Group>
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <FontAwesomeIcon icon={faSliders} />
              </Form.Label>
            )}
            <Button
              variant={Theme}
              onClick={() => Navigate(`/paymentMethods/${paymentMethod._id}`)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Form.Group>
        </ListGroup.Item>
      </ListGroup>
    );
  if (!PaymentMethods) return <CardLoader />;
  if (paymentMethod && type === "full")
    return (
      <Card className="mb-3 shadow">
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>Dettaglio metodo di pagamento</Card.Title>
        </Card.Header>
        <Card.Body as={Row}>
          {EditMode && (
            <>
              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Descrizione
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="description"
                    type="text"
                    as="textarea"
                    name="description"
                    value={EditPaymentMethodFormValues.description}
                    onChange={HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Saldo iniziale
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="initialBalance"
                    type="text"
                    name="initialBalance"
                    value={EditPaymentMethodFormValues.initialBalance}
                    onChange={HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Nome
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    value={EditPaymentMethodFormValues.name}
                    onChange={HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Tipo
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    id="type"
                    type="text"
                    name="type"
                    value={TypesPaymentMethod[EditPaymentMethodFormValues.type]}
                    onChange={HandleChange}
                  >
                    {Object.keys(TypesPaymentMethod).map(
                      (TypePaymentMethod) => (
                        <option
                          key={TypePaymentMethod}
                          value={TypePaymentMethod}
                        >
                          {TypesPaymentMethod[TypePaymentMethod]}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Col>
              </FormGroup>
            </>
          )}
          {!EditMode && (
            <>
              <ListGroup variant={Theme} horizontal className="text-end">
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline ">
                    Descrizione:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{paymentMethod.description}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Saldo iniziale:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{paymentMethod.initialBalance}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Nome:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{paymentMethod.name}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Tipo:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{TypesPaymentMethod[paymentMethod.type]}</CardText>
                </ListGroupItem>
              </ListGroup>
            </>
          )}
        </Card.Body>
        <CardFooter className="d-flex justify-content-evenly">
          {EditMode ? (
            <>
              <Button
                variant={Theme === "dark" ? "outline-danger" : "danger"}
                onClick={() => SetEditMode(false)}
              >
                <FontAwesomeIcon icon={faCancel} />
              </Button>
              <Button
                variant={Theme === "dark" ? "outline-success" : "success"}
                onClick={HandleEditPaymentMethod}
              >
                <FontAwesomeIcon icon={faSave} />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={Theme === "dark" ? `outline-light` : "dark"}
                onClick={() => SetEditMode(true)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button variant="danger" onClick={HandleDeletePaymentMethod}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    );
};
