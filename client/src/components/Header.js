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
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("cartItems");
  };
  return (
    <header className="sticky-top">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">HELLO SATAN</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/cart">
                <Cart />
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  {" "}
                  <NavDropdown.Item href="/profile">
                    User Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/orders/history">
                    Order History
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/signin" onClick={signoutHandler}>
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
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
