import { Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";

export const LoginGoogle = () => {
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  return (
    <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
      <h6>Accedi più velocemente con Google</h6>
      <a href={`${process.env.REACT_APP_API_URL}/api/v1/auth/login-google`}>
        <Button
          className="d-flex align-items-center justify-content-center mt-3"
          variant={Theme}
          type="submit"
        >
          <FontAwesomeIcon icon={faGoogle} />
          &nbsp; Google
        </Button>
      </a>
    </Col>
  );
};
