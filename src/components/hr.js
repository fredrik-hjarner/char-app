import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

type Props = {};

export default class extends PureComponent<Props> {
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    height: 2,
    backgroundColor: "black",
    opacity: 0.1,
    marginVertical: 15
  }
});
