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

export const NewTransaction = ({ SetIsNewTransaction }) => {
  // * CONTEXT
  const { Theme, LoggedUser } = useContext(UserContext);
  // * STATI
  const [NewTransaction, SetNewTransaction] = useState(
    SetInitialFormValues("transaction")
  );
  const [PaymentMethods, SetPaymentMethods] = useState(null);
  const [Categories, SetCategories] = useState(null);
  // todo
  // inserire € nel campo importo
  // * FUNZIONI
  useEffect(() => {
    GetPaymentMethods().then((data) => SetPaymentMethods(data));
    GetCategories().then((data) => SetCategories(data));
    SetNewTransaction({ ...NewTransaction, user: LoggedUser._id });
  }, []);
  // gestisco l'inserimento dei dati nel form value raccogliendoli dagli input dell'utente
  const HandleOnChange = (e) => {
    e.preventDefault();
    SetNewTransaction({ ...NewTransaction, [e.target.name]: e.target.value });
    console.log(NewTransaction);
  };
  // gestisco il salvataggio della nuova transazione
  const HandleSaveTransaction = async (e) => {
    e.preventDefault();
    // todo gestire errore creazione transazione
    // todo implementare alert di conferma/errore creazione transazione
    await PostTransaction(NewTransaction)
      .then(() => alert("Transazione creata"))
      .catch((err) => console.log(err))
      .finally(() => SetIsNewTransaction(false));
    // todo postare il totale nella tabella
  };
  return (
    <Col>
      <Card className="mb-3 shadow">
        <Form onSubmit={HandleSaveTransaction}>
          <Card.Header>
            <Card.Title>Nuova transazione</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
              <Col md={6}>
                <Form.Label>Negozio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci negozio"
                  name="shop"
                  id="shop"
                  value={NewTransaction.shop}
                  onChange={HandleOnChange}
                />
              </Col>
              <Col md={6}>
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

            <Form.Group as={Row} className="mb-3">
              <Col md={4}>
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
              <Col md={4}>
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
              <Col md={4}>
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
                placeholder="Inserisci descrizione"
                name="description"
                id="description"
                maxLength={50}
                value={NewTransaction.description}
                onChange={HandleOnChange}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col md={6}>
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
              <Col md={6}>
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
              Annulla <FontAwesomeIcon icon={faXmark} size="xl" />
            </Button>
            <Button
              variant={Theme === "light" ? "success" : "outline-success"}
              type="submit"
            >
              Salva <FontAwesomeIcon icon={faSave} size="xl" />
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </Col>
  );
};
