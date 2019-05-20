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
import Dream from "../components/dreams/Dream";
import DreamEdit from "../components/dreams/DreamEdit";
import DreamCreate from "../components/dreams/DreamCreate";

import Burger from "../components/commons/Burger";

const LoginStack = createStackNavigator(
  {
    LoginView: {
      screen: Login
    },
    InscriptionView: {
      screen: Inscription
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
      screen: MapPlace
    }
  },
  { headerLayoutPreset: "center" }
);

const DreamsListStack = createStackNavigator(
  {
    DreamsByCatView: {
      screen: DreamsByCat
    },
    DreamsForOneCatView: {
      screen: DreamsForOneCat
    }
  },
  { headerLayoutPreset: "center", initialRouteName: "DreamsByCatView" }
);

const DreamStack = createStackNavigator(
  {
    DreamView: {
      screen: Dream
    },
    DreamCreateView: {
      screen: DreamEdit
    },
    DreamEditView: {
      screen: DreamCreate
    }
  },
  { headerLayoutPreset: "center", initialRouteName: "DreamView" }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      LoginFlow: LoginStack,
      MapFlow: MapStack,
      DreamsCatFlow: DreamsListStack,
      DreamFlow: DreamStack
    },
    {
      initialRouteName: "DreamsCatFlow"
    }
  )
);
