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
  DeleteTransaction,
  GetCategories,
  GetPaymentMethods,
  PutTransaction,
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
  faXmark,
  faEuro,
  faLeftLong,
  faLocationDot,
  faRightLeft,
  faRightLong,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { CardLoader } from "../loader/CardLoader";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";

export const SingleTransaction = ({ transaction, index, type }) => {
  // * CONTEXT
  const { Theme, IsPrivacy } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const Navigate = useNavigate();
  const [EditMode, SetEditMode] = useState(false);
  const [Categories, SetCategiries] = useState(null);
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const [EditTransactionFormValues, SetEditTransactionFormValues] =
    useState(transaction);
  // * FUNZIONI
  useEffect(() => {
    !EditMode &&
      GetCategories()
        .then((data) => SetCategiries(data))
        .catch((err) => console.log(err));
    !EditMode &&
      GetPaymentMethods()
        .then((data) => SetPaymentMethods(data))
        .catch((err) => console.log(err));
  }, [EditMode]);
  const HandleChange = (e) => {
    e.preventDefault();
    SetEditTransactionFormValues({
      ...EditTransactionFormValues,
      [e.target.name]: e.target.value,
    });
  };
  const HandleDeleteTransaction = () => {
    DeleteTransaction(transaction._id)
      .then(() => {
        SetAlertFormValue(
          "deleteTransaction",
          "success",
          "Movimento eliminato",
          "Movimento eliminato con successo"
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
          Navigate("/transactions");
        }, 3 * 1000);
      })
      .catch((err) => {
        SetAlertFormValue(
          "deleteTransaction",
          "danger",
          "ERROR",
          "Si è verificato un errore, riprova più tardi"
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
          Navigate("/transactions");
        }, 3 * 1000);
      });
  };
  const HandleEditTransaction = () => {
    PutTransaction(EditTransactionFormValues._id, EditTransactionFormValues)
      .then(() => {
        SetAlertFormValue(
          "editTransaction",
          "success",
          "Movimento modificato",
          "Movimento modificato con successo"
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
          Navigate("/transactions");
        }, 3 * 1000);
      })
      .catch((err) => {
        SetAlertFormValue(
          "editTransaction",
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
  };
  // * RENDER
  if (ShowAlert) return <MyAlert />;
  if (transaction && type === "mini")
    return (
      <ListGroup variant="flush" className="mb-1 shadow">
        <ListGroup.Item
          key={transaction?._id}
          className="d-flex justify-content-evenly align-items-center"
        >
          <Form.Group className="mini-date pe-1">
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <span>
                  Data &#160;
                  <FontAwesomeIcon icon={faCalendarDays} />
                </span>
              </Form.Label>
            )}
            <Form.Control
              type="date"
              name="date"
              value={new Date(transaction.date).toISOString().slice(0, 10)}
              disabled
              style={{
                border: `1px solid ${EditTransactionFormValues.category?.color}`,
              }}
            />
          </Form.Group>

          <Form.Group className="pe-1">
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <span>
                  Dove &#160;
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
              </Form.Label>
            )}
            <Form.Control
              className="text-truncate"
              type="text"
              name="shop"
              value={transaction?.shop}
              disabled
              style={{
                border: `1px solid ${EditTransactionFormValues.category?.color}`,
              }}
            />
          </Form.Group>

          <Form.Group className="pe-1">
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <span>
                  Importo &#160;
                  <FontAwesomeIcon icon={faEuro} />
                </span>
              </Form.Label>
            )}
            <Form.Control
              type={IsPrivacy ? "text" : "number"}
              name="amount"
              value={
                IsPrivacy
                  ? "******"
                  : parseFloat(EditTransactionFormValues.amount).toFixed(2)
              }
              disabled
              style={{
                border: `0.5px solid ${EditTransactionFormValues.category?.color}`,
              }}
            />
          </Form.Group>

          <Form.Group className="pe-1">
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <FontAwesomeIcon icon={faRightLeft} />
              </Form.Label>
            )}
            <Form.Label>
              {transaction?.inOut === "in" ? (
                <FontAwesomeIcon icon={faLeftLong} color="green" size="xl" />
              ) : (
                <FontAwesomeIcon icon={faRightLong} color="red" size="xl" />
              )}
            </Form.Label>
          </Form.Group>

          <Form.Group className="pe-1">
            {index === 0 && (
              <Form.Label>
                <FontAwesomeIcon icon={faSliders} />
              </Form.Label>
            )}
            <Button
              className="d-block text-center m-0 p-0 border-0 mb-2"
              variant={Theme === "light" ? "outline-primary" : "outline-secondary"}
              onClick={() => Navigate(`/transactions/${transaction?._id}`)}
            >
              <FontAwesomeIcon icon={faEye} className="text-center" />
            </Button>
          </Form.Group>
        </ListGroup.Item>
      </ListGroup>
    );
  if (!Categories || !PaymentMethods) return <CardLoader />;
  if (transaction && type === "full")
    return (
      <Card className="shadow mb-3">
        <Card.Header className="d-flex justify-content-between">
          <Card.Title className="text-truncate my-2">
            {EditTransactionFormValues.description}
          </Card.Title>
        </Card.Header>
        <Card.Body as={Row}>
          {EditMode && (
            <>
              <FormGroup as={Row} className="mb-2">
                <FormGroup as={Row} className="mb-2">
                  <Form.Label column sm={3} className="text-end">
                    Data
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      id="date"
                      type="date"
                      name="date"
                      value={new Date(EditTransactionFormValues.date)
                        .toISOString()
                        .slice(0, 10)}
                      onChange={HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-2">
                  <Form.Label column sm={3} className="text-end">
                    Dove
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      id="shop"
                      type="text"
                      name="shop"
                      value={EditTransactionFormValues.shop}
                      onChange={HandleChange}
                    />
                  </Col>
                </FormGroup>

                <Form.Label column sm={3} className="text-end">
                  Indirizzo
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="address"
                    type="text"
                    name="address"
                    value={EditTransactionFormValues.address}
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
                    value={EditTransactionFormValues.amount}
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
                    value={EditTransactionFormValues.description}
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
                    value={EditTransactionFormValues.inOut}
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
                    value={EditTransactionFormValues.paymentMethod?.name}
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

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Categorie
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    id="category"
                    name="category"
                    value={EditTransactionFormValues.category?.name}
                    onChange={HandleChange}
                  >
                    {Categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
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
                    {new Date(transaction.date).toLocaleDateString()}
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
                  <CardText>{transaction?.shop}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Indirizzo:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{transaction?.address}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Importo:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>€ {transaction?.amount}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Descrizione:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{transaction?.description}</CardText>
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
                    {transaction?.inOut === "in" ? (
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
                  <CardText>{transaction?.paymentMethod?.name}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Categoria:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{transaction?.category?.name}</CardText>
                </ListGroupItem>
              </ListGroup>
            </>
          )}
        </Card.Body>
        <CardFooter className="d-flex justify-content-evenly">
          {EditMode ? (
            <>
              <Button
                variant="danger"
                onClick={() => SetEditMode(false)}
              >
                <span>Annulla &nbsp;</span>
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </Button>
              <Button
                variant="success"
                onClick={HandleEditTransaction}
              >
                <span>Salva &nbsp;</span>
                <FontAwesomeIcon icon={faSave} />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={Theme === "dark" ? `outline-secondary` : `outline-primary`}
                onClick={() => SetEditMode(true)}
              >
                <span>Modifica &nbsp;</span>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button variant="danger" onClick={HandleDeleteTransaction}>
                <span>Elimina &nbsp;</span>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    );
};
