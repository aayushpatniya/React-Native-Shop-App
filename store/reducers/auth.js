import { SIGNUP, LOGIN, AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case LOGOUT:
      return initialState;
    
    case AUTHENTICATE:
      return {
        token: actions.token,
        userId: actions.userId,
      };
    // case LOGIN:
    //   return {
    //     token: actions.token,
    //     userId: actions.userId,
    //   };
    default:
      return state;
  }
}