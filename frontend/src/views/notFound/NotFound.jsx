import { useContext } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";

export const NotFound = () => {
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  return (
    <Container>
      <Row>
        <Col
          xs={12}
          className="d-flex justify-content-center align-items-center"
        >
          <Image
            src={
              Theme === "dark"
                ? "https://img.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg"
                : "https://img.freepik.com/free-vector/glitch-error-404-page-background_23-2148090410.jpg"
            }
          />
        </Col>
      </Row>
    </Container>
  );
};
