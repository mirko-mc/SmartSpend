import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export const NewModals = () => {
  // INITIAL FORM VALUE
  const InitialUserFormValue = {
    name: "",
    surname: "",
    email: "",
    password: "",
    avatar: "",
    favoriteTheme: "",
    googleId: "",
    verifiedAt: "",
  };
  // STATI
  const [Show, SetShow] = useState(false);
  const [UserFormValue, SetUserFormValue] = useState(InitialUserFormValue);
  // FUNZIONI
  const handleClose = () => SetShow(false);
  const handleShow = () => SetShow(true);
  // todo
  // agganciare il modale al pulsante registrati
  // provare a riciclare il modale anche per l'edit
  // salvataggio avatar
  // salvataggio utente
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={Show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(InitialUserFormValue).map((key) => (
              <Form.Group key={key}>
                <Row className="mb-2">
                  <Col md={6} className="w-25">
                    <Form.Label>{key}</Form.Label>
                  </Col>
                  <Col md={6} className="w-75">
                    <Form.Control
                      id={key}
                      name={key}
                      type={
                        key === "password"
                          ? "password"
                          : key === "avatar"
                          ? "file"
                          : key === "email"
                          ? "email"
                          : "text"
                      }
                      value={UserFormValue[key]}
                      onChange={(e) =>
                        SetUserFormValue({
                          ...UserFormValue,
                          [key]: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
