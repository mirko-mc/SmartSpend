import {
  Button,
  Card,
  CardFooter,
  CardText,
  Col,
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DeleteCategory, GetCategories, PutCategory } from "../../data/fetch";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faSave,
} from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../context/UserContextProvider";
import { faXmark, faSliders } from "@fortawesome/free-solid-svg-icons";
import { CardLoader } from "../loader/CardLoader";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";

export const SingleCategory = ({ category, index, type }) => {
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const Navigate = useNavigate();
  const [EditMode, SetEditMode] = useState(false);
  const [Categories, SetCategories] = useState(null);
  const [EditCategoryFormValues, SetEditCategoryFormValues] =
    useState(category);
  // * FUNZIONI
  useEffect(() => {
    !EditMode && type === "mini"
      ? GetCategories()
          .then((data) => SetCategories(data))
          .catch((err) => console.log(err))
      : SetCategories(category);
  }, [EditMode]);
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
        SetAlertFormValue(
          "deleteCategory",
          "success",
          "Categoria eliminata con successo",
          "Si è verificato un errore, riprova più tardi"
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
          Navigate("/categories");
        }, 3 * 1000);
      })
      .catch((err) => {
        SetAlertFormValue(
          "deleteCategory",
          "danger",
          "ERROR",
          "Si è verificato un errore, riprova più tardi"
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
          Navigate("/categories");
        });
        setTimeout(() => {
          SetShowAlert(false);
        }, 3 * 1000);
      });
  };
  const HandleEditCategory = () => {
    PutCategory(EditCategoryFormValues._id, EditCategoryFormValues)
      .then(() => {
        SetAlertFormValue(
          "putCategory",
          "success",
          "Categoria modificata",
          "Categoria modificata correttamente"
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
          Navigate(0);
        }, 3 * 1000);
      })
      .catch((err) => {
        SetAlertFormValue(
          "putCategory",
          "danger",
          "ERROR",
          "Si è verificato un errore, riprova più tardi"
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
          Navigate("/categories");
        });
        setTimeout(() => {
          SetShowAlert(false);
        }, 3 * 1000);
      });
  };
  // * RENDER
  if (category && type === "mini")
    return (
      <ListGroup variant="flush" className="mb-1 shadow">
        <ListGroup.Item
          key={category._id}
          className="d-flex justify-content-evenly align-items-center w-100"
        >
          <Form.Group className="pe-1">
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <span>Nome</span>
              </Form.Label>
            )}
            <Form.Control
              type="text"
              name="name"
              value={category.name}
              disabled
              style={{
                border: `0.5px solid ${category.color}`,
              }}
            />
          </Form.Group>

          <Form.Group className="pe-1 text-truncate">
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <span>Descrizione</span>
              </Form.Label>
            )}
            <Form.Control
              type="text"
              name="description"
              value={category.description}
              disabled
              style={{
                border: `0.5px solid ${category.color}`,
              }}
            />
          </Form.Group>

          <Form.Group className="pe-1">
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <FontAwesomeIcon icon={faSliders} />
              </Form.Label>
            )}
            <Button
              variant={
                Theme === "light" ? "outline-primary" : "outline-secondary"
              }
              onClick={() => Navigate(`/categories/${category._id}`)}
            >
              <FontAwesomeIcon icon={faEye} />
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
          <Card.Title>Dettaglio categoria</Card.Title>
        </Card.Header>
        <Card.Body as={Row}>
          {EditMode && (
            <>
              <FormGroup as={Row} className="mb-2">
                <Form.Label column sm={3} className="text-end">
                  Nome
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    value={EditCategoryFormValues.name}
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
                  Colore
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    id="color"
                    type="color"
                    name="color"
                    value={EditCategoryFormValues.color}
                    onChange={HandleChange}
                  />
                </Col>
              </FormGroup>
            </>
          )}
          {!EditMode && (
            <>
              <ListGroup variant={Theme} horizontal className="text-end">
                <ListGroupItem className="border-0 text-end w-50">
                  <Card.Subtitle className="d-inline align-baseline ">
                    Nome:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <CardText>{category.name}</CardText>
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
                    Colore:
                  </Card.Subtitle>
                </ListGroupItem>
                <ListGroupItem className="border-0 w-50 text-start">
                  <FormControl type="color" value={category.color} disabled />
                </ListGroupItem>
              </ListGroup>
            </>
          )}
        </Card.Body>
        <CardFooter className="d-flex justify-content-evenly">
          {EditMode ? (
            ShowAlert?.Type === "putCategory" ? (
              <MyAlert />
            ) : (
              <>
                <Button
                  variant={Theme === "dark" ? "danger" : "danger"}
                  onClick={() => SetEditMode(false)}
                >
                  <span>Annulla &nbsp;</span>
                  <FontAwesomeIcon icon={faXmark} size="xl" />
                </Button>
                <Button
                  variant="success"
                  onClick={HandleEditCategory}
                >
                  <span>Salva &nbsp;</span>
                  <FontAwesomeIcon icon={faSave} size="xl" />
                </Button>
              </>
            )
          ) : ShowAlert?.Type === "deleteCategories" ? (
            <MyAlert />
          ) : (
            <>
              <Button
                variant={Theme === "dark" ? `outline-secondary` : `outline-primary`}
                onClick={() => SetEditMode(true)}
              >
                <span>Modifica &nbsp;</span>
                <FontAwesomeIcon icon={faEdit} size="xl" />
              </Button>
              <Button
                variant="danger"
                onClick={HandleDeleteCategory}
              >
                <span>Elimina &nbsp;</span>
                <FontAwesomeIcon icon={faTrashAlt} size="xl" />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    );
};
