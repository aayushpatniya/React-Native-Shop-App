import { ADD_TO_CART, DELETE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, actions) => {
  let newCartItem;
  // console.log('actions',actions);
  switch(actions.type){
    case ADD_TO_CART:
      const addedProduct = actions.product;
      const prodTitle = addedProduct.title;
      const prodPrice = addedProduct.price;
      if (state.items[addedProduct.id]) {
        const existingCartItem = state.items[addedProduct.id];
        newCartItem = new CartItem(existingCartItem.quantity + 1, prodPrice, prodTitle, existingCartItem.sum + prodPrice);
      } else {
        newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      const updatedState = {
        ...state,
        items: { ...state.items, [addedProduct.id]: newCartItem },
        totalAmount: state.totalAmount + prodPrice
      };
      // console.log("updated state", updatedState);
      return updatedState;
    case DELETE_FROM_CART:
      const product = state.items[actions.productId];
      const productQuantity = product.quantity;
      let updatedCartItems={};
      if (productQuantity > 1) {
        const updatedItem = new CartItem(
          productQuantity - 1,
          product.productPrice,
          product.productTitle,
          product.sum - product.productPrice
        );
        updatedCartItems = { ...state.items, [actions.productId]: updatedItem };
      }
      else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[actions.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - product.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[actions.prodId]) {
        return state
      }
      const updatedItems = { ...state.items };
      const itemTotal = updatedItems[actions.prodId].sum;
      delete updatedItems[actions.prodId]
      return {
        ...state,
        items: updatedItems,
        totalAmount:state.totalAmount-itemTotal
      }
    default:
      return state;
  }
  return state;
};