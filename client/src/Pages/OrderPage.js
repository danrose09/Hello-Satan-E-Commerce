import React, { useReducer, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../store";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, order: action.payload, loading: false, error: "" };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const OrderPage = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/${orderId}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "REQUEST_FAILURE", payload: error });
      }
    };
    if (!userInfo) {
      navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [navigate, userInfo, order._id, orderId]);

  return loading ? <Spinner></Spinner> : error ? alert(error) : <div></div>;
};

export default OrderPage;
