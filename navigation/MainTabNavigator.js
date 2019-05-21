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

const DreamStack = createStackNavigator(
  {
    DreamView: {
      screen: Dream
    },

    DreamEditView: {
      screen: DreamCreate
    }
  },
  { headerLayoutPreset: "center", initialRouteName: "DreamView" }
);

const DreamCreateStack = createStackNavigator(
  {
    DreamCreateView: {
      screen: DreamEdit
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
      DreamFlow: DreamStack,
      DreamCreateFlow: DreamCreateStack,
      DreamsForOneCatFlow: DreamsForOneCatStack
    },
    {
      initialRouteName: "DreamFlow"
    }
  )
);
