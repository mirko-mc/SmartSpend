import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";

export const MyNavbar = () => {
  console.log("COMPONENT => MyNavbar.jsx");
  // * CONTEXT
  const { SetToken } = useContext(UserContext);
  // * STATI
  const Navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Button
          variant="primary"
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            SetToken(null);
            Navigate("/");
          }}
        >
          Logout
        </Button>
        <Link to="/dashboard" className="m-2">
          dashboard
        </Link>
        <Link to="/me" className="m-2">
          me
        </Link>
        <Link to="/transactions" className="m-2">
          transactions
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};