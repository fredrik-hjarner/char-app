import React, { PureComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { KeyValueService } from "api";
import { Menu, Text } from "components";

type Props = {};

type State = {
  keys: [string]
};

export default class extends PureComponent<Props, State> {
  state = { keys: [] };

  componentDidMount() {
    this.getAllKeys();
  }

  getAllKeys = () =>
    KeyValueService.getAllKeys()
      .then(keys => this.setState({ keys }))
      .catch(exception => console.log("exception:", exception, ""));

  getValue = () =>
    KeyValueService.getValue("alpha/fuck")
      .then(response => console.log("response:", response, ""))
      .catch(exception => console.log("exception:", exception, ""));

  setValue = () =>
    KeyValueService.setValue("alpha/fuck", "some value")
      .then(response => console.log("response:", response, ""))
      .catch(exception => console.log("exception:", exception, ""));

  renderKeys() {
    const { keys } = this.state;
    return keys.map(k => <Text>{k}</Text>);
  }

  render() {
    return (
      <View style={styles.container}>
        <Menu />
        {this.renderKeys()}
        <Button mode="contained" onPress={this.setValue}>
          Set value
        </Button>
        <Button mode="contained" onPress={this.getValue}>
          Get value
        </Button>
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
