import React, { useContext } from "react";
import { Row, Col, Image, Button, Card } from "react-bootstrap";
import { Store } from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const navigate = useNavigate();
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
    <div className="mt-3 mb-3">
      <Card
        className="product__card"
        onClick={() => navigate(`/product/${props.slug}`)}
        border="light"
      >
        <Card.Body>
          <Card.Img src={props.image}></Card.Img>
          <Card.Text>
            <p>{props.name}</p>
            <strong>
              <p>${props.price}</p>
            </strong>
          </Card.Text>
          <Col>
            {props.countInStock === 0 ? (
              <Button variant="light" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button onClick={() => addToCart(props)}>ADD TO CART</Button>
            )}
          </Col>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
