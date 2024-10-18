import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetCategories } from "../../data/fetch";
import { CardLoader } from "../../components/loader/CardLoader";
import { SingleCategory } from "../../components/categories/SingleCategory";
import { MyAlert } from "../../components/utils/MyAlert";
import { AlertContext } from "../../context/AlertContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { NewModal } from "../../components/modals/NewModal";

export const AllCategories = () => {
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const [Categories, SetCategories] = useState(null);
  const CategoryId = useParams().categoryId;
  const [Show, SetShow] = useState(false);
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser && !Show) {
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
          }, 3 * 1000);
        });
    }
  }, [LoggedUser, Show]);

  if (!Categories) return <CardLoader />;
  if (CategoryId) return <Outlet />;

  if (Categories)
    return (
      <Container className="pt-4">
        <Row>
          <h1 className="text-center mb-3">Categorie</h1>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title>Elenco categorie</Card.Title>
                <Button variant={Theme === "light" ? "outline-primary" : "outline-secondary"} size="sm" onClick={() => SetShow(true)}>
                  <span className="d-none d-md-inline">
                    Nuova categoria &nbsp;
                  </span>
                  <FontAwesomeIcon
                    icon={faAdd}
                    size="xl"
                    onClick={() => SetShow(true)}
                  />
                </Button>
              </Card.Header>
              <Card.Body>
                {ShowAlert?.Type === "getCategories" && <MyAlert />}
                {!Categories[0]?.name ? (
                  <Card.Text className="text-center">
                    Non esistono categorie.
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
                <NewModal Show={Show} SetShow={SetShow} tipo="category" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
