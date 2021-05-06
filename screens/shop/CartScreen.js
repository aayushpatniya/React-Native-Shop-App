import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import { useSelector, useDispatch} from "react-redux";
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from "../../store/actions/orders";

import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/UI/Card';
import ButtonRounded from '../../components/UI/ButtonRounded';

const CartScreen = props => {
  const renderCartItem = (itemData) => {
    return (
      <CartItem
        itemQuantity={itemData.item.quantity}
        itemTitle={itemData.item.productTitle}
        itemPrice={itemData.item.productPrice}
        itemSum={itemData.item.sum}
        onDeleteItem={() =>
          dispatch(cartActions.deleteFromCart(itemData.item.productId))
        }
        deletable
      ></CartItem>
    );
  };

  const sendOrderHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(ordersActions.addOrder(cartItems, totalAmount));
      ToastAndroid.show("Hurrey!! Your order has confirmed. Please go to orders to check.", ToastAndroid.LONG);
    } catch (err) {
      setError(err.message);
      Alert.alert('Can\'t Order now! sorry.', error, [{ text: 'Okay!' }]);
    }
    setIsLoading(false);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const cartItems = useSelector((state) => {
    let transformedCartItems=[];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        quantity: state.cart.items[key].quantity,
        productPrice: state.cart.items[key].productPrice,
        sum: state.cart.items[key].sum,
      });
      transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    }
    return transformedCartItems;
  });
  
  return (
    <View style={styles.screen}>
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryText}>
          Total Amount:
          <Text style={styles.amount}> ${totalAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
          ></ActivityIndicator>
        ) : (
          <ButtonRounded
            title="Order"
            disabled={cartItems.length <= 0}
            color={Colors.primary}
            onPress={sendOrderHandler}
          ></ButtonRounded>
        )}
      </Card>
      <FlatList
        contentContainerStyle={{ paddingBottom: 15 }}
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => renderCartItem(itemData)}
      ></FlatList>
    </View>
  );
}

CartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Cart",
    // headerLeft: () => (
    //   <View style={styles.filterButtonContainer}>
    //     <TouchableOpacity onPress={() => navData.navigation.toggleDrawer()}>
    //       <View>
    //         <Ionicons name="md-menu" size={26} color="#fff" />
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    // ),
  };
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
    padding: 15,
  },
  summaryCard: {
    padding: 10,
    paddingHorizontal:15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center"
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize:18
  },
  amount: {
    color:Colors.primary
  },
  filterButtonContainer: {
    paddingHorizontal:15,
  }
});

export default CartScreen;