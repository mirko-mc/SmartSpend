import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconGitHub, IconLinkedIn, IconTelegram } from "../../assets/svg";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
export const Footer = () => {
  console.log("COMPONENTS => Footer.jsx");
  // * CONTEXT
  const { Theme } = useContext(UserContext);
  console.log(Theme)
  // todo sistemare tema ed aggiungere loader
  if (Theme)
    return (
      <footer className="footer mt-auto py-3">
        <Container className="mb-3 text-center" data-bs-theme={Theme}>
          <Link
            to="https://github.com/mirko-mc"
            target="_blank"
            rel="noreferrer"
          >
            <IconGitHub />
          </Link>
          <Link
            to="https://www.linkedin.com/in/mirko-campetiello-29b893309/"
            target="_blank"
            rel="noreferrer"
          >
            <IconLinkedIn />
          </Link>
          <Link to="https://t.me/mirko88mc" target="_blank" rel="noreferrer">
            <IconTelegram />
          </Link>
          <p className="text-muted">
            Copyright <i className="bi bi-c-circle"></i> 2024 Mirko Campetiello
          </p>
        </Container>
      </footer>
    );
};
