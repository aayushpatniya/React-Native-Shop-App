import React from 'react';
import { Image,StyleSheet, View, Text, Button,TouchableNativeFeedback, Platform, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp
      onPress={props.onSelect}
      background={TouchableNativeFeedback.Ripple("#efefef")}
      foreground
      foreGround
    >
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.imageUrl }}></Image>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          {props.children}
        </View>
      </Card>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 300,
    padding: 10,
    marginBottom: 10,
  },
  actions: {
    height: "15%",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    elevation: 2,
    borderRadius: 8,
  },
  price: {
    fontSize: 20,
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
  imageContainer: {
    padding: 8,
    width: "100%",
    height: "70%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  details: {
    alignItems: "center",
    height: "15%",
    fontFamily: "open-sans",
  },
});

export default ProductItem;