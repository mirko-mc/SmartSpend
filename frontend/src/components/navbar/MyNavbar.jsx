import { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "../../context/UserContextProvider";
import { PutUser } from "../../data/fetch";
import { Toggle } from "../utils/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export const MyNavbar = () => {
  console.log("COMPONENT => MyNavbar.jsx");
  // * CONTEXT
  const { LoggedUser, Logout, Theme, SetIsPrivacy, IsPrivacy, ThemeClassName } =
    useContext(UserContext);
  // * STATI
  // * FUNZIONI
  const HandleSaveTheme = () => {
    PutUser(LoggedUser._id, { favoriteTheme: Theme })
      .then(() => alert("Dati modificati correttamente!"))
      .catch((err) => console.log(err));
  };
  return (
    <Navbar className={`shadow ${ThemeClassName(Theme)}`} sticky="top" data-bs-theme={Theme}>
      <Container>
        <Row className="justify-content-between w-100">
          <Col xs="auto" md={4}>
            <Toggle
              favoriteTheme={LoggedUser?.favoriteTheme}
              HandleSaveTheme={HandleSaveTheme}
            />
            <Button
              variant={Theme}
              className="float-end"
              onClick={() => SetIsPrivacy(!IsPrivacy)}
              size="sm"
            >
              {IsPrivacy ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </Button>
            {/* <Navbar.Toggle aria-controls="myNavbar" /> */}
            {LoggedUser && (
              // <Navbar.Collapse id="myNavbar">
              <Nav className="me-auto my-2 my-lg-0 navbar-nav-scroll">
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
                  {/* <NavDropdown
                    title="Le mie liste"
                    id="navbarScrollingDropdown"
                    align="end"
                  > */}

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
                  {/* </NavDropdown> */}

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              // </Navbar.Collapse>
            )}
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
