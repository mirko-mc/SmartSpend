import { Button, Col } from "react-bootstrap";

export const LoginGoogle = () => {
  return (
    <Col md={6} className="d-flex align-items-center justify-content-center">
      <a href={`${process.env.REACT_APP_API_URL}/api/v1/auth/login-google`}>
        <Button
          className="d-flex align-items-center justify-content-center"
          variant="primary"
          type="submit"
        >
          Login con Google
        </Button>
      </a>
    </Col>
  );
};
