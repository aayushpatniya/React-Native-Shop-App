import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userId: userId,
    });
  }
};

export const signup = (email, password) => {
  // console.log(email, password)
  return async dispatch => {
    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVnnvov6NcZmM08mbQdu6_dv64BN8pCeg",
    {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken:true,
      })
    });
    
    if (!response.ok) {
      let message = "Something went wrong while signing up!";
      const errorData = await response.json();
      const errorId = errorData.error.message;
      if (errorId === "EMAIL_EXISTS") {
        message = "The email address is already in use by another account.";
      }
      throw new Error(message);
    }
    
    const resData = await response.json();
    // console.log(resData);

    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
}

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVnnvov6NcZmM08mbQdu6_dv64BN8pCeg",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      let message="Something went wrong while signing in!"
      const errorData = await response.json();
      const errorId = errorData.error.message;
      if (errorId === "EMAIL_NOT_FOUND") {
        message="Email doesn't exists"
      }
      else if (errorId === "INVALID_PASSWORD") {
        message = "The password is invalid";
      } else if (errorId === "USER_DISABLED") {
        message = "User account has been disabled by an administrator";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn)*1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  console.log('usedata:',AsyncStorage.getAllKeys());
  return ({ type: LOGOUT });
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return dispatch => {
    timer = setTimeout(() => {
      console.log('logging out');
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    userId: userId,
    token: token,
    expiryDate: expirationDate.toISOString()
  }));
};