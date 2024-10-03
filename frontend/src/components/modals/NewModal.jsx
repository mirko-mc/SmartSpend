import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { NewCategory } from "../categories/NewCategory";
import { NewPaymentMethod } from "../paymentMethods/NewPaymentMethod";
import { SetInitialFormValues } from "../../data/formValue";
import { PostCategory, PostPaymentMethod } from "../../data/fetch";

export const NewModal = ({ tipo, Show, SetShow }) => {
  const HandleClose = () => SetShow(false);
  const [NewCPMFormValue, SetNewCPMFormValue] = useState(
    SetInitialFormValues(tipo)
  );
  const HandleNewCPM = async (e) => {
    e.preventDefault();
    // todo gestire errore creazione categoria
    // todo implementare alert di conferma/errore creazione categoria
    console.log(NewCPMFormValue);
    if (tipo === "category")
      PostCategory(NewCPMFormValue)
        .then(() => {
          alert("CATEGORIA AGGIUNTA CORRETTAMENTE");
          SetShow(false);
        })
        .catch((err) => console.log(err));
    if (tipo === "paymentMethod")
      PostPaymentMethod(NewCPMFormValue)
        .then(() => {
          alert("METODO AGGIUNTO CORRETTAMENTE");
          SetShow(false);
        })
        .catch((err) => console.log(err));
  };
  return (
    <>
      <Modal show={Show} onHide={HandleClose}>
        <Modal.Header closeButton>
          {tipo === "category" && (
            <h5 className="modal-title" id="newModalLabel">
              Aggiungi una nuova categoria
            </h5>
          )}
          {tipo === "paymentMethod" && (
            <h5 className="modal-title" id="newModalLabel">
              Aggiungi un nuovo metodo di pagamento
            </h5>
          )}
        </Modal.Header>
        <Modal.Body>
          {tipo === "category" && (
            <NewCategory
              NewCPMFormValue={NewCPMFormValue}
              SetNewCPMFormValue={SetNewCPMFormValue}
              HandleNewCPM={HandleNewCPM}
            />
          )}
          {tipo === "paymentMethod" && (
            <NewPaymentMethod
              NewCPMFormValue={NewCPMFormValue}
              SetNewCPMFormValue={SetNewCPMFormValue}
              HandleNewCPM={HandleNewCPM}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={HandleNewCPM}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
