import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { CardLoader } from "../loader/CardLoader";
import { GetCategory } from "../../data/fetch";
import { SingleCategory } from "./SingleCategory";

export const CategoryDetails = () => {
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  // * STATI
  const CategoryId = useParams().categoryId;
  const [Category, SetCategory] = useState(null);
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
      <Container className="pt-xs-2 pt-md-3 pt-lg-5">
        <Row>
          <Col xs={1} className="mb-3"></Col>
          <Col xs={10} className="mb-3">
            <SingleCategory category={Category} type="full" />
          </Col>
        </Row>
      </Container>
    );
};
