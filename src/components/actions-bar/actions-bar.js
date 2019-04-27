import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import { Text, TouchableOpacity } from "components";

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
          <TouchableOpacity style={styles.iconContainer} onPress={a.callback}>
            {a.icon}
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
    backgroundColor: "darkblue",
    paddingTop: 5,
    paddingBottom: 5
  },
  text: {
    color: "white"
    // fontWeight: "bold"
  },
  iconContainer: {
    alignItems: "center"
  }
});
