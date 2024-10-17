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

export const SingleCategory = ({ category, index, type }) => {
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  // * STATI
  const Navigate = useNavigate();
  const [EditMode, SetEditMode] = useState(false);
  const [Categories, SetCategories] = useState(null);
  const [EditCategoryFormValues, SetEditCategoryFormValues] =
    useState(category);
  // * FUNZIONI
  useEffect(() => {
    type === "mini"
      ? GetCategories()
          .then((data) => SetCategories(data))
          .catch((err) => console.log(err))
      : SetCategories(category);
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
        alert("Categoria eliminata correttamente!");
      })
      .catch((err) => console.log(err))
      .finally(() => Navigate("/categories"));
  };
  const HandleEditCategory = () => {
    PutCategory(EditCategoryFormValues._id, EditCategoryFormValues)
      .then(() => alert("Categoria modificata correttamente!"))
      .catch((err) => console.log(err))
      .finally(() => Navigate(0));
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
                <span>
                  Nome &#160;
                  <FontAwesomeIcon icon={faCalendarDays} />
                </span>
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

          <Form.Group>
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <span>
                  Descrizione &#160;
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
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

          <Form.Group>
            {index === 0 && (
              <Form.Label className="d-block text-center">
                <FontAwesomeIcon icon={faSliders} />
              </Form.Label>
            )}
            <Button
              variant={Theme}
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
