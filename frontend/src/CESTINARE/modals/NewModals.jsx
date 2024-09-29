import { useContext, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { SetInitialFormValue, SetInitialFormValues } from "../../data/formValue";
import { PatchUserAvatar, PostRegister } from "../../data/fetch";
import { UserContext } from "../../context/UserContextProvider";

export const NewModals = (props) => {
  console.log("MODALS => NewModals.jsx");
  // * CONTEXT
  const { SetToken } = useContext(UserContext);
  // * PROPS
  const { HandleShowClose, ShowNew, NewType } = props;
  // * INITIAL FORM VALUE
  const InitialFormValue = SetInitialFormValues(NewType);
  // * STATI
  const [UserFormValue, SetUserFormValue] = useState(InitialFormValue);
  // * FUNZIONI
  const HandleOnChange = (e) => {
    SetUserFormValue({ ...UserFormValue, [e.target.name]: e.target.value });
  };
  const HandlePostRegister = async (e) => {
    console.log("MODALS => NewModals.jsx => HandlePostRegister");
    // prevengo il refresh della pagina
    e.preventDefault();
    // salvo l'utente
    const NewUser = await PostRegister(UserFormValue);
    // inizio a settare il token nella localStorage perché la patch dell'avatar è su rotta protetta
    localStorage.setItem("token", NewUser.token);
    // se l'utente ha fornito l'avatar allora patch avatar
    if (UserFormValue.avatar) {
      const FD = new FormData();
      FD.append("avatar", UserFormValue.avatar);
      await PatchUserAvatar(NewUser.id, FD);
    }
    // inserisco token in context
    SetToken(NewUser.token);
    HandleShowClose();
  };
  return (
    <Modal show={ShowNew} onHide={HandleShowClose}>
      <Form onSubmit={HandlePostRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Registrazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(InitialFormValue).map((key) => (
            <Form.Group key={key}>
              <Row className="mb-2">
                <Col md={6} className="w-25">
                  <Form.Label>{key}</Form.Label>
                </Col>
                <Col md={6} className="w-75">
                  {(() => {
                    switch (key) {
                      case "name":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="text"
                            onChange={HandleOnChange}
                            required
                          />
                        );
                      case "shop":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="text"
                            onChange={HandleOnChange}
                            required
                          />
                        );
                      case "address":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="text"
                            onChange={HandleOnChange}
                            required
                          />
                        );
                      case "description":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="text"
                            onChange={HandleOnChange}
                            required
                          />
                        );
                      case "date":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="date"
                            onChange={HandleOnChange}
                            required
                          />
                        );
                      case "color":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="color"
                            onChange={HandleOnChange}
                            required
                          />
                        );
                      case "surname":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="text"
                            onChange={HandleOnChange}
                          />
                        );
                      case "category":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="text"
                            onChange={HandleOnChange}
                          />
                        );
                      case "paymentMethod":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="text"
                            onChange={HandleOnChange}
                          />
                        );
                      case "email":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="email"
                            required
                            onChange={HandleOnChange}
                          />
                        );
                      case "initialBalance":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="number"
                            required
                            min={0}
                            onChange={HandleOnChange}
                          />
                        );
                      case "amount":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="number"
                            required
                            onChange={HandleOnChange}
                          />
                        );
                      case "password":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="password"
                            required
                            minLength={6}
                            onChange={HandleOnChange}
                          />
                        );
                      case "passwordConfirm":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="password"
                            required
                            minLength={6}
                            onChange={HandleOnChange}
                          />
                        );
                      case "avatar":
                        return (
                          <Form.Control
                            id={key}
                            name={key}
                            type="file"
                            accept=".jpg, .png"
                            onChange={(e) =>
                              SetUserFormValue({
                                ...UserFormValue,
                                [key]: e.target.files[0],
                              })
                            }
                          />
                        );
                      case "favoriteTheme":
                        return (
                          <Form.Select
                            id={key}
                            name={key}
                            onChange={HandleOnChange}
                          >
                            <option value="light">Chiaro</option>
                            <option defaultValue="dark">Scuro</option>
                          </Form.Select>
                        );
                      case "type":
                        // ??? è presente sia nell categorie che nei metodi di pagamento come array enum quindi dovrei fetcharlo per mostrare all'utente le varie opzioni
                        return (
                          <Form.Select
                            id={key}
                            name={key}
                            onChange={HandleOnChange}
                            value={"dark"}
                          >
                            <option value="light">Chiaro</option>
                            <option value="dark" selected>
                              Scuro
                            </option>
                          </Form.Select>
                        );
                      default:
                        break;
                    }
                  })()}
                </Col>
              </Row>
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandleShowClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
