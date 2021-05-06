import { Ionicons } from "@expo/vector-icons";
import React, {useState} from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  FlatList
} from "react-native";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import MyButton from "../UI/ButtonOutlined";
import Card from "../UI/Card";

const orderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.card}>
      <TouchableCmp
        style={{ flex: 1 }}
        onPress={() => setShowDetails((value) => !value)}
        background={TouchableNativeFeedback.Ripple("#cdcdcd")}
      >
        <View style={styles.childContainer}>
          <View style={styles.summaryContainer}>
            <View>
              <Text style={styles.index}>#{props.index + 1}</Text>
            </View>
            <View>
              <Text style={styles.date}>{props.date}</Text>
            </View>
          </View>
          <View style={styles.summaryContainer}>
            <View>
              <Text style={styles.totalAmount}>
                ${props.totalAmount.toFixed(2)}
              </Text>
            </View>
            <View>
              {/* <Button
                onPress={() => setShowDetails((value) => !value)}
                color={Colors.primary}
                title={showDetails ? "Hide Details" : "Show Details"}
              ></Button> */}
              <MyButton
                onPress={() => setShowDetails((value) => !value)}
                color={Colors.primary}
                title={showDetails ? "Hide Details" : "Show Details"}
              ></MyButton>
            </View>
          </View>
          {showDetails && (
            <View>
              <FlatList
                data={props.items}
                keyExtractor={(item) => item.productId}
                renderItem={(itemData) => {
                  return (
                    <CartItem
                      itemQuantity={itemData.item.quantity}
                      itemSum={itemData.item.sum}
                      itemTitle={itemData.item.productTitle}
                    ></CartItem>
                  );
                }}
              ></FlatList>
            </View>
          )}
        </View>
      </TouchableCmp>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
  index: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Colors.primary,
  },
  date: {
    fontSize: 15,
    fontFamily: "open-sans",
  },
  card: {
    width: "100%",
    marginVertical: 8,
  },
  childContainer: {
    padding: 10,
    paddingHorizontal: 15,
  },
  summaryContainer: {
    marginBottom: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default orderItem;
