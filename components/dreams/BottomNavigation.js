import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import commonsStyles from "../../assets/styles/commonsStyles";

export default class BottomNavigation extends Component {
  render() {
    return (
      <View
        style={{
          position: "absolute",
          backgroundColor: commonsStyles.colors.white,
          bottom: 0,
          flex: 1,
          paddingTop: commonsStyles.spacing.unit * 1.5,
          paddingBottom: commonsStyles.spacing.unit * 1.5,
          width: "100%",
          minHeight: 50,
          ...commonsStyles.centerCenter,
          shadowOffset: {
            width: 0,
            height: 5
          },
          shadowOpacity: 0.6,
          shadowRadius: 6,
          elevation: 10,
          shadowColor: commonsStyles.colors.black
        }}
      >
        <TouchableOpacity>
          <Icon
            color={commonsStyles.colors.primary}
            name="edit"
            onPress={this.showMenu}
          />
          <Text style={{ color: commonsStyles.colors.primary }}>
            Modifier ce rêve
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
