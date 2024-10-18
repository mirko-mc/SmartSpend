import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { NewCategory } from "../categories/NewCategory";
import { NewPaymentMethod } from "../paymentMethods/NewPaymentMethod";
import { SetInitialFormValues } from "../../data/formValue";
import { PostCategory, PostPaymentMethod } from "../../data/fetch";
import { UserContext } from "../../context/UserContextProvider";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faXmark } from "@fortawesome/free-solid-svg-icons";

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
          }, 3 * 1000);
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
          }, 3 * 1000);
        });
  };
  return (
    <>
      <Modal show={Show} onHide={HandleClose}>
        <Modal.Header
          closeButton
          className={Theme === "dark" && "modal-header-dark"}
        >
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

        <Modal.Body
          className={"modal-body-dark"}
        >
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

        <Modal.Footer
          variant={Theme}
          className={Theme === "dark" && "dark"}
        >
          <Button
            variant={Theme === "light" ? "danger" : "outline-danger"}
            onClick={HandleClose}
          >
            <span>
              Chiudi &nbsp; <FontAwesomeIcon icon={faXmark} />
            </span>
          </Button>
          <Button
            variant={Theme === "light" ? "success" : "outline-success"}
            onClick={HandleNewCPM}
          >
            <span>
              Salva &nbsp; <FontAwesomeIcon icon={faSave} />
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
