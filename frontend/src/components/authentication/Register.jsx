import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { SetInitialFormValues } from "../../data/formValue";
import { PatchUserAvatar, PostRegister } from "../../data/fetch";
import { Button, Col, Form, Row } from "react-bootstrap";

export const Register = ({ SetShowLoginRegister }) => {
  console.log("AUTHENTICATION => Register.jsx");
  // * CONTEXT
  const { Theme, SetToken } = useContext(UserContext);
  // * INITIAL FORM VALUE
  const InitialFormValue = SetInitialFormValues("user");
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
  };
  return (
    <Form onSubmit={HandlePostRegister}>
      <h1>Registrati</h1>
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
        <Col sm={4}>
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
              SetUserFormValue({ ...UserFormValue, avatar: e.target.files[0] })
            }
          />
        </Col>
      </Form.Group>
      <Button variant={Theme} type="submit">
        Registrati
      </Button>
      <span> oppure </span>
      <Button variant={Theme} onClick={() => SetShowLoginRegister(true)}>
        Vai ai metodi d'accesso
      </Button>
    </Form>
  );
};
