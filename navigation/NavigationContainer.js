import React from "react";
import { useEffect, useRef } from "react";
import { NavigationActions } from "react-navigation";
import {useSelector} from "react-redux";

import ShopNavigation from './ShopNavigation';

const NavigationContainer = (props) => {
  const isAuth = useSelector(state => !!state.auth.token)
  const navRef = useRef();
  useEffect(()=>{
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
    }
  },[isAuth])
  return (
    <ShopNavigation ref={navRef}></ShopNavigation>
  );
};

export default NavigationContainer;
