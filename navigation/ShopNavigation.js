import React from 'react';
import {Platform, SafeAreaView, Button, View} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from '../screens/StartupScreen';
import * as authActions from "../store/actions/auth";
import { useDispatch } from 'react-redux';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon:drawerConfig=> <Ionicons name="md-cart" size={24} color={drawerConfig.tintColor}></Ionicons>,
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon:drawerConfig=> <Ionicons name="md-list" size={24} color={drawerConfig.tintColor}></Ionicons>,
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="md-create"
          size={24}
          color={drawerConfig.tintColor}
        ></Ionicons>
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
      navigationOptions: {
        drawerLabel: "Products",
      },
    },
    Orders: OrdersNavigator,
    Admin:AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      labelStyle: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
      },
    },
    contentComponent:(props) => {
      const dispatch = useDispatch()
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props}></DrawerItems>
            <View style={{ margin: 10, marginHorizontal:30, borderRadius:50, overflow:"hidden", }}>
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              ></Button>
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);


const MainNavigator = createSwitchNavigator({
  Startup:StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);