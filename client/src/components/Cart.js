import React, { useContext } from "react";

import { Store } from "../store";

const Cart = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <div>
      Cart <span className="fa-solid fa-cart-shopping"></span>
      {cart.cartItems.length > 0 &&
        cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
      {/* <Button onClick={() => navigate("/cart")}>Go to Cart</Button> */}
    </div>
  );
};

export default Cart;
