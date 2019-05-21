import React, { Component } from "react";
import { TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";

export class CustomGoBack extends Component {
  render() {
    return (
      <TouchableHighlight style={{ paddingLeft: 10 }}>
        <Icon
          name="arrow-back"
          onPress={() => this.props.navigation.navigate("DreamsByCatView")}
        />
      </TouchableHighlight>
    );
  }
}

export default CustomGoBack;
