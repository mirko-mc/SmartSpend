import { Row, Card, Button, Container } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetCategories } from "../../data/fetch";
import { NewModal } from "../modals/NewModal";
import { SingleCategory } from "./SingleCategory";
import { CardLoader } from "../loader/CardLoader";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";

export const Categories = () => {
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const [Show, SetShow] = useState(false);
  const [Categories, SetCategories] = useState(null);
  const Navigate = useNavigate();
  // * FUNZIONI
  useEffect(() => {
    !Show &&
      LoggedUser &&
      GetCategories()
        .then((data) => SetCategories(data))
        .catch(() => {
          SetAlertFormValue(
            "getCategories",
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
  }, [LoggedUser, Show]);
  if (!Categories)
    return (
      <Container>
        <Row>
          <CardLoader />
        </Row>
      </Container>
    );

  if (Categories)
    return (
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>Le mie categorie</Card.Title>
        </Card.Header>
        <Card.Body>
          {ShowAlert?.Type === "getCategories" && <MyAlert />}
          {!Categories[0]?.date ? (
            <Card.Text className="text-center">
              Non ci sono categorie.
            </Card.Text>
          ) : (
            Categories.map((category, index) => (
              <SingleCategory
                key={category._id}
                category={category}
                index={index}
                type="mini"
              />
            ))
          )}
        </Card.Body>
        <Card.Footer className="d-flex justify-content-evenly">
          <Button variant={Theme} onClick={() => SetShow(true)}>
            Aggiungi categoria
          </Button>
          <Button variant={Theme} onClick={() => Navigate("/categories")}>
            Visualizza tutte
          </Button>
        </Card.Footer>
        <NewModal Show={Show} SetShow={SetShow} tipo="category" />
      </Card>
    );
};
