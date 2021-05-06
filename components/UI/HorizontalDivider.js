import React from "react";
import { View, StyleSheet } from "react-native";

const HorizontalDivider = (props) => {
  return <View style={{...styles.horizontalDivider, ...props.style}}></View>;
};

const styles = StyleSheet.create({
  horizontalDivider: {
    height: 2,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    // width: '50%',
    marginHorizontal: '25%',
    // paddingVertical:70,
  },
});
export default HorizontalDivider;
