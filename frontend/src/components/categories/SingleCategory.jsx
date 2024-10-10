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
  DeleteCategory,
  GetCategories,
  PutCategory,
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

export const SingleCategory = ({ category, index, type }) => {
  console.log("COMPONENT => SingleCategory.jsx");
  // * CONTEXT
  const { Theme, IsPrivacy } = useContext(UserContext);
  // * STATI
  const Navigate = useNavigate();
  const [EditMode, SetEditMode] = useState(false);
  const [Categories, SetCategories] = useState(null);
  const [EditCategoryFormValues, SetEditCategoryFormValues] =
    useState(category);
  // * FUNZIONI
  useEffect(() => {
    GetCategories()
      .then((data) => SetCategories(data))
      .catch((err) => console.log(err));
  }, []);
  const HandleChange = (e) => {
    e.preventDefault();
    SetEditCategoryFormValues({
      ...EditCategoryFormValues,
      [e.target.name]: e.target.value,
    });
  };
  const HandleDeleteCategory = () => {
    DeleteCategory(category._id)
      .then(() => {
        Navigate(0);
        alert("Categoria eliminata correttamente!");
      })
      .catch((err) => console.log(err));
  };
  const HandleEditCategory = () => {
    console.log(EditCategoryFormValues);
    PutCategory(EditCategoryFormValues._id, EditCategoryFormValues)
      .then(() => alert("Categoria modificata correttamente!"))
      .catch((err) => console.log(err));
    SetEditMode(!EditMode);
    SetEditCategoryFormValues(category);
  };
  // * RENDER
  if (category && type === "mini")
    return (
      <ListGroup variant="flush" className="mb-1 shadow">
        <ListGroup.Item
          key={category._id}
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
              value={new Date(category.date).toISOString().slice(0, 10)}
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
              value={category.shop}
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
              value={IsPrivacy ? "******" : category.amount}
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
              {category?.inOut === "in" ? (
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
              onClick={() => Navigate(`/category/${category._id}`)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button
              variant="danger"
              onClick={() => HandleDeleteCategory(category._id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </Form.Group>
        </ListGroup.Item>
      </ListGroup>
    );
  if (!Categories) return <CardLoader />;
  if (category && type === "full")
    return (
      <Card className="mb-3 shadow">
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>
            {`Shop: ${EditCategoryFormValues.shop} - Data ${new Date(
              EditCategoryFormValues.date
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
                    value={EditCategoryFormValues.address}
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
                    value={new Date(EditCategoryFormValues.date)
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
                    value={EditCategoryFormValues.shop}
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
                    value={EditCategoryFormValues.description}
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
                    value={EditCategoryFormValues.amount}
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
                    value={EditCategoryFormValues.inOut}
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
                    value={EditCategoryFormValues.paymentMethod?.name}
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
                    {new Date(category.date).toLocaleDateString()}
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
                  <CardText>{category.shop}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Indirizzo:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{category.address}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Descrizione:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{category.description}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Importo:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>€ {category.amount}</CardText>
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
                    {category.inOut === "in" ? (
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
                  <CardText>{category.paymentMethod?.name}</CardText>
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant={Theme} horizontal>
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline">
                    Categoria:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{category.category?.name}</CardText>
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
                onClick={HandleEditCategory}
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
              <Button variant="danger" onClick={HandleDeleteCategory}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    );
};

// import { Button, Form, ListGroup } from "react-bootstrap";
// import { DeleteCategory, PutCategory } from "../../data/fetch";
// import { useState } from "react";
// import { SetInitialFormValues } from "../../data/formValue";

// export const SingleCategory = ({ category }) => {
//   console.log("COMPONENTS => singleCategory.jsx");
//   // * STATI
//   const [Editing, SetEditing] = useState(false);
//   const InitialPutCategoryFormValue = SetInitialFormValues(category);
//   const [PutCategoryFormValue, SetPutCategoryFormValue] = useState(
//     InitialPutCategoryFormValue
//   );
//   // * FUNZIONI
//   const HandleChange = (e) => {
//     e.preventDefault();
//     SetPutCategoryFormValue({
//       ...PutCategoryFormValue,
//       [e.target.name]: e.target.value,
//     });
//   };
//   console.log(InitialPutCategoryFormValue);
//   console.log(PutCategoryFormValue);
//   const HandlePutCategory = () => {
//     PutCategory(category._id, PutCategoryFormValue)
//       .then(() => {
//         alert("dati aggiornati correttamente");
//         SetEditing(false);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <ListGroup variant="flush">
//       <ListGroup.Item
//         className="d-flex justify-content-evenly align-items-center"
//         key={category._id}
//       >
//         <Form.Control
//           type="text"
//           name="name"
//           value={PutCategoryFormValue.name}
//           disabled={!Editing}
//           onChange={HandleChange}
//         />
//         <Form.Control
//           type="text"
//           name="description"
//           value={PutCategoryFormValue.description}
//           disabled={!Editing}
//           onChange={HandleChange}
//         />
//         <Form.Control
//           type="color"
//           name="color"
//           value={PutCategoryFormValue.color}
//           disabled={!Editing}
//           onChange={HandleChange}
//         />
//         {!Editing ? (
//           <Button
//             variant="primary"
//             onClick={() => {
//               SetEditing(true);
//             }}
//           >
//             Modifica
//           </Button>
//         ) : (
//           <Button
//             variant="success"
//             onClick={() => {
//               HandlePutCategory();
//             }}
//           >
//             Salva
//           </Button>
//         )}
//         {!Editing ? (
//           <Button
//             variant="danger"
//             onClick={() => {
//               DeleteCategory(category._id);
//             }}
//           >
//             Elimina
//           </Button>
//         ) : (
//           <Button
//             variant="danger"
//             onClick={() => {
//               SetEditing(false);
//             }}
//           >
//             Annulla
//           </Button>
//         )}
//       </ListGroup.Item>
//     </ListGroup>
//   );
// };
