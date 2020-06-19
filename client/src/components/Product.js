import React from "react";
import PropTypes from "prop-types";

const Product = ({ price, quantity, title }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Price - ${price}</h6>
      <p className="card-text">Quantity - {quantity}</p>
    </div>
  </div>
);

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
};

export default Product;
