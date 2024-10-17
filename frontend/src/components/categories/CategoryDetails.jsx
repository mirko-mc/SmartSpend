import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { CardLoader } from "../loader/CardLoader";
import { GetCategory } from "../../data/fetch";
import { SingleCategory } from "./SingleCategory";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../utils/MyAlert";

export const CategoryDetails = () => {
  // * CONTEXT
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const CategoryId = useParams().categoryId;
  const [Category, SetCategory] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    CategoryId &&
      GetCategory(CategoryId)
        .then((data) => SetCategory(data))
        .catch((err) => {
          SetAlertFormValue(
            "getCategory",
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
  }, [CategoryId]);
  if (!Category) return <CardLoader />;
  if (Category)
    return (
      <Container className="pt-xs-2 pt-md-3 pt-lg-5">
        <Row>
          <Col xs={1} className="mb-3"></Col>
          <Col xs={10} className="mb-3">
            {ShowAlert?.Type === "getCategories" ? (
              <MyAlert />
            ) : (
              <SingleCategory category={Category} type="full" />
            )}
          </Col>
        </Row>
      </Container>
    );
};
