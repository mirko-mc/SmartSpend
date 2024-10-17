import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { NewCategory } from "../categories/NewCategory";
import { NewPaymentMethod } from "../paymentMethods/NewPaymentMethod";
import { SetInitialFormValues } from "../../data/formValue";
import { PostCategory, PostPaymentMethod } from "../../data/fetch";
import { UserContext } from "../../context/UserContextProvider";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";

export const NewModal = ({ tipo, Show, SetShow }) => {
  // * CONTEXT
  const { Theme, LoggedUser } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * FUNZIONI
  const HandleClose = () => SetShow(false);
  const [NewCPMFormValue, SetNewCPMFormValue] = useState(
    SetInitialFormValues(tipo)
  );
  useEffect(() => {
    SetNewCPMFormValue({ ...NewCPMFormValue, user: LoggedUser._id });
  }, []);
  const HandleNewCPM = async (e) => {
    e.preventDefault();
    if (tipo === "category")
      PostCategory(NewCPMFormValue)
        .then(() => SetShow(false))
        .catch((err) => {
          SetAlertFormValue(
            "postCategory",
            "danger",
            "ERROR",
            "Si è verificato un errore, riprova più tardi"
          ).then((AlertFormValue) => {
            SetShowAlert(AlertFormValue);
          });
          setTimeout(() => {
            SetShowAlert(false);
          }, 5 * 1000);
        });
    if (tipo === "paymentMethod")
      PostPaymentMethod(NewCPMFormValue)
        .then(() => SetShow(false))
        .catch((err) => {
          SetAlertFormValue(
            "postPaymentMethod",
            "danger",
            "ERROR",
            "Si è verificato un errore, riprova più tardi"
          ).then((AlertFormValue) => {
            SetShowAlert(AlertFormValue);
          });
          setTimeout(() => {
            SetShowAlert(false);
          }, 5 * 1000);
        });
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
          {tipo === "category" &&
            (ShowAlert?.Type === "postCategory" ? (
              <MyAlert />
            ) : (
              <NewCategory
                NewCPMFormValue={NewCPMFormValue}
                SetNewCPMFormValue={SetNewCPMFormValue}
                HandleNewCPM={HandleNewCPM}
              />
            ))}
          {tipo === "paymentMethod" &&
            (ShowAlert?.Type === "postPaymentMethod" ? (
              <MyAlert />
            ) : (
              <NewPaymentMethod
                NewCPMFormValue={NewCPMFormValue}
                SetNewCPMFormValue={SetNewCPMFormValue}
                HandleNewCPM={HandleNewCPM}
              />
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandleClose}>
            Close
          </Button>
          <Button variant={Theme} onClick={HandleNewCPM}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
