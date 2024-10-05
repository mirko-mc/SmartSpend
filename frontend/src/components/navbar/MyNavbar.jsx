import { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "../../context/UserContextProvider";
import { PutUser } from "../../data/fetch";

export const MyNavbar = () => {
  console.log("COMPONENT => MyNavbar.jsx");
  // * CONTEXT
  const { LoggedUser, Logout, Theme, SetTheme } = useContext(UserContext);
  // * STATI
  // * FUNZIONI
  const HandleSaveTheme = () => {
    PutUser(LoggedUser._id, { favoriteTheme: Theme })
      .then(() => alert("Dati modificati correttamente!"))
      .catch((err) => console.log(err));
  };
    return (
      <Navbar
        bg={Theme}
        expand="lg"
        className="mb-3 shadow"
        sticky="top"
        collapseOnSelect
        data-bs-theme={Theme}
      >
        <Container>
          <Row className="justify-content-between w-100">
            <Col xs="auto" md={4}>
              <Navbar.Toggle aria-controls="myNavbar" />
              <Navbar.Collapse id="myNavbar">
                <Nav className="me-auto my-2 my-lg-0 navbar-nav-scroll">
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
                      id="navbarScrollingDropdown"
                      align="end"
                      menuVariant={Theme}
                    >
                      <NavDropdown.Item href="/me">Profilo</NavDropdown.Item>
                      <NavDropdown
                        title="Aggiungi"
                        id="navbarScrollingDropdown"
                        align="end"
                      >
                        <NavDropdown.Item href="/categories/new">
                          Categoria
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/paymentMethods/new">
                          Metodo di pagamento
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/transactions/new">
                          Transazione
                        </NavDropdown.Item>
                      </NavDropdown>

                      <NavDropdown.Divider />

                      <NavDropdown.Item
                        variant={Theme}
                        onClick={() =>
                          SetTheme(Theme === "light" ? "dark" : "light")
                        }
                        className="mb-2"
                      >
                        {Theme === "light" ? "Tema scuro" : "Tema chiaro"}
                        <span className="float-end" onClick={HandleSaveTheme}>
                          {Theme !== LoggedUser.favoriteTheme && "🔒"}
                        </span>
                      </NavDropdown.Item>

                      <NavDropdown.Divider />

                      <NavDropdown.Item onClick={Logout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Col>
            <Col xs="auto" md={4} className="d-flex justify-content-end p-0">
              <Navbar.Brand href="/" className="d-flex align-items-center m-0">
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
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
};
