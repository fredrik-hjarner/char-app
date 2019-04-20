import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "components";

type Props = {};

export default class extends PureComponent<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Character sheet</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "blue",
    padding: 10
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
