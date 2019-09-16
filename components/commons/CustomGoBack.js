import React from "react";
import { TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";

const CustomGoBack = props => (
  <TouchableHighlight style={{ paddingLeft: 10 }}>
    <Icon
      name="arrow-back"
      onPress={() => props.navigation.navigate("DBCList")}
    />
  </TouchableHighlight>
);

export default CustomGoBack;
