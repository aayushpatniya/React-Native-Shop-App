import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const ButtonOutlined = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} style={{...styles.buttonContainer, borderColor:props.color}}>
        <Text style={{ ...styles.buttonText, color:props.color }}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical:2,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: "white",
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ButtonOutlined;
