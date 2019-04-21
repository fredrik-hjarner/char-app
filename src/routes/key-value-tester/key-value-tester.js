import React, { PureComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { KeyValueService } from "api";
import { Menu, Text } from "components";
import { LayoutWithHeader } from "layouts";

type Props = {};

type State = {
  keys: [string]
};

export default class extends PureComponent<Props, State> {
  state = { keys: [] };

  componentDidMount() {
    this.getAllKeys();
  }

  getAllKeys = () => KeyValueService.getAllKeys()
    .then(keys => this.setState({ keys }))
    .catch(exception => console.log("exception:", exception, ""));

  renderKeys() {
    const { keys } = this.state;
    return keys.map(k => <Text>{k}</Text>);
  }

  render() {
    return (
      <LayoutWithHeader>
        <View style={styles.container}>{this.renderKeys()}</View>
      </LayoutWithHeader>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20 },
});
