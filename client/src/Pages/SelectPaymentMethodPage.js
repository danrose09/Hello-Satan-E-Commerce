import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../store";

const SelectPaymentMethodPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "PayPal"
  );

  console.log(paymentMethodName);
  useEffect(() => {
    if (!shippingAddress.fullName) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    contextDispatch({
      type: "SELECT_PAYMENT_METHOD",
      payload: paymentMethodName,
    });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <div>
      <Container>
        <CheckoutSteps step1 step2 step3 />
        <h1 className="my-3">Select Payment</h1>
        <Form onSubmit={submitHandler}>
          <Row>
            <Form.Check
              type="radio"
              id="PayPal"
              label="Paypal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            ></Form.Check>
          </Row>
          <Row>
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            ></Form.Check>
          </Row>
          <Button type="submit">Continue</Button>
        </Form>
      </Container>
    </div>
  );
};

export default SelectPaymentMethodPage;
