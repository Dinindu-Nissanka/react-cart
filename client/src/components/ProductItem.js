import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";

const ProductItem = ({ product, onAddToCartClicked }) => (
  <div className="card">
    <Product
      title={product.title}
      price={product.price}
      quantity={product.inventory}
    />

    <a
      href="#"
      className="btn btn-primary"
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? "" : "disabled"}
    >
      {product.inventory > 0 ? "Add to cart" : "Sold Out"}
    </a>
  </div>
);

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired,
};

export default ProductItem;
