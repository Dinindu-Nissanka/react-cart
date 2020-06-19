import React from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import OrdersContainer from "./OrdersContainer";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ShoppingCart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/">
                Products
              </Link>
              <Link className="nav-item nav-link" to="/cart">
                Cart
              </Link>
              <Link className="nav-item nav-link" to="/order">
                Orders
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <br />
        <Route exact path="/" component={ProductsContainer} />
        <Route exact path="/cart" component={CartContainer} />
        <Route exact path="/order" component={OrdersContainer} />
      </div>
    </div>
  </Router>
);

export default App;
