import { Button, Col, Form } from "react-bootstrap";
import { PostLogin } from "../../data/fetch";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { MyAlert } from "../utils/MyAlert";
import { AlertContext } from "../../context/AlertContextProvider";

export const LoginMailPassword = () => {
  // * CONTEXT
  const { Theme, SetToken } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  // * FUNZIONI
  const HandleLogin = (event) => {
    // evito che si aggiorni la pagina
    event.preventDefault();
    PostLogin({ email: event.target[0].value, password: event.target[1].value })
      .then((data) => {
        localStorage.setItem("token", data.token);
        SetToken(data.token);
      })
      .catch(() => {
        SetAlertFormValue(
          "login",
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
    return (
      <Col
        md={6}
        className="d-flex align-items-center justify-content-center flex-column"
      >
        <h6>Inserisci username e password per accedere</h6>
        {ShowAlert?.Type === "login" && <MyAlert />}
        <Form
          onSubmit={HandleLogin}
          className="d-flex flex-column align-items-center mt-3"
        >
          <Form.Group className="mb-3" controlId="emailPasswordForm">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Inserisci email" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Inserisci password"
              minLength={6}
              required
            />
          </Form.Group>
          <Button variant={Theme === "light" ? "outline-primary" : "outline-secondary"} type="submit">
            Accedi
          </Button>
        </Form>
      </Col>
    );
};
