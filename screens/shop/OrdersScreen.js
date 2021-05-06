import { Ionicons } from "@expo/vector-icons";
import React,{useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

import Colors from "../../constants/Colors";
import OrderItem from "../../components/shop/OrderItem";
import * as OrderActons from "../../store/actions/orders";

const OrdersScreen = (props) => {
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const setOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(OrderActons.setOrders());
    } catch (err) {
      setError(err.message);
      console.log(error);
      Alert.alert("Can't load orders", error, [{ text: "Okay!" }]);
    }
    setIsLoading(false);
  },[setIsLoading, setError, dispatch]);

  useEffect(() => {
    setOrders();
  }, [setOrders]);

  const renderOrderItem = (itemData) => {
    return (
      <OrderItem
        totalAmount={itemData.item.totalAmount}
        date={itemData.item.getReadableDate()}
        index={itemData.index}
        items={itemData.item.items}
      ></OrderItem>
    );
  };

  const orders = useSelector((state) => state.orders.orders);

  if (orders.length===0) {
    return (
      <View style={styles.centered}>
        <Text style={{fontSize:17}}>No orders made. Want to do some!!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary}></ActivityIndicator>
      </View>
    )  
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Button title="Try Again" onPress={setOrders} color={Colors.primary}></Button>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 15 }}
        data={orders}
        renderItem={(itemData) => renderOrderItem(itemData)}
      ></FlatList>
    </View>
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity onPress={() => navData.navigation.toggleDrawer()}>
          <View>
            <Ionicons name="md-menu" size={26} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  filterButtonContainer: {
    paddingHorizontal: 15,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
