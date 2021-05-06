import Order from "../../models/order";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

const initialState = {
  orders:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders
      }
    case ADD_ORDER:
      let updatedOrders = [...state.orders];
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.cartItems,
        action.orderData.totalAmount,
        action.orderData.date
      );
      updatedOrders = updatedOrders.concat(newOrder);
      return {
        ...state, orders:updatedOrders
      }
    default:
      return state;
  }
};