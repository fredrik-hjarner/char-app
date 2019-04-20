import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { ActionsBar } from "components";

type Props = {
  children: any,
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
    const { actions, children } = this.props;
    if (!actions?.length) {
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.childrenContainer}>{children}</View>
        <ActionsBar actions={actions} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  childrenContainer: {
    width: "100%",
    flex: 1
  }
});
