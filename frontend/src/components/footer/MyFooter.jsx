import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

export const MyFooter = () => {
  console.log("COMPONENTS => Footer.jsx");
  // * CONTEXT
  const { Theme, ThemeClassName } = useContext(UserContext);
  console.log(Theme);
  // todo sistemare tema ed aggiungere loader
  if (Theme)
    return (
      <footer
        className={`footer mt-auto py-3 ${ThemeClassName(Theme)}`}
        data-bs-theme={Theme}
      >
        <Container className="mb-3 text-center">
          <Row>
            <Col>
              <Link
                to="https://github.com/mirko-mc"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </Link>
              &nbsp;
              <Link
                to="https://www.linkedin.com/in/mirko-campetiello-29b893309/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </Link>
              &nbsp;
              <Link
                to="https://t.me/mirko88mc"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faTelegram} size="2x" />
              </Link>
              <p className="text-muted">
                <FontAwesomeIcon icon={faCopyright} /> 2024 Mirko Campetiello
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
};
