import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Text } from "components";

type Props = {
  actions: [
    {
      text: string,
      icon: any,
      callback: Function
    }
  ]
};

export default class extends PureComponent<Props> {
  render() {
    const { actions } = this.props;
    if (!actions?.length) {
      return null;
    }
    return (
      <View style={styles.container}>
        {actions.map(a => (
          <TouchableOpacity onPress={a.callback}>
            <Text style={styles.text}>{a.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "blue",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  text: {
    color: "white",
    fontWeight: "bold"
  }
});
