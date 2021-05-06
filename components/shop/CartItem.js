import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";

const cartItem = (props) => {
  return (
    <View style={{ ...styles.itemContainer }}>
      <View style={{ ...styles.itemDetailContainer, maxWidth: "60%" }}>
        <Text style={styles.itemDetailText}>
          {props.itemQuantity} x {props.itemTitle}
        </Text>
      </View>
      <View style={styles.itemDetailContainer}>
        <Text style={styles.itemDetailText}>${props.itemSum.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity onPress={props.onDeleteItem}>
            <View>
              <Ionicons
                name="md-trash"
                style={{ marginHorizontal: 5, marginLeft: 10 }}
                size={26}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemDetailText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "open-sans",
  },
  title: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
  },
  itemDetailContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  itemContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "#bcbcbc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },
});

export default cartItem;
