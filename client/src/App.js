import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import CheckoutPage from "./Pages/CheckoutPage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import SignInPage from "./Pages/SignInPage";
import Header from "./components/Header";
import ShippingAddressPage from "./Pages/ShippingAddressPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/shop" element={<ShopPage />}></Route>
        <Route path="/product/:slug" element={<ProductPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/shipping" element={<ShippingAddressPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
