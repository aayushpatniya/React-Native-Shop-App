import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import * as CartActions from "../../store/actions/cart";
import ButtonRounded from '../../components/UI/ButtonRounded';

const ProductDetailScreen = props => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 15 }}
      style={styles.screen}
    >
      <Image
        source={{ uri: selectedProduct.imageUrl }}
        style={styles.image}
      ></Image>
      <View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <ButtonRounded
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => dispatch(CartActions.addToCart(selectedProduct))}
        ></ButtonRounded>
      </View>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  const title=navData.navigation.getParam('productTitle');
  return {
    headerTitle: title,
    headerRight: () => (
      <View style={styles.cartButtonContainer}>
        <TouchableOpacity onPress={() => navData.navigation.navigate("Cart")}>
          <View>
            <Ionicons name="md-cart" size={26} color="white" />
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
  price: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    textAlign: "center",
    marginVertical: 10,
    color: Colors.primary,
  },
  actions: {
    alignItems: "center",
    // marginVertical:10,
  },
  cartButtonContainer: {
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: "open-sans",
    marginHorizontal: 10,
    marginVertical: 15,
    textAlign: "center",
  },
});

export default ProductDetailScreen;