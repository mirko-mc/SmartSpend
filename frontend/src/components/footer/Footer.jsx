import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconGitHub, IconLinkedIn, IconTelegram } from "../../assets/svg";
export const Footer = () => {
  console.log("COMPONENTS => Footer.jsx");
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container className="mb-3 text-center">
        <Link to="https://github.com/mirko-mc" target="_blank" rel="noreferrer">
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
