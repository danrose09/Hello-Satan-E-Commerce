import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import { Row, Col, Button, ListGroup, Image, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCart = async (item, quantity) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${item._id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry this item is out of stock.");
      return;
    }
    contextDispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };

  const removeItem = async (item) => {
    contextDispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const checkout = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Cart</h1>
      <Row>
        {cartItems === 0 ? (
          <h2>Your Cart is Empty</h2>
        ) : (
          <div>
            <ListGroup>
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item id={item._id}>
                    <Row>
                      <Col>
                        <Image src={item.image} />
                        {item.name}
                        {item.price}
                        <Link to={`/product/${item.slug}`}></Link>
                      </Col>
                      <Col>
                        <Button
                          disabled={item.quantity === 1}
                          onClick={() => updateCart(item, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>{" "}
                        <Button
                          disabled={item.quantity === item.countInStock}
                          onClick={() => updateCart(item, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button onClick={() => removeItem(item)}>
                          Remove From Cart
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <Col>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>
                        Subtotal (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)} {""}{" "}
                        items) : $
                        {cartItems.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        )}
                      </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          type="button"
                          variant="primary"
                          disabled={cartItems.length === 0}
                          onClick={() => checkout()}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </div>
        )}
      </Row>
    </div>
  );
};

export default CartPage;
