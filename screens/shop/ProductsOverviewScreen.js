import React,{useCallback, useEffect, useState} from 'react';
import { TouchableOpacity,StyleSheet, ActivityIndicator, FlatList, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";

import ProductItem from '../../components/shop/ProductItem';
import ButtonRounded from "../../components/UI/ButtonRounded";
import HorizontalDivider from "../../components/UI/HorizontalDivider";
import * as CartActions from "../../store/actions/cart";
import * as ProductActions from "../../store/actions/products";
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(ProductActions.setProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  },[dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocus = props.navigation.addListener("willFocus", loadProducts);
    return () => {
      willFocus.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() =>{
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const renderProductItem = (itemData) => {
    const onSelectHandler = () => {
      return props.navigation.navigate("ProductDetail", {
        productId: itemData.item.id,
        productTitle: itemData.item.title,
      });
    };

    return (
      <ProductItem
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        price={itemData.item.price}
        onSelect={() => onSelectHandler()}
      >
        <ButtonRounded
          title="View Details"
          color={Colors.accent}
          onPress={() => onSelectHandler()}
        ></ButtonRounded>
        <ButtonRounded
          title="Add to cart"
          color={Colors.primary}
          style={styles.button}
          onPress={() => dispatch(CartActions.addToCart(itemData.item))}
        ></ButtonRounded>
      </ProductItem>
    );
  };
  const products = useSelector(state => state.products.availableProducts);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          color={Colors.primary}
          size="large"
        ></ActivityIndicator>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, fontFamily: "open-sans" }}>
          Error Occured : {error}
        </Text>
        <Button title="Try Again" onPress={loadProducts}></Button>
      </View>
    );
  }

  if (!isLoading && products.length===0) {
    return (
      <View style={styles.centered}>
        <Text style={{fontSize:16, fontFamily:'open-sans'}}>No products! Wanna add some.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 15 }}
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        style={styles.productsList}
        data={products}
        renderItem={(itemData) => renderProductItem(itemData)}
      ></FlatList>
      <HorizontalDivider></HorizontalDivider>
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerRight: () => {
      return (
        <View style={styles.cartButtonContainer}>
          <TouchableOpacity onPress={() => navData.navigation.navigate("Cart")}>
            <View>
              <Ionicons name="md-cart" size={26} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      );
    },
    headerLeft: () => (
      <View style={styles.menuButtonContainer}>
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
  productsList: {
    padding: 10,
  },
  cartButtonContainer: {
    paddingRight: 10,
  },
  menuButtonContainer: {
    paddingLeft: 10,
  },
  centered: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});

export default ProductsOverviewScreen;