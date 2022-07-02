import React, { useReducer, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Spinner,
  Image,
  Button,
  Col,
  Row,
  Card,
  Container,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Store } from "../store";
import axios from "axios";
import CardHeader from "react-bootstrap/esm/CardHeader";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:5000/api/products/slug/${slug}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };
    fetchProduct();
  }, [slug]);

  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart } = state;
  const addToCart = async () => {
    const existItem = cart.cartItems.find((p) => p._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${product._id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry this item is out of stock.");
      return;
    }
    contextDispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  console.log(cart.cartItems);

  return (
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <Container>
            <Row>
              <Col className="mt-5" md={8}>
                <Image src={product.image} />
              </Col>
              <Col className="mt-5" md={4}>
                <Card>
                  <Card.Title className="px-3">{product.name}</Card.Title>
                  <Card.Body>
                    <Card.Text>
                      <p>{product.description}</p>
                      <strong>
                        <p>{product.price}</p>
                      </strong>
                    </Card.Text>
                    <Button onClick={() => addToCart()}>ADD TO CART</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
