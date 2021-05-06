import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://reactnative-shop-app-20323-default-rtdb.firebaseio.com/products.json"
      );
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts:loadedProducts.filter(item=>item.ownerId===userId)
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState)=> {
    const token = getState().auth.token;
    const response = await fetch(
      `https://reactnative-shop-app-20323-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw Error("Something went wrong!");
    }
    dispatch({
      type: DELETE_PRODUCT,
      prodId: productId
    });
  }
}

export const addProduct = (title, description, price, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(`https://reactnative-shop-app-20323-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId:userId
      })
    });

    const resData = await response.json();

    if (!response.ok) {
      console.log(response);
      throw Error("Something went wrong!");
    }

    dispatch({
      type: ADD_PRODUCT,
      productData: {
        id:resData.name,
        title,
        description,
        price,
        imageUrl,
        ownerId:userId
      }
    });
  }
}

export const updateProduct = (id,title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://reactnative-shop-app-20323-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });

    if (!response.ok) {
      throw Error('Something went wrong!');
    }

    
  }
};

