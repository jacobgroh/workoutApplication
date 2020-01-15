import { combineReducers } from "redux";

const cartReducer = (cart = [], action) => {
  if (action.type === "ADD_TO_CART") {
    return [...cart, { id: action.payload.id, title: action.payload.title }];
  }

  return cart;
};

export default combineReducers({
  cart: cartReducer
});
