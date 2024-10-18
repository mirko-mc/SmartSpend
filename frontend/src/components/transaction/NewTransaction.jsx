import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { SetInitialFormValues } from "../../data/formValue";
import {
  GetCategories,
  GetPaymentMethods,
  PostTransaction,
} from "../../data/fetch";
import { UserContext } from "../../context/UserContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";

export const NewTransaction = ({ SetIsNewTransaction }) => {
  // * CONTEXT
  const { Theme, LoggedUser } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const [NewTransaction, SetNewTransaction] = useState(
    SetInitialFormValues("transaction")
  );
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const [Categories, SetCategories] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    GetPaymentMethods()
      .then((data) => SetPaymentMethods(data))
      .catch(() => {
        SetAlertFormValue(
          "newTransaction",
          "danger",
          "ERROR",
          "Errore nel recupero dei metodi di pagamento, riprova più tardi."
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
        }, 3 * 1000);
      });
    GetCategories()
      .then((data) => SetCategories(data))
      .catch(() => {
        SetAlertFormValue(
          "newTransaction",
          "danger",
          "ERROR",
          "Errore nel recupero delle categorie, riprova più tardi."
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
        }, 3 * 1000);
      });
    SetNewTransaction({ ...NewTransaction, user: LoggedUser._id });
  }, []);
  // gestisco l'inserimento dei dati nel form value raccogliendoli dagli input dell'utente
  const HandleOnChange = (e) => {
    e.preventDefault();
    SetNewTransaction({ ...NewTransaction, [e.target.name]: e.target.value });
  };
  // gestisco il salvataggio della nuova transazione
  const HandleSaveTransaction = async (e) => {
    e.preventDefault();
    await PostTransaction(NewTransaction)
      .then(() => {
        SetAlertFormValue(
          "newTransaction",
          "success",
          "MOVIMENTO AGGIUNTO",
          "Movimento aggiunto con successo."
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
          SetIsNewTransaction(false);
        }, 3 * 1000);
      })
      .catch(() => {
        SetAlertFormValue(
          "newTransaction",
          "danger",
          "ERROR",
          "Errore nella creazione del movimento, riprova più tardi."
        ).then((AlertFormValue) => {
          SetShowAlert(AlertFormValue);
        });
        setTimeout(() => {
          SetShowAlert(false);
        }, 3 * 1000);
      });
  };

  if (ShowAlert) return <MyAlert />;
  return (
    <Col>
      <Card className="mb-3 shadow">
        <Form onSubmit={HandleSaveTransaction}>
          <Card.Header>
            <Card.Title>Nuova transazione</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              <Col md={6} className="mb-3">
                <Form.Label>Dove</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ad esempio il negozio"
                  name="shop"
                  id="shop"
                  value={NewTransaction.shop}
                  onChange={HandleOnChange}
                  required
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Indirizzo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci indirizzo"
                  name="address"
                  id="address"
                  value={NewTransaction.address}
                  onChange={HandleOnChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col md={4} className="mb-3">
                <Form.Label>Importo</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Inserisci importo"
                  name="amount"
                  id="amount"
                  value={NewTransaction.amount}
                  onChange={HandleOnChange}
                  required
                  min={0}
                  step={0.01}
                  max={9999.99}
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Inserisci data"
                  required
                  value={NewTransaction.date}
                  onChange={HandleOnChange}
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>Tipo</Form.Label>
                <Form.Select
                  name="inOut"
                  id="inOut"
                  required
                  value={NewTransaction.inOut}
                  onChange={HandleOnChange}
                >
                  <option value="">Seleziona un tipo</option>
                  <option value="in">Entrata</option>
                  <option value="out">Uscita</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                placeholder="Inserisci descrizione"
                name="description"
                id="description"
                maxLength={50}
                value={NewTransaction.description}
                onChange={HandleOnChange}
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Col md={6} className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Select
                  name="category"
                  id="category"
                  required
                  value={NewTransaction.category}
                  onChange={HandleOnChange}
                >
                  <option value="">Seleziona una categoria</option>
                  {Categories &&
                    Categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </Form.Select>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Metodo di pagamento</Form.Label>
                <Form.Select
                  name="paymentMethod"
                  id="paymentMethod"
                  required
                  value={NewTransaction.paymentMethod}
                  onChange={HandleOnChange}
                >
                  <option value="">Seleziona un metodo di pagamento</option>
                  {PaymentMethods &&
                    PaymentMethods.map((paymentMethod) => (
                      <option key={paymentMethod._id} value={paymentMethod._id}>
                        {paymentMethod.name}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-evenly">
            <Button
              variant={Theme === "light" ? "danger" : "outline-danger"}
              onClick={() => SetIsNewTransaction(false)}
            >
              <span>Annulla &nbsp;</span>
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </Button>
            <Button
              variant={Theme === "light" ? "success" : "outline-success"}
              type="submit"
            >
              <span>Salva &nbsp;</span>
              <FontAwesomeIcon icon={faSave} size="xl" />
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </Col>
  );
};
