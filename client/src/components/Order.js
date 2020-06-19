import React from "react";
import PropTypes from "prop-types";
import "./styles/Order.scss";

const Order = ({ order }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Order Id - {order.id}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{order.status}</h6>
      {order.products &&
        order.products.length &&
        order.products.map((product) => {
          return (
            <p className="card-text">
              {product.title} - {product.quantity} x ${product.price}
            </p>
          );
        })}
    </div>
  </div>
);

Order.propTypes = {
  order: PropTypes.shape().isRequired,
};

export default Order;
