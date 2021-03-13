import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Cart from "./components/cart";
import ProductList from "./components/ProductList";
import Default from "./components/Default";
import Details from "./components/Details";
import Login from "./components/login/LoginPage";
import { Switch, Route } from "react-router-dom";
import Modal from "./components/Modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentPage } from "./components/payment/PaymentPage";
import { PaymentComplete } from "./components/payment/PaymentComplete";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/success" component={PaymentComplete} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/pay" component={PaymentPage} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </Elements>
  );
}

export default App;
