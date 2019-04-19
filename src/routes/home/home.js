import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import { KeyValueService } from "api";
import { Menu } from "components";
import Abilities from "./abilities";

type Props = {};

export default class App extends PureComponent<Props> {
  componentDidMount() {
    this.getAllKeys();
  }

  getAllKeys = () =>
    KeyValueService.getAllKeys()
      .then(response => console.log("response:", response, ""))
      .catch(exception => console.log("exception:", exception, ""));

  getValue = () =>
    KeyValueService.getValue("alpha/fuck")
      .then(response => console.log("response:", response, ""))
      .catch(exception => console.log("exception:", exception, ""));

  setValue = () =>
    KeyValueService.setValue("alpha/fuck", "some value")
      .then(response => console.log("response:", response, ""))
      .catch(exception => console.log("exception:", exception, ""));

  render() {
    return (
      <View style={styles.container}>
        <Menu />
        <Button mode="contained" onPress={this.setValue}>
          Set value
        </Button>
        <Button mode="contained" onPress={this.getValue}>
          Get value
        </Button>
        <Abilities />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});
