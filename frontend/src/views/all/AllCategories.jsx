import { Card, Col, Container, Row } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetCategories } from "../../data/fetch";
import { CardLoader } from "../../components/loader/CardLoader";
import { SingleCategory } from "../../components/categories/SingleCategory";
import { MyAlert } from "../../components/utils/MyAlert";
import { AlertContext } from "../../context/AlertContextProvider";

export const AllCategories = () => {
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const [Categories, SetCategories] = useState(null);
  const CategoryId = useParams().categoryId;
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser) {
      GetCategories()
        .then((data) => SetCategories(data))
        .catch((err) => {
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
    }
  }, [LoggedUser]);
  if (!Categories) return <CardLoader />;

  if (CategoryId) return <Outlet />;

  if (Categories)
    return (
      <Container className="pt-xs-2 pt-md-3 pt-lg-5">
        <Row>
          <h1 className="text-center mb-3">Categorie</h1>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title>Elenco categorie</Card.Title>
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
                      type="mini"
                      index={index}
                    />
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
