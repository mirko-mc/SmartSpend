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
  faLeftLong,
  faLocationDot,
  faRightLeft,
  faRightLong,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { CardLoader } from "../loader/CardLoader";

export const SinglePaymentMethod = ({ paymentMethod, index, type }) => {
  console.log("COMPONENT => SinglePaymentMethod.jsx");
  // * CONTEXT
  const { Theme, IsPrivacy } = useContext(UserContext);
  // * STATI
  const Navigate = useNavigate();
  const [EditMode, SetEditMode] = useState(false);
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const [EditPaymentMethodFormValues, SetEditPaymentMethodFormValues] =
    useState(paymentMethod);
  // * FUNZIONI
  useEffect(() => {
    GetPaymentMethods()
      .then((data) => SetPaymentMethods(data))
      .catch((err) => console.log(err));
  }, []);
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
        Navigate(0);
        alert("Metodo di pagamento eliminato correttamente!");
      })
      .catch((err) => console.log(err));
  };
  const HandleEditPaymentMethod = () => {
    console.log(EditPaymentMethodFormValues);
    PutPaymentMethod(
      EditPaymentMethodFormValues._id,
      EditPaymentMethodFormValues
    )
      .then(() => alert("Metodo di pagamento modificato correttamente!"))
      .catch((err) => console.log(err));
    SetEditMode(!EditMode);
    SetEditPaymentMethodFormValues(paymentMethod);
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
              type="date"
              name="date"
              value={new Date(paymentMethod.date).toISOString().slice(0, 10)}
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
              name="shop"
              value={paymentMethod.shop}
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
              type={IsPrivacy ? "text" : "number"}
              name="amount"
              value={IsPrivacy ? "******" : paymentMethod.amount}
              disabled
            />
          </Form.Group>

          <Form.Group>
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <FontAwesomeIcon icon={faRightLeft} />
              </Form.Label>
            )}
            <Form.Label>
              {paymentMethod?.inOut === "in" ? (
                <FontAwesomeIcon icon={faLeftLong} color="green" size="xl" />
              ) : (
                <FontAwesomeIcon icon={faRightLong} color="red" size="xl" />
              )}
            </Form.Label>
          </Form.Group>

          <Form.Group>
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <FontAwesomeIcon icon={faSliders} />
              </Form.Label>
            )}
            <Button
              variant={Theme}
              onClick={() => Navigate(`/paymentMethod/${paymentMethod._id}`)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button
              variant="danger"
              onClick={() => HandleDeletePaymentMethod(paymentMethod._id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
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
          <Card.Title>
            {`Shop: ${EditPaymentMethodFormValues.shop} - Data ${new Date(
              EditPaymentMethodFormValues.date
            ).toLocaleDateString()}`}
          </Card.Title>
        </Card.Header>
        <Card.Body as={Row}>
          {EditMode && (
            <>
              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Indirizzo
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="address"
                    type="text"
                    name="address"
                    value={EditPaymentMethodFormValues.address}
                    onChange={HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Data
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="date"
                    type="date"
                    name="date"
                    value={new Date(EditPaymentMethodFormValues.date)
                      .toISOString()
                      .slice(0, 10)}
                    onChange={HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Shop
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="shop"
                    type="text"
                    name="shop"
                    value={EditPaymentMethodFormValues.shop}
                    onChange={HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Descrizione
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="description"
                    as="textarea"
                    type="text"
                    name="description"
                    value={EditPaymentMethodFormValues.description}
                    onChange={HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Importo
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="amount"
                    type="number"
                    name="amount"
                    value={EditPaymentMethodFormValues.amount}
                    onChange={HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Tipo movimento
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    id="inOut"
                    name="inOut"
                    value={EditPaymentMethodFormValues.inOut}
                    onChange={HandleChange}
                  >
                    <option value="in">Entrata</option>
                    <option value="out">Uscita</option>
                  </Form.Select>
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Metodo di pagamento
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={EditPaymentMethodFormValues.paymentMethod?.name}
                    onChange={HandleChange}
                  >
                    {PaymentMethods.map((paymentMethod) => (
                      <option key={paymentMethod._id} value={paymentMethod._id}>
                        {paymentMethod.name}
                      </option>
                    ))}
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
                    Data:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>
                    {new Date(paymentMethod.date).toLocaleDateString()}
                  </CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Negozio:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{paymentMethod.shop}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Indirizzo:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{paymentMethod.address}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
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
                    Importo:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>€ {paymentMethod.amount}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Tipo movimento:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>
                    {paymentMethod.inOut === "in" ? (
                      <FontAwesomeIcon
                        icon={faLeftLong}
                        color="green"
                        size="xl"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faRightLong}
                        color="red"
                        size="xl"
                      />
                    )}
                  </CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 w-50 text-end">
                  <Card.Subtitle className="d-inline align-baseline">
                    Metodo di pagamento:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{paymentMethod.paymentMethod?.name}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Categoria:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{paymentMethod.category?.name}</CardText>
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
