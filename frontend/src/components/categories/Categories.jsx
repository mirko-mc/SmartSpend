import { Row, Col, Card, Button, Container } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetCategories } from "../../data/fetch";
import { NewModal } from "../modals/NewModal";
import { SingleCategory } from "./SingleCategory";
import { CardLoader } from "../loader/CardLoader";
import { useNavigate } from "react-router-dom";

export const Categories = () => {
  console.log("COMPONENT => categories.jsx");
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  // * STATI
  const [Show, SetShow] = useState(false);
  const [Categories, SetCategories] = useState(null);
  const Navigate = useNavigate();
  // * FUNZIONI
  useEffect(() => {
    GetCategories()
      .then((data) => SetCategories(data))
      .catch((err) => console.log(err));
  }, [LoggedUser]);
  if (!Categories)
    return (
      <Container>
        <Row>
          <CardLoader />
        </Row>
      </Container>
    );
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <Card.Title>Le mie categorie</Card.Title>
      </Card.Header>
      <Card.Body>
        {Categories.map((category, index) => (
          <SingleCategory
            key={category._id}
            category={category}
            index={index}
            type="mini"
          />
        ))}
      </Card.Body>
      <Card.Footer>
        <Button
          variant={Theme === "dark" ? "outline-light" : "dark"}
          onClick={() => SetShow(true)}
          size="sm"
        >
          Aggiungi categoria
        </Button>
        <Button
          variant={Theme === "dark" ? "outline-light" : "dark"}
          onClick={() => Navigate("/categories")}
          size="sm"
        >
          Visualizza tutte
        </Button>
      </Card.Footer>
      <NewModal Show={Show} SetShow={SetShow} tipo="category" />
    </Card>
  );
};
