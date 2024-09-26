import { Col, Image } from "react-bootstrap";

export const NotFound = () => {
  // "https://img.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg",
  return (
    <Col className="d-flex justify-content-center align-items-center">
      <Image
        src={
          "https://img.freepik.com/free-vector/glitch-error-404-page-background_23-2148090410.jpg"
        }
      />
    </Col>
  );
};
