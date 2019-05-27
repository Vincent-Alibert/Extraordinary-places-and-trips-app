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
import EditCreateDreams from "../components/dreams/form/EditCreateDreams";

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
    },
    DreamView: {
      screen: Dream
    }
  },
  { headerLayoutPreset: "center" }
);

const DreamsListStack = createStackNavigator(
  {
    DreamsByCatView: {
      screen: DreamsByCat
    },
    DreamView: {
      screen: Dream
    }
  },
  { headerLayoutPreset: "center", initialRouteName: "DreamsByCatView" }
);

const DreamsForOneCatStack = createStackNavigator(
  {
    DreamsForOneCatView: {
      screen: DreamsForOneCat
    },
    DreamView: {
      screen: Dream
    }
  },
  {
    headerMode: "screen",
    headerLayoutPreset: "center",
    headerBackTitleVisible: true,
    initialRouteName: "DreamsForOneCatView"
  }
);

const DreamCreateStack = createStackNavigator(
  {
    DreamCreateView: {
      screen: EditCreateDreams
    }
  },
  { headerLayoutPreset: "center", initialRouteName: "DreamCreateView" }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      LoginFlow: LoginStack,
      MapFlow: MapStack,
      DreamsCatFlow: DreamsListStack,

      DreamCreateFlow: DreamCreateStack,
      DreamsForOneCatFlow: DreamsForOneCatStack
    },
    {
      initialRouteName: "DreamCreateFlow"
    }
  )
);
