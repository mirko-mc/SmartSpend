import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { NewCategory } from "../categories/NewCategory";
import { NewPaymentMethod } from "../paymentMethods/NewPaymentMethod";
import { SetInitialFormValues } from "../../data/formValue";
import {
  PutCategory,
  PutPaymentMethod,
  PutTransaction,
} from "../../data/fetch";
import { EditTransaction } from "../transaction/EditTransaction";
import { EditCategory } from "../categories/EditCategory";
import { EditPaymentMethod } from "../paymentMethods/EditPaymentMethod";

export const EditModal = ({ tipo, Show, SetShow, toEdit }) => {
  const [EditFormValue, SetEditFormValue] = useState(
    SetInitialFormValues(tipo)
  );
  const HandleEdit = async (e) => {
    e.preventDefault();
    // todo gestire errore creazione categoria
    // todo implementare alert di conferma/errore creazione categoria
    console.log(EditFormValue);
    if (tipo === "category")
      PutCategory(EditFormValue._id, EditFormValue)
        .then(() => {
          alert("CATEGORIA MODIFICATA CORRETTAMENTE");
          SetShow(false);
        })
        .catch((err) => console.log(err));
    if (tipo === "paymentMethod")
      PutPaymentMethod(EditFormValue._id, EditFormValue)
        .then(() => {
          alert("METODO DI PAGAMENTO MODIFICATO CORRETTAMENTE");
          SetShow(false);
        })
        .catch((err) => console.log(err));
    if (tipo === "transaction")
      PutTransaction(EditFormValue._id, EditFormValue)
        .then(() => {
          alert("TRANSAZIONE MODIFICATA CORRETTAMENTE");
          SetShow(false);
        })
        .catch((err) => console.log(err));
  };
  return (
    <>
      <Modal show={Show} onHide={() => SetShow(false)}>
        <Modal.Header closeButton>
          {tipo === "category" && (
            <h5 className="modal-title" id="newModalLabel">
              Modifica una categoria
            </h5>
          )}
          {tipo === "paymentMethod" && (
            <h5 className="modal-title" id="newModalLabel">
              Modifica un metodo di pagamento
            </h5>
          )}
          {tipo === "transaction" && (
            <h5 className="modal-title" id="newModalLabel">
              Modifica una transazione
            </h5>
          )}
        </Modal.Header>
        <Modal.Body>
          {tipo === "category" && (
            <EditCategory
              EditFormValue={EditFormValue}
              SetEditFormValue={SetEditFormValue}
              HandleEdit={HandleEdit}
              category={toEdit}
            />
          )}
          {tipo === "paymentMethod" && (
            <EditPaymentMethod
              EditFormValue={EditFormValue}
              SetEditFormValue={SetEditFormValue}
              HandleEdit={HandleEdit}
              paymentMethod={toEdit}
            />
          )}
          {tipo === "transaction" && (
            <EditTransaction
              EditFormValue={EditFormValue}
              SetEditFormValue={SetEditFormValue}
              HandleEdit={HandleEdit}
              transaction={toEdit}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => SetShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={HandleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
