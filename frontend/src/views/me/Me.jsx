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
import { SetInitialFormValues } from "../../data/formValue";
import { DeleteUser, PutUser } from "../../data/fetch";
import { Categories } from "../../components/categories/Categories";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";

export const Me = () => {
  console.log("VIEWS => Me.jsx");
  // * PROPS
  // * CONTEXT
  const { Token, LoggedUser, SetToken, Theme } = useContext(UserContext);
  // // * INITIAL FORM VALUE
  // const InitialFormValue = LoggedUser;
  // console.log(InitialFormValue);
  // * STATI
  const [Editing, SetEditing] = useState(false);
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
    SetEditing(false);
  };
  const HandleOnChange = (e) => {
    SetUserFormValue({ ...UserFormValue, [e.target.name]: e.target.value });
    console.log(UserFormValue);
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
      <Container className="mt-5" data-bs-theme={Theme} bg={Theme}>
        <Row className="justify-content-center">
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
                          disabled={!Editing}
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
                          disabled={!Editing}
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
                            new Date(UserFormValue.birthdate)
                              .toISOString()
                              .split("T")[0]
                          }
                          onChange={HandleOnChange}
                          disabled={!Editing}
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
                          disabled={!Editing}
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
                          disabled={!Editing}
                          value={UserFormValue.favoriteTheme}
                          onChange={HandleOnChange}
                        >
                          <option value="light">Chiaro</option>
                          <option value="dark">Scuro</option>
                        </Form.Select>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} hidden={!Editing}>
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
                          disabled={!Editing}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} hidden={!Editing}>
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
                          disabled={!Editing}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>

              <Card.Footer className="d-flex justify-content-around">
                {Editing ? (
                  <Button variant="success" onClick={HandleSave}>
                    Salva
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => SetEditing(!Editing)}
                  >
                    Modifica profilo
                  </Button>
                )}
                <Button variant="danger" onClick={HandleDelete}>
                  Elimina account
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <h5 className="mb-2">Budget:</h5>
            <p className="text-muted">€ {UserFormValue.balance}</p>
          </Col>
        </Row>

        <Row className="mb-3">
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
