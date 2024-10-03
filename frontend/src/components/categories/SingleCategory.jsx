import { Button, Form, ListGroup } from "react-bootstrap";
import { DeleteCategory, PutCategory } from "../../data/fetch";
import { useState } from "react";
import { SetInitialFormValues } from "../../data/formValue";

export const SingleCategory = ({ category }) => {
  console.log("COMPONENTS => singleCategory.jsx");
  // * STATI
  const [Editing, SetEditing] = useState(false);
  const InitialPutCategoryFormValue = SetInitialFormValues("category");
  const [PutCategoryFormValue, SetPutCategoryFormValue] = useState(
    InitialPutCategoryFormValue
  );
  // * FUNZIONI
  const HandleChange = (e) => {
    e.preventDefault();
    SetPutCategoryFormValue({
      ...PutCategoryFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const HandlePutCategory = () => {
    PutCategory(category._id, PutCategoryFormValue)
      .then(() => {
        alert("dati aggiornati correttamente");
        SetEditing(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ListGroup variant="flush" key={category._id}>
      <ListGroup.Item className="d-flex justify-content-evenly align-items-center">
        <Form.Control
          type="text"
          name="name"
          id="name"
          value={PutCategoryFormValue.name}
          disabled={!Editing}
          onChange={HandleChange}
        />
        <Form.Control
          type="text"
          name="type"
          id="type"
          value={PutCategoryFormValue.type}
          disabled={!Editing}
          onChange={HandleChange}
        />
        <Form.Control
          type="text"
          name="description"
          id="description"
          value={PutCategoryFormValue.description}
          disabled={!Editing}
          onChange={HandleChange}
        />
        <Form.Control
          type="color"
          name="color"
          id="color"
          value={PutCategoryFormValue.color}
          disabled={!Editing}
          onChange={HandleChange}
        />
        {!Editing ? (
          <Button
            variant="primary"
            onClick={() => {
              SetEditing(true);
            }}
          >
            Modifica
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={() => {
              HandlePutCategory();
            }}
          >
            Salva
          </Button>
        )}
        {!Editing ? (
          <Button
            variant="danger"
            onClick={() => {
              DeleteCategory(category._id);
            }}
          >
            Elimina
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={() => {
              SetEditing(false);
            }}
          >
            Annulla
          </Button>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};
