import React, { useState } from "react";
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from '../../store/actions/products';

import Colors from "../../constants/Colors";
import HorizontalDivider from "../../components/UI/HorizontalDivider";
import ProductItem from "../../components/shop/ProductItem";
import { Ionicons } from "@expo/vector-icons";
import ButtonRounded from "../../components/UI/ButtonRounded";

const UserProductsScreen = (props) => {
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const userProducts = useSelector(state => state.products.userProducts);
  const deleteHandler = (id)=> Alert.alert(
    "Confirm Delete",
    "Are you sure you want to delete this item?",
    [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          try {
            setError(null);
            await dispatch(productActions.deleteProduct(id));
            ToastAndroid.show("Item deleted!", ToastAndroid.SHORT);
          }
          catch (err) {
            setError(err.message);
            if (error) {
              Alert.alert('Can\'t delete the item', error, [{ text: 'okay' }]);
            }
          }
        },
      },
    ]
  );

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 17 }}>No products made. Want to add your own?</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 15 }}
        style={{ padding: 10 }}
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return (
            <ProductItem
              title={itemData.item.title}
              price={itemData.item.price}
              imageUrl={itemData.item.imageUrl}
              onSelect={() =>
                props.navigation.navigate("EditProduct", {
                  productId: itemData.item.id,
                })
              }
            >
              <ButtonRounded
                title="Edit"
                onPress={() =>
                  props.navigation.navigate("EditProduct", {
                    productId: itemData.item.id,
                  })
                }
              ></ButtonRounded>
              <ButtonRounded
                title="Delete"
                color={Colors.primary}
                style={styles.button}
                onPress={() => deleteHandler(itemData.item.id)}
              ></ButtonRounded>
            </ProductItem>
          );
        }}
      ></FlatList>
    </View>
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <View style={styles.headerButtonContainer}>
        <TouchableOpacity onPress={() => navData.navigation.toggleDrawer()}>
          <View>
            <Ionicons name="md-menu" size={26} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    ),
    headerRight: () => (
      <View style={styles.headerButtonContainer}>
        <TouchableOpacity
          onPress={() => navData.navigation.navigate("EditProduct")}
        >
          <View>
            <Ionicons name="md-add" size={26} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 1,
  },
  headerButtonContainer: {
    paddingHorizontal: 15,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProductsScreen;
