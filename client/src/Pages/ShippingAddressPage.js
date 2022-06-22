import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressPage = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (event) => {
    event.preventDefault();
    contextDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        country,
        postalCode,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        country,
        postalCode,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <h1>Shipping Details</h1>
      <CheckoutSteps step1 step2 />
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></Form.Control>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <div className="pt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ShippingAddressPage;
