import axios from "axios";
import shop from "../api/shop";
import * as types from "../constants/ActionTypes";

const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

export const getAllProducts = () => (dispatch) => {
  axios.get("http://localhost:8080/api/products").then((res) => {
    console.log(res.data);
    dispatch(receiveProducts(res.data));
  });
};

const addToCartUnsafe = (productId) => ({
  type: types.ADD_TO_CART,
  productId,
});

export const addToCart = (productId) => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

const removeFromCartUnsafe = (productId) => ({
  type: types.REMOVE_FROM_CART,
  productId,
});

export const removeFromCart = (productId) => (dispatch, getState) => {
  console.log("Hi");
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(removeFromCartUnsafe(productId));
  }
};

export const checkout = (products) => (dispatch, getState) => {
  const { cart } = getState();

  dispatch({
    type: types.CHECKOUT_REQUEST,
  });
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart,
    });
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  });
};
