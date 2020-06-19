import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import "./styles/Cart.scss";

const Cart = ({ products, total, onCheckoutClicked, onRemoveClicked }) => {
  const hasProducts = products.length > 0;
  const nodes = hasProducts ? (
    products.map((product) => (
      <div className="card" key={product.id}>
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Price - {product.price}
          </h6>
          <p className="card-text">Quantity - {product.quantity}</p>
          <a
            href="#"
            className="btn btn-primary"
            onClick={() => onRemoveClicked(product.id)}
          >
            Remove
          </a>
        </div>
      </div>
    ))
  ) : (
    <em>Please add some products to cart.</em>
  );

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button
        onClick={onCheckoutClicked}
        disabled={hasProducts ? "" : "disabled"}
      >
        Checkout
      </button>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func,
};

export default Cart;
