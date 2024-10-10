import {
  Button,
  Card,
  CardFooter,
  CardText,
  Col,
  Form,
  FormGroup,
  FormLabel,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteTransaction,
  GetCategories,
  GetPaymentMethods,
  PutTransaction,
} from "../../data/fetch";
import { NewModal } from "../modals/NewModal";
import { EditModal } from "../modals/EditModal";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faSave,
  faCalendarMinus,
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

export const SingleTransaction = ({ transaction, index, type }) => {
  console.log("COMPONENT => SingleTransaction.jsx");

  // * CONTEXT
  const { Theme, IsPrivacy } = useContext(UserContext);
  // * STATI
  const Navigate = useNavigate();
  // const [Show, SetShow] = useState(false);
  const [EditMode, SetEditMode] = useState(false);
  const [Categories, SetCategiries] = useState(null);
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const [EditTransactionFormValues, SetEditTransactionFormValues] =
    useState(transaction);
  // * FUNZIONI
  useEffect(() => {
    GetCategories()
      .then((data) => SetCategiries(data))
      .catch((err) => console.log(err));
    GetPaymentMethods()
      .then((data) => SetPaymentMethods(data))
      .catch((err) => console.log(err));
  }, []);
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
        Navigate(0);
        alert("Transazione eliminata correttamente!");
      })
      .catch((err) => console.log(err));
  };
  const HandleEditTransaction = () => {
    console.log(EditTransactionFormValues);
    PutTransaction(EditTransactionFormValues._id, EditTransactionFormValues)
      .then(() => alert("Transazione modificata correttamente!"))
      .catch((err) => console.log(err));
    SetEditMode(!EditMode);
    SetEditTransactionFormValues(transaction);
  };
  // * RENDER
  if (transaction && type === "mini")
    return (
      <ListGroup variant="flush" className="mb-1 shadow">
        <ListGroup.Item
          key={transaction._id}
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
              value={new Date(transaction.date).toISOString().slice(0, 10)}
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
              value={transaction.shop}
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
              value={IsPrivacy ? "******" : transaction.amount}
              disabled
            />
          </Form.Group>

          <Form.Group>
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <FontAwesomeIcon icon={faRightLeft} />
              </Form.Label>
            )}
            <Form.Label className=""
            // type="text"
            // name="inOut"
            // value={
            // transaction?.inOut === "in" ? (
            // <FontAwesomeIcon icon={faLeftLong} />
            // ) : (
            // <FontAwesomeIcon icon={faRightLong} />
            // )
            // }
            // disabled
            >
              {transaction?.inOut === "in" ? (
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
              onClick={() => Navigate(`/transactions/${transaction._id}`)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button
              variant="danger"
              onClick={() => HandleDeleteTransaction(transaction._id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </Form.Group>
        </ListGroup.Item>
      </ListGroup>
    );
  if (!Categories || !PaymentMethods) return <CardLoader />;
  if (transaction && type === "full")
    return (
      <Card className="mb-3 shadow">
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>
            {`Shop: ${EditTransactionFormValues.shop} - Data ${new Date(
              EditTransactionFormValues.date
            ).toLocaleDateString()}`}
          </Card.Title>
        </Card.Header>
        <Card.Body as={Row}>
          {EditMode && (
            <>
              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={6}>
                  Indirizzo
                </Form.Label>
                <Col sm={6}>
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
                <Form.Label column sm={6}>
                  Data
                </Form.Label>
                <Col sm={6}>
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
                <Form.Label column sm={6}>
                  Shop
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    id="shop"
                    type="text"
                    name="shop"
                    value={EditTransactionFormValues.shop}
                    onChange={HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={6}>
                  Descrizione
                </Form.Label>
                <Col sm={6}>
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
                <Form.Label column sm={6}>
                  Importo
                </Form.Label>
                <Col sm={6}>
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
                <Form.Label column sm={6}>
                  Tipo movimento
                </Form.Label>
                <Col sm={6}>
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
                <Form.Label column sm={6}>
                  Metodo di pagamento
                </Form.Label>
                <Col sm={6}>
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
                <Form.Label column sm={6}>
                  Categorie
                </Form.Label>
                <Col sm={6}>
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
                  <CardText>{transaction.shop}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Indirizzo:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{transaction.address}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Descrizione:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{transaction.description}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Importo:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{transaction.amount}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Tipo movimento:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{transaction.inOut}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 w-50 text-end">
                  <Card.Subtitle className="d-inline align-baseline">
                    Metodo di pagamento:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{transaction.paymentMethod?.name}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Categoria:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{transaction.category?.name}</CardText>
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
                onClick={HandleEditTransaction}
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
              <Button variant="danger" onClick={HandleDeleteTransaction}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </>
          )}
          {/* <EditModal
            tipo="transaction"
            Show={Show}
            SetShow={SetShow}
            toEdit={transaction}
          /> */}
        </CardFooter>
      </Card>
    );

  // return (
  //   <tr>
  //     <EditModal
  //       tipo="transaction"
  //       Show={Show}
  //       SetShow={SetShow}
  //       toEdit={transaction}
  //     />
  //     <td>{new Date(transaction.date).toLocaleDateString()}</td>
  //     <td>{IsPrivacy ? "******" : transaction.amount} €</td>
  //     <td>{transaction.description}</td>
  //     <td>{transaction.paymentMethod?.name}</td>
  //     <td>
  //       <Button
  //         variant={transaction.user.favoriteTheme}
  //         onClick={() => Navigate(`/transactions/${transaction._id}`)}
  //       >
  //         <FontAwesomeIcon icon={faEye} />
  //       </Button>
  //       <Button
  //         variant={transaction.user.favoriteTheme}
  //         onClick={() => SetShow(true)}
  //       >
  //         <FontAwesomeIcon icon={faEdit} />
  //       </Button>
  //       <Button
  //         variant={transaction.user.favoriteTheme}
  //         onClick={HandleDeleteTransaction}
  //       >
  //         <FontAwesomeIcon icon={faTrashAlt} />
  //       </Button>
  //     </td>
  //   </tr>
  // );
};
