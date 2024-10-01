import { Button, Modal } from "react-bootstrap";
import { NewTransaction } from "../transaction/NewTransaction";

export const NewModal = ({ show, handleClose, handleSave }) => {
  console.log("COMPONENT => NewModal.jsx");
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Titolo del modale</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewTransaction />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
