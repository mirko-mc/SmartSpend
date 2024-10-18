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
import { DeleteUser, PatchUserAvatar, PutUser } from "../../data/fetch";
import { Categories } from "../../components/categories/Categories";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  faEdit,
  faSave,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../../components/utils/MyAlert";

export const Me = () => {
  // * PROPS
  // * CONTEXT
  const { Token, LoggedUser, SetToken, Theme, GetMeData } =
    useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const [EditMode, SetEditMode] = useState(false);
  const [EditUserAvatar, SetEditUserAvatar] = useState(null);
  const [UserFormValue, SetUserFormValue] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser) {
      SetUserFormValue(LoggedUser);
    }
  }, [LoggedUser]);
  const HandleSave = () => {
    if (EditUserAvatar.avatar) {
      const FD = new FormData();
      FD.append("avatar", EditUserAvatar.avatar);
      PatchUserAvatar(LoggedUser._id.toString(), FD)
        .then(() => {
          SetAlertFormValue(
            "patchUser",
            "success",
            "Avatar aggiornato",
            "Foto profilo aggiornata con successo"
          ).then((AlertFormValue) => {
            SetShowAlert(AlertFormValue);
          });
          setTimeout(() => {
            SetShowAlert(false);
            GetMeData();
          }, 3 * 1000);
        })
        .catch((err) => {
          SetAlertFormValue(
            "patchUser",
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
    }
    PutUser(LoggedUser._id, UserFormValue)
      .then(() => {
        SetAlertFormValue(
          "putUser",
          "success",
          "Dati aggiornati",
          "Dati aggiornati correttamente"
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
          SetEditMode(false);
        }, 3 * 1000);
      })
      .catch((err) => {
        SetAlertFormValue(
          "putUser",
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
  const HandleOnChange = (e) => {
    SetUserFormValue({ ...UserFormValue, [e.target.name]: e.target.value });
  };
  const HandleDelete = () => {
    DeleteUser(LoggedUser._id)
      .then(() => {
        localStorage.removeItem("token");
        SetToken(null);
        SetAlertFormValue(
          "deleteUser",
          "success",
          "Ci dispiace ci abbia abbandonato",
          "Utente eliminato con successo"
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
        }, 3 * 1000);
      })
      .catch((err) => {
        SetAlertFormValue(
          "deleteUser",
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
  if (Token && UserFormValue)
    return (
      <Container className="pt-4">
        <Row className="mb-3 justify-content-center">
          <h1 className="text-center mb-3">Il mio profilo</h1>
          <Col md={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">I miei dati</h4>
              </Card.Header>

              <Card.Body>
                <Row className="mb-3">
                  <Col
                    md={4}
                    className="d-flex flex-column justify-content-center align-items-center"
                  >
                    <Image
                      src={UserFormValue.avatar}
                      alt="Avatar"
                      className="px-3 rounded-circle img-fluid"
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
                            UserFormValue?.birthdate
                              ? new Date(UserFormValue.birthdate)
                                  .toISOString()
                                  .split("T")[0]
                              : undefined
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

                    <Form.Group as={Row}>
                      <Form.Label column md={3} hidden={!EditMode}>
                        Avatar
                      </Form.Label>
                      <Col md={9}>
                        <Form.Control
                          type="file"
                          name="avatar"
                          id="avatar"
                          accept=".jpg, .png"
                          onChange={(e) =>
                            SetEditUserAvatar({
                              ...EditUserAvatar,
                              avatar: e.target.files[0],
                            })
                          }
                          hidden={!EditMode}
                        />
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
                  {ShowAlert?.Type === "patchUser" && <MyAlert />}
                  {ShowAlert?.Type === "putUser" && <MyAlert />}
                  {ShowAlert?.Type === "deleteUser" && <MyAlert />}
                </Row>
              </Card.Body>

              <Card.Footer className="d-flex justify-content-around">
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
                      onClick={HandleSave}
                    >
                      <span>Salva &nbsp;</span>
                      <FontAwesomeIcon icon={faSave} size="xl" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant={
                        Theme === "dark"
                          ? "outline-secondary"
                          : "outline-primary"
                      }
                      onClick={() => SetEditMode(true)}
                    >
                      <span>Modifica &nbsp;</span>
                      <FontAwesomeIcon icon={faEdit} size="xl" />
                    </Button>
                    <Button variant="danger" onClick={HandleDelete}>
                      <span>Elimina account &nbsp;</span>
                      <FontAwesomeIcon icon={faTrashAlt} size="xl" />
                    </Button>
                  </>
                )}
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="pb-3">
            <Categories />
          </Col>
          <Col md={6} className="pb-3">
            <PaymentMethods />
          </Col>
        </Row>
      </Container>
    );
};
