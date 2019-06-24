import React from "react";
import AppContainer from "./navigation/MainTabNavigator";
//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/rootReducer";

const invariant = require("redux-immutable-state-invariant").default();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <AppContainer />
      </Provider>
    );
  }
}
