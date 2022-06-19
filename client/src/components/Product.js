import React, { useContext } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Store } from "../store";
import axios from "axios";

const Product = (props) => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCart = async (item) => {
    const existItem = cartItems.find((p) => p._id === props._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${props._id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry this item is out of stock.");
      return;
    }
    contextDispatch({
      type: "ADD_TO_CART",
      payload: { ...props, quantity },
    });
  };

  return (
    <div>
      <Row>
        <Col>
          <Image src={props.image} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>{props.name}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>{props.price}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>{props.description}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {props.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of Stock
            </Button>
          ) : (
            <Button onClick={() => addToCart(props)}>ADD TO CART</Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Product;
