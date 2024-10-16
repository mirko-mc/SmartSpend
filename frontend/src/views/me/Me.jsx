import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { DeleteUser, PutUser } from "../../data/fetch";
import { Categories } from "../../components/categories/Categories";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import {
  faEdit,
  faSave,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";

export const Me = () => {
  // * PROPS
  // * CONTEXT
  const { Token, LoggedUser, SetToken, Theme } = useContext(UserContext);
  // * STATI
  const [EditMode, SetEditMode] = useState(false);
  const [UserFormValue, SetUserFormValue] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser) {
      SetUserFormValue(LoggedUser);
    }
  }, [LoggedUser]);
  const HandleSave = () => {
    PutUser(LoggedUser._id, UserFormValue)
      .then(() => alert("Dati modificati correttamente!"))
      .catch((err) => console.log(err));
    SetEditMode(false);
  };
  const HandleOnChange = (e) => {
    SetUserFormValue({ ...UserFormValue, [e.target.name]: e.target.value });
  };
  const HandleDelete = () => {
    DeleteUser(LoggedUser._id)
      .then(() => {
        localStorage.removeItem("token");
        SetToken(null);
        alert("Utente eliminato correttamente!");
      })
      .catch((err) => console.log(err));
  };

  if (Token && UserFormValue)
    return (
      <Container className="pt-xs-2 pt-md-3 pt-lg-5">
        <Row className="mb-3 justify-content-center">
          <Col md={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">I miei dati</h4>
              </Card.Header>

              <Card.Body>
                <Row className="mb-3">
                  <Col md={4} className="text-center">
                    <Image
                      src={UserFormValue.avatar}
                      alt="Avatar"
                      className="rounded-circle img-fluid"
                      width="200px"
                      height="200px"
                    />
                  </Col>
                  <Col md={8}>
                    <Form.Group as={Row}>
                      <Form.Label column md={3}>
                        Nome
                      </Form.Label>
                      <Col md={9}>
                        <Form.Control
                          type="text"
                          name="name"
                          id="name"
                          value={UserFormValue.name}
                          onChange={HandleOnChange}
                          disabled={!EditMode}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column md={3}>
                        Cognome
                      </Form.Label>
                      <Col md={9}>
                        <Form.Control
                          type="text"
                          name="surname"
                          id="surname"
                          value={UserFormValue.surname}
                          onChange={HandleOnChange}
                          disabled={!EditMode}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column md={3}>
                        Data di nascita
                      </Form.Label>
                      <Col md={9}>
                        <Form.Control
                          type="date"
                          name="birthdate"
                          id="birthdate"
                          value={
                            UserFormValue.birthdate &&
                            new Date(UserFormValue.birthdate)
                              .toISOString()
                              .split("T")[0]
                          }
                          onChange={HandleOnChange}
                          disabled={!EditMode}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column md={3}>
                        Email
                      </Form.Label>
                      <Col md={9}>
                        <Form.Control
                          type="email"
                          name="email"
                          id="email"
                          value={UserFormValue.email}
                          onChange={HandleOnChange}
                          disabled={!EditMode}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column md={3}>
                        Tema preferito
                      </Form.Label>
                      <Col md={9}>
                        <Form.Select
                          name="favoriteTheme"
                          id="favoriteTheme"
                          disabled={!EditMode}
                          value={UserFormValue.favoriteTheme}
                          onChange={HandleOnChange}
                        >
                          <option value="light">Chiaro</option>
                          <option value="dark">Scuro</option>
                        </Form.Select>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} hidden={!EditMode}>
                      <Form.Label column md={3}>
                        Password
                      </Form.Label>
                      <Col md={9}>
                        <Form.Control
                          type="password"
                          name="password"
                          id="password"
                          value={UserFormValue.password}
                          onChange={HandleOnChange}
                          disabled={!EditMode}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} hidden={!EditMode}>
                      <Form.Label column md={3}>
                        Conferma password
                      </Form.Label>
                      <Col md={9}>
                        <Form.Control
                          type="password"
                          name="passwordConfirm"
                          id="passwordConfirm"
                          value={UserFormValue.passwordConfirm}
                          onChange={HandleOnChange}
                          disabled={!EditMode}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>

              <Card.Footer className="d-flex justify-content-around">
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
                      onClick={HandleSave}
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
                    <Button variant="danger" onClick={HandleDelete}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </>
                )}
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row className="pb-3">
          <Col md={6}>
            <Categories />
          </Col>
          <Col md={6}>
            <PaymentMethods />
          </Col>
        </Row>
      </Container>
    );
};
