import React, { useEffect, useReducer } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };
    fetchProducts();
  }, []);

  const productList = products.map((product) => {
    return <Product {...product} key={product.id} />;
  });

  return (
    <div>
      HomePage
      {loading ? (
        <Spinner animation="border"></Spinner>
      ) : error ? (
        <div>{error}</div>
      ) : (
        productList
      )}
    </div>
  );
};

export default HomePage;
