import React, { PureComponent, Fragment } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Home, KeyValueTester } from "./src/routes";

const AppNavigator = createStackNavigator(
  {
    Home,
    KeyValueTester
  },
  {
    initialRouteName: "KeyValueTester",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class extends React.Component {
  render() {
    return (
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    );
  }
}
