import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteTransaction } from "../../data/fetch";
import { NewModal } from "../modals/NewModal";
import { EditModal } from "../modals/EditModal";
import { useState } from "react";

export const SingleTransaction = ({ transaction, IsPrivacy }) => {
  console.log("COMPONENT => SingleTransaction.jsx");

  // * CONTEXT
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
          👁
        </Button>
        <Button
          variant={transaction.user.favoriteTheme}
          onClick={() => SetShow(true)}
        >
          ✏
        </Button>
        <Button
          variant={transaction.user.favoriteTheme}
          onClick={HandleDeleteTransaction}
        >
          🗑
        </Button>
      </td>
    </tr>
  );
};
