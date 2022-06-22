import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Image,
  Container,
} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../store";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(cart.itemsPrice * 0.15);
  cart.totalPrice = round2(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  );

  const placeOrderHandler = async () => {};

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, navigate]);

  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Place Order</h1>
      <Row>
        <Col md={8}>
          <Row>
            <Col>
              <Card className="text-left">
                <Card.Body className="mb-3">
                  <Card.Title>Shipping</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {cart.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                    {cart.shippingAddress.city},
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </Card.Text>
                  <Link to="/shipping">Edit</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body className="mb-3">
                  <Card.Title>Payment</Card.Title>
                  <Card.Text>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </Card.Text>
                  <Link to="/payment">Edit</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body className="mb-3">
                  <Card.Title>Items</Card.Title>
                  <ListGroup variant="flush"></ListGroup>
                  {cart.cartItems.map((item) => {
                    return (
                      <ListGroup.Item style={{ border: "0" }} key={item._id}>
                        <Row>
                          <Col md={6}>
                            <Image
                              thumbnail
                              src={item.image}
                              alt={item.name}
                              style={{ maxHeight: "15vh" }}
                            ></Image>
                          </Col>
                          <Col md={3}>
                            Item:{" "}
                            <Link to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={3}>Quantity: {item.quantity}</Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}

                  <Link to="/cart">Edit</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Items: {cart.itemsPrice.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>Shipping: {cart.shippingPrice}</ListGroup.Item>
                <ListGroup.Item>Tax: {cart.taxPrice}</ListGroup.Item>
                <ListGroup.Item>Order Total: {cart.totalPrice}</ListGroup.Item>
              </ListGroup>
              <Button type="submit" onClick={placeOrderHandler}>
                Place Order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
