import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import SignInPage from "./Pages/SignInPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShippingAddressPage from "./Pages/ShippingAddressPage";
import SignUpPage from "./Pages/SignUpPage";
import SelectPaymentMethodPage from "./Pages/SelectPaymentMethodPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage";
import OrderPage from "./Pages/OrderPage";
import OrderHistoryPage from "./Pages/OrderHistoryPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/shop" element={<ShopPage />}></Route>
        <Route path="/product/:slug" element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/shipping" element={<ShippingAddressPage />}></Route>
        <Route path="/payment" element={<SelectPaymentMethodPage />}></Route>
        <Route path="/placeorder" element={<PlaceOrderPage />}></Route>
        <Route path="/order/:id" element={<OrderPage />}></Route>
        <Route path="/orders/history" element={<OrderHistoryPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
