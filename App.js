import React, { PureComponent, Fragment } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { PersistGate } from "redux-persist/lib/integration/react";

import { persistor, store } from "./src/state-management/store";
import { Home, KeyValueTester } from "./src/routes";

const AppNavigator = createStackNavigator(
  {
    Home,
    KeyValueTester
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<View style={{ backgroundColor: "white", flex: 1 }} />}
        >
          <PaperProvider>
            <AppContainer />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}
