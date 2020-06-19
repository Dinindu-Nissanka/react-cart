import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Order from "../components/Order";
import OrdersList from "../components/OrdersList";
import { getOrders } from "../reducers/orders";

const OrdersContainer = ({ orders }) => (
  <OrdersList title="Orders">
    {(orders &&
      orders.length &&
      orders.map((order) => <Order key={order.id} order={order} />)) ||
      []}
  </OrdersList>
);

OrdersContainer.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          inventory: PropTypes.number.isRequired,
        })
      ),
    })
  ),
};

const mapStateToProps = (state) => ({
  orders: getOrders(state.orders),
});

export default connect(mapStateToProps)(OrdersContainer);
