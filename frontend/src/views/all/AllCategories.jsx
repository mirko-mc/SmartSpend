import { Card, Col, Container, Row } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetCategories } from "../../data/fetch";
import { CardLoader } from "../../components/loader/CardLoader";
import { SingleCategory } from "../../components/categories/SingleCategory";

export const AllCategories = () => {
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  // * STATI
  const [Categories, SetCategories] = useState(null);
  const CategoryId = useParams().categoryId;
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser) {
      GetCategories()
        .then((data) => SetCategories(data))
        .catch((err) => console.log(err));
    }
  }, [LoggedUser]);
  if (!Categories) return <CardLoader />;

  if (CategoryId) return <Outlet />;

  if (Categories)
    return (
      <Container className="pt-xs-2 pt-md-3 pt-lg-5">
        <Row>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title>Elenco categorie</Card.Title>
              </Card.Header>
              <Card.Body>
                {Categories.map((category, index) => (
                  <SingleCategory
                    key={category._id}
                    category={category}
                    type="mini"
                    index={index}
                  />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
