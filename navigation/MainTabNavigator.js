import React from "react";
import { Platform } from "react-native";

import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Login from "../components/login/Login";
import Inscription from "../components/login/Inscription";
import MapPlace from "../components/map/MapPlace";

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
      screen: MapPlace,
      navigationOptions: {
        title: "Extraordinary places"
      }
    }
  },
  { headerLayoutPreset: "center" }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      LoginFlow: LoginStack,
      MapFlow: MapStack
    },
    {
      initialRouteName: "LoginFlow"
    }
  )
);
