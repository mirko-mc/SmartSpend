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
  // * CONTEXT
  const { Theme, ThemeClassName } = useContext(UserContext);
  // todo sistemare tema ed aggiungere loader
  if (Theme)
    return (
      <footer className={ThemeClassName()} data-bs-theme={Theme}>
        <Container className="mb-3 text-center d-flex flex-column align-items-center justify-content-center h-100">
          <Row>
            <Col>
              <Link
                to="https://github.com/mirko-mc/SmartSpend"
                target="_blank"
                rel="noreferrer"
                className={ThemeClassName()}
              >
                <FontAwesomeIcon icon={faGithub} size="2x" className="mx-2" />
              </Link>
              &nbsp;
              <Link
                to="https://www.linkedin.com/in/mirko-campetiello-29b893309/"
                target="_blank"
                rel="noreferrer"
                className={ThemeClassName()}
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" className="mx-2" />
              </Link>
              &nbsp;
              <Link
                to="https://t.me/mirko88mc"
                target="_blank"
                rel="noreferrer"
                className={ThemeClassName()}
              >
                <FontAwesomeIcon icon={faTelegram} size="2x" className="mx-2" />
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-muted p-0 m-0">
                <FontAwesomeIcon icon={faCopyright} /> SmartSpend - 2024 - Mirko
                Campetiello
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
};
