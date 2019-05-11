import React from "react";
import { Platform } from "react-native";

import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Login from "../components/login/Login";
import Inscription from "../components/login/Inscription";
import { map } from "../components/map/map";

const LoginStack = createStackNavigator(
  {
    LoginView: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    InscriptionView: {
      screen: Inscription,
      navigationOptions: {
        title: "Inscription"
      }
    }
  },
  {
    initialRouteName: "LoginView",
    headerLayoutPreset: "center"
  }
);
const MapStack = createStackNavigator(
  {
    MapView: {
      screen: map,
      navigationOptions: {
        title: "Extraordinary places"
      }
    }
  },
  {
    initialRouteName: "LoginView",
    headerLayoutPreset: "center"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      LoginFlow: LoginStack
    },
    {
      initialRouteName: "LoginFlow"
    }
  )
);
