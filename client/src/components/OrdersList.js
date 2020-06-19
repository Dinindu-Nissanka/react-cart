import React from "react";
import PropTypes from "prop-types";

const OrdersList = ({ title, children }) => (
  <div>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

OrdersList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default OrdersList;
