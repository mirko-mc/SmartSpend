import { Row, Col, Card, Button, Container } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetCategories } from "../../data/fetch";
import { NewModal } from "../modals/NewModal";
import { SingleCategory } from "./SingleCategory";
import { CardLoader } from "../loader/CardLoader";

export const Categories = () => {
  console.log("COMPONENT => categories.jsx");
  // * CONTEXT
  const { LoggedUser } = useContext(UserContext);
  // * STATI
  const [Show, SetShow] = useState(false);
  const [Categories, SetCategories] = useState(null);
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
        <Button variant="primary" onClick={() => SetShow(true)}>
          Aggiungi categoria
        </Button>
      </Card.Header>
      <Card.Body>
        {Categories.map((category) => (
          <SingleCategory key={category._id} category={category} />
        ))}
      </Card.Body>
      <NewModal Show={Show} SetShow={SetShow} tipo="category" />
    </Card>
  );
};
