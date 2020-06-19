import { combineReducers } from "redux";
import { RECEIVE_ORDERS } from "../constants/ActionTypes";

const list = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ORDERS:
      return action.orders.map((order) => order);
    default:
      return state;
  }
};

export default combineReducers({
  list,
});

export const getOrders = (state) => state.list;
