import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
} from "../constants/ActionTypes";

const initialState = {
  addedIds: [],
  quantityById: {},
};

const productList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.addedIds.indexOf(action.productId) !== -1) {
        const newState = state;
        newState.quantityById[action.productId] =
          newState.quantityById[action.productId] + 1;
        return newState;
      }
      const newState = state;
      newState.addedIds.push(action.productId);
      newState.quantityById[action.productId] = 1;
      return newState;
    case REMOVE_FROM_CART:
      if (state.quantityById[action.productId] === 1) {
        const removedState = state;
        removedState.addedIds = removedState.addedIds.filter(
          (item) => item !== action.productId
        );
        delete removedState.quantityById[action.productId];
      }
      const removedState = state;
      removedState.quantityById[action.productId] =
        removedState.quantityById[action.productId] - 1;
      return removedState;
    default:
      return state;
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;

export const getAddedIds = (state) => state.addedIds;

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      console.log(action);
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      return productList(state, action);
  }
};

export default cart;
