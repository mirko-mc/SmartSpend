import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteTransaction } from "../../data/fetch";
import { NewModal } from "../modals/NewModal";
import { EditModal } from "../modals/EditModal";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../context/UserContextProvider";

export const SingleTransaction = ({ transaction, IsPrivacy, index }) => {
  console.log("COMPONENT => SingleTransaction.jsx");

  // * CONTEXT
  const { Theme } = useContext(UserContext);
  // * STATI
  const Navigate = useNavigate();
  const [Show, SetShow] = useState(false);
  // * FUNZIONI
  const HandleEditTransaction = () => {};

  const HandleDeleteTransaction = () => {
    DeleteTransaction(transaction._id)
      .then(() => {
        Navigate(0);
        alert("Transazione eliminata correttamente!");
      })
      .catch((err) => console.log(err));
  };
  if (transaction)
    return (
      <ListGroup variant="flush" className="mb-1 shadow">
        <ListGroup.Item
          key={transaction._id}
          className="d-flex justify-content-evenly align-items-center w-100"
        >
          <Form.Group>
            {index === 0 && <Form.Label>Importo</Form.Label>}
            <Form.Control
              type="number"
              name="amount"
              value={transaction.amount}
              disabled
            />
          </Form.Group>

          <Form.Group>
            {index === 0 && <Form.Label>Categoria</Form.Label>}
            <Form.Control
              type="text"
              name="category"
              value={transaction.category?.name}
              disabled
            />
          </Form.Group>

          <Form.Group>
            {index === 0 && <Form.Label>Data</Form.Label>}
            <Form.Control
              type="date"
              name="date"
              value={new Date(transaction.date).toISOString().slice(0, 10)}
              disabled
            />
          </Form.Group>

          <Form.Group>
            {index === 0 && <Form.Label>Descrizione</Form.Label>}
            <Form.Control
              type="description"
              name="description"
              value={transaction.description}
              disabled
            />
          </Form.Group>

          <Form.Group>
            {index === 0 && <Form.Label className="d-block">Azioni</Form.Label>}
            <Button variant={Theme} onClick={() => {}}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              variant="danger"
              onClick={() => HandleDeleteTransaction(transaction._id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </Form.Group>
        </ListGroup.Item>
      </ListGroup>
    );
  return (
    <tr>
      <EditModal
        tipo="transaction"
        Show={Show}
        SetShow={SetShow}
        toEdit={transaction}
      />
      <td>{new Date(transaction.date).toLocaleDateString()}</td>
      <td>{IsPrivacy ? "******" : transaction.amount} €</td>
      <td>{transaction.description}</td>
      <td>{transaction.paymentMethod?.name}</td>
      <td>
        <Button
          variant={transaction.user.favoriteTheme}
          onClick={() => Navigate(`/transactions/${transaction._id}`)}
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>
        <Button
          variant={transaction.user.favoriteTheme}
          onClick={() => SetShow(true)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button
          variant={transaction.user.favoriteTheme}
          onClick={HandleDeleteTransaction}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </td>
    </tr>
  );
};
