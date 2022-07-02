import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SearchPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "all";
  const page = searchParams.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAILURE", payload: error });
      }
    };
    fetchData();
  }, [category, page, query, price, order, rating, error]);

  return <div>SearchPage</div>;
};

export default SearchPage;
