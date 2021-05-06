{/* <script src="http://192.168.137.1:8097"></script> */}
import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension';
import devToolsEnhancer from "remote-redux-devtools";
import ReduxThunk  from 'redux-thunk';

import productsReducer from './store/reducers/products';
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import NavigationContainer from "./navigation/NavigationContainer";

LogBox.ignoreLogs([
  "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).",
  "Deprecation in 'createStackNavigator': 'Header.HEIGHT' will be removed in a future version. Use 'useHeaderHeight' or 'HeaderHeightContext' instead",
  "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.",
]);

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });
}

const store = createStore(
  rootReducer /* preloadedState, */,
  // +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // composeWithDevTools()
  // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
  // devToolsEnhancer()
  applyMiddleware(ReduxThunk)
);
  
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(error) => console.log(error)}
        onFinish={() => setFontLoaded(true)}>
      </AppLoading>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer></NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
