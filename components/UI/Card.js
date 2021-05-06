import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    borderColor: "#cdcdcd",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
  },
});

export default Card;
