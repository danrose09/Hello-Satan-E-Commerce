import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Store } from "../store";

const Cart = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <div>
      <span className="fa-solid fa-cart-shopping"></span>
      {cart.cartItems.length > 0 &&
        cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
      <Button onClick={() => navigate("/cart")}>Go to Cart</Button>
    </div>
  );
};

export default Cart;
