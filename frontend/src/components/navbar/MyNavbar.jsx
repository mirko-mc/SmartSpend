import { useContext } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "../../context/UserContextProvider";
import { PutUser } from "../../data/fetch";
import { Toggle } from "../utils/Toggle";
import { Link } from "react-router-dom";

export const MyNavbar = () => {
  // * CONTEXT
  const { LoggedUser, Logout, Theme, ThemeClassName } = useContext(UserContext);
  // * STATI
  // * FUNZIONI
  const HandleSaveTheme = () => {
    PutUser(LoggedUser._id, { favoriteTheme: Theme })
      .then(() => alert("Dati modificati correttamente!"))
      .catch((err) => console.log(err));
  };
  return (
    <header sticky="top">
      <Navbar
        className={`shadow ${ThemeClassName()} h-100`}
        data-bs-theme={Theme}
      >
        <Container>
          <Row className="justify-content-between w-100">
            <Nav className="me-auto my-2 my-lg-0 justify-content-between align-items-center navbar-nav-scroll">
              <Container className="d-flex align-items-center">
                {LoggedUser && (
                  <NavDropdown
                    title={
                      <span>
                        <Image
                          src={LoggedUser.avatar}
                          width="30"
                          height="30"
                          className="d-inline-block align-middle"
                          alt="avatar"
                          roundedCircle
                        />
                        <span className="d-none d-md-inline ms-2">
                          Ciao {LoggedUser.name}
                        </span>
                      </span>
                    }
                    align="start"
                    menuVariant={Theme}
                  >
                    <NavDropdown.Item href="/me">Profilo</NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item href="/categories">
                      Categorie
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/paymentMethods">
                      Metodi di pagamento
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/transactions">
                      Movimenti
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                )}
                <Toggle
                  favoriteTheme={LoggedUser?.favoriteTheme}
                  HandleSaveTheme={HandleSaveTheme}
                />
              </Container>
              <Navbar.Brand
                as={Link}
                to={"/dashboard"}
                className="d-flex align-items-center m-0"
              >
                <span className="d-none d-md-inline me-2">SmartSpend</span>
                <Image
                  src="https://static4.depositphotos.com/1006994/298/v/950/depositphotos_2983099-stock-illustration-grunge-design.jpg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="logo"
                  roundedCircle
                />
              </Navbar.Brand>
            </Nav>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};
