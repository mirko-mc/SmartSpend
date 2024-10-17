import { Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Link } from "react-router-dom";

export const LoginGoogle = () => {
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  return (
    <Col
      md={6}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <h6>Accedi più velocemente con Google</h6>
      <Link
        as={Button}
        to={`${process.env.REACT_APP_API_URL}/api/v1/auth/login-google`}
        className={`d-flex align-items-center justify-content-center mt-3 btn btn-${Theme}`}
        variant={Theme}
      >
        <FontAwesomeIcon icon={faGoogle} />
        &nbsp; Google
      </Link>
    </Col>
  );
};
