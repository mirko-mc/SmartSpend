import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { CardLoader } from "../loader/CardLoader";
import { GetCategory } from "../../data/fetch";
import { SingleCategory } from "./SingleCategory";

export const CategoryDetails = () => {
  console.log("COMPONENT => CategoryDetails.jsx");
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  // * STATI
  const CategoryId = useParams().categoryId;
  const [Category, SetCategory] = useState(null);
  console.log(CategoryId);
  // * FUNZIONI
  useEffect(() => {
    CategoryId &&
      GetCategory(CategoryId)
        .then((data) => SetCategory(data))
        .catch((err) => console.log(err));
  }, [CategoryId]);
  if (!Category) return <CardLoader />;
  if (Category)
    return (
      <Container data-bs-theme={Theme} bg={Theme}>
        <Row>
          <Col xs={1} className="mb-3"></Col>
          <Col xs={10} className="mb-3">
            <SingleCategory transaction={Category} type="full" />
          </Col>
        </Row>
      </Container>
    );
};