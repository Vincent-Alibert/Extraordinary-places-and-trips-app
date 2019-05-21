import React, { Component } from "react";
import { Text, View } from "react-native";
import Burger from "../commons/Burger";
import CustomGoBack from "../commons/CustomGoBack";

export class DreamsForOneCat extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: navigation.getParam("categorie"),
      /* These values are used instead of the shared configuration! */
      headerRight: <Burger navigation={navigation} />,
      headerLeft: <CustomGoBack navigation={navigation} />
    };
  };
  render() {
    return (
      <View>
        <Text> DreamsForOneCat VIEW </Text>
      </View>
    );
  }
}

export default DreamsForOneCat;
