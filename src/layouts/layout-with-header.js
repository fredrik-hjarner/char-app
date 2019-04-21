import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import { Menu } from "components";

type Props = {};

export default class extends PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <View style={styles.container}>
        <Menu />
        <View style={styles.childrenContainer}>{children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  childrenContainer: {
    width: "100%",
    flex: 1,
  },
});
