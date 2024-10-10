import {
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetCategories } from "../../data/fetch";
import { CardLoader } from "../../components/loader/CardLoader";
import { SingleCategory } from "../../components/categories/SingleCategory";

export const AllCategories = () => {
  console.log("VIEW => AllCategories.jsx");
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  // * STATI
  const [Categories, SetCategories] = useState(null);
  const CategoryId = useParams();
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser) {
      GetCategories()
        .then((data) => SetCategories(data))
        .catch((err) => console.log(err));
    }
  }, [LoggedUser]);
  if (!Categories) return <CardLoader />;

  if (CategoryId?.categoryId) return <Outlet />;

  if (Categories)
    return (
      <Container data-bs-theme={Theme} bg={Theme}>
        <Row>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title>Elenco categorie</Card.Title>
              </Card.Header>
              <Card.Body>
                {Categories.map((category) => (
                  <SingleCategory
                    key={category._id}
                    category={category}
                    type="mini"
                  />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
