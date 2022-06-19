import React, { useContext } from "react";
import Cart from "./Cart";
import { Store } from "../store";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    contextDispatch({ type: "SIGN_OUT" });
    localStorage.removeItem("userInfo");
  };
  return (
    <header className="sticky-top">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">HELLO SATAN</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown"> */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  {" "}
                  <NavDropdown.Item href="#action/3.1">
                    User Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Order History
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={signoutHandler}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/signin" style={{ textDecoration: "none" }}>
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Cart />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
