import React, { useReducer, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Image, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Store } from "../store";
import axios from "axios";

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
      <h1>ProductPage</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <h2>Name: {product.name} </h2>
          <Image src={product.image} />
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
      )}
      <Button onClick={() => addToCart()}>ADD TO CART</Button>
    </div>
  );
};

export default ProductPage;
