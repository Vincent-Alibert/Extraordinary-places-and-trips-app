import React from "react";
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
    MapDreamView: {
      screen: Dream
    },
    MapDreamCreateView: {
      screen: EditCreateDreams
    },
    MapModifDream: {
      screen: EditCreateDreams
    }
  },
  { initialRouteName: "MapView", headerLayoutPreset: "center" }
);

const DreamsByCatStack = createStackNavigator(
  {
    DBCList: {
      screen: DreamsByCat
    },
    DBCDreamView: {
      screen: Dream
    },
    DBCCreateDream: {
      screen: EditCreateDreams
    },
    DBCModifDream: {
      screen: EditCreateDreams
    }
  },
  { headerLayoutPreset: "center", initialRouteName: "DBCList" }
);

const DreamsForOneCatStack = createStackNavigator(
  {
    DFOCList: {
      screen: DreamsForOneCat
    },
    DFOCDreamView: {
      screen: Dream
    },
    DFOCCreateDream: {
      screen: EditCreateDreams
    },
    DFOCModifDream: {
      screen: EditCreateDreams
    }
  },
  {
    headerLayoutPreset: "center",
    initialRouteName: "DFOCList"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      LoginFlow: LoginStack,
      MapFlow: MapStack,
      DreamsCatFlow: DreamsByCatStack,
      DreamsForOneCatFlow: DreamsForOneCatStack
    },
    {
      initialRouteName: "DreamsCatFlow"
    }
  )
);
