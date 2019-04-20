import React, { PureComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { Home } from "./src/routes";

export default class extends PureComponent<any> {
  render() {
    return (
      <PaperProvider>
        <Home />
      </PaperProvider>
    );
  }
}
