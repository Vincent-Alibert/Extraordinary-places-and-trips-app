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
import DreamsByCat from "../components/dreams/DreamsByCat";
import DreamsForOneCat from "../components/dreams/DreamsForOneCat";
import Burger from "../components/commons/Burger";

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
        title: "Extraordinary places",
        headerRight: <Burger />
      }
    }
  },
  { headerLayoutPreset: "center" }
);

const DreamsListStack = createStackNavigator(
  {
    DreamsByCatView: {
      screen: DreamsByCat,
      navigationOptions: {
        title: "Vos rêves",
        headerRight: <Burger />
      }
    },
    DreamsForOneCatView: {
      screen: DreamsForOneCat,
      navigationOptions: {
        title: "NAME OF CAT",
        headerRight: <Burger />
      }
    }
  },
  { headerLayoutPreset: "center" }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      LoginFlow: LoginStack,
      MapFlow: MapStack,
      DreamsCatFlow: DreamsListStack
    },
    {
      initialRouteName: "MapFlow"
    }
  )
);
