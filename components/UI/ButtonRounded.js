import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import Colors from "../../constants/Colors";

const ButtonRounded = (props) => {
  return (
    <View style={{...styles.buttonContainer, ...props.styles}}>
      <Button
        title={props.title}
        color={props.color}
        onPress={props.onPress}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 2,
    borderRadius: 8,
    overflow:"hidden",
  },
});

export default ButtonRounded;
