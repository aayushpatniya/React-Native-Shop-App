import { ToastAndroid } from 'react-native';

import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts
      }
    case DELETE_PRODUCT:
      const productId = action.prodId;
      return {
        ...state,
        userProducts: state.userProducts.filter(p => p.id !== productId),
        availableProducts:state.availableProducts.filter(p => p.id !== productId)
      }
    case ADD_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      let updatedAvailableProducts = state.availableProducts.concat(newProduct);
      let updatedUserProducts = state.userProducts.concat(
        newProduct
      );
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts:updatedUserProducts,
      }
    
    case UPDATE_PRODUCT:
      let productIndex = state.userProducts.findIndex(item => item.id === action.pid);
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      productIndex = state.availableProducts.findIndex(
        (item) => item.id === action.pid
      );
      updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[productIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts:updatedUserProducts,
      }
  }
  return state;
};