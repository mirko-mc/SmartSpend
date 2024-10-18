import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { SetInitialFormValues } from "../../data/formValue";
import { PatchUserAvatar, PostRegister } from "../../data/fetch";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";

export const Register = ({ SetShowLoginRegister }) => {
  // * CONTEXT
  const { Theme, SetToken } = useContext(UserContext);
  const { SetAlertFormValue, ShowAlert, SetShowAlert } =
    useContext(AlertContext);
  // * INITIAL FORM VALUE
  const InitialFormValue = SetInitialFormValues("user");
  // * STATI
  const [UserFormValue, SetUserFormValue] = useState(InitialFormValue);
  // * FUNZIONI
  const HandleOnChange = (e) => {
    SetUserFormValue({ ...UserFormValue, [e.target.name]: e.target.value });
  };
  const HandlePostRegister = async (e) => {
    try {
      // prevengo il refresh della pagina
      e.preventDefault();
      console.log(UserFormValue);
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
      localStorage.setItem("token", NewUser.token);
    } catch (err) {
      SetAlertFormValue(
        "register",
        "danger",
        "ERROR",
        "C'è stato un errore nel registrare i tuoi dati, riprova più tardi."
      ).then((AlertFormValue) => {
        SetShowAlert(AlertFormValue);
      });
      setTimeout(() => {
        SetShowAlert(false);
      }, 3 * 1000);
    }
  };
  return (
    <Form onSubmit={HandlePostRegister} className="mx-auto pt-4 mb-3">
      <h1 className="text-center">Registrazione</h1>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle className="text-center">
            Inserisci i tuoi dati per effettuare la registrazione
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form.Group as={Row} className="mb-3">
            <Col sm={4}>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                id="name"
                type="text"
                name="name"
                placeholder="Inserisci il tuo nome"
                onChange={HandleOnChange}
                required
                minLength={3}
              />
            </Col>
            <Col sm={4}>
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                id="surname"
                type="text"
                name="surname"
                placeholder="Inserisci il tuo cognome"
                onChange={HandleOnChange}
              />
            </Col>
            <Col sm={4}>
              <Form.Label>Data di nascita</Form.Label>
              <Form.Control
                id="birthdate"
                type="date"
                name="birthdate"
                placeholder="Inserisci la tua data di nascita"
                onChange={HandleOnChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={4}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                name="email"
                placeholder="Inserisci la tua email"
                onChange={HandleOnChange}
                required
              />
            </Col>
            <Col sm={4}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                name="password"
                placeholder="Inserisci la tua password"
                onChange={HandleOnChange}
                required
                minLength={6}
              />
            </Col>
            <Col sm={4}>
              <Form.Label>Conferma password</Form.Label>
              <Form.Control
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                placeholder="Conferma la tua password"
                onChange={HandleOnChange}
                required
                minLength={6}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={4} className="offset-sm-2">
              <Form.Label>Tema preferito</Form.Label>
              <Form.Select
                name="favoriteTheme"
                onChange={HandleOnChange}
                id="favoriteTheme"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Form.Select>
            </Col>
            <Col sm={4}>
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                id="avatar"
                accept=".jpg, .png"
                onChange={(e) =>
                  SetUserFormValue({
                    ...UserFormValue,
                    avatar: e.target.files[0],
                  })
                }
              />
            </Col>
          </Form.Group>
        </CardBody>
        <CardFooter className="d-flex justify-content-evenly align-items-center">
          {ShowAlert?.Type === "register" ? (
            <MyAlert />
          ) : (
            <>
              <Button
                variant={
                  Theme === "light" ? "outline-primary" : "outline-secondary"
                }
                type="submit"
              >
                Registrati
              </Button>
              <Button
                variant={
                  Theme === "light" ? "outline-primary" : "outline-secondary"
                }
                onClick={() => SetShowLoginRegister(true)}
              >
                Vai ai metodi d'accesso
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </Form>
  );
};
