import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

type Props = { children: any };

export default class extends PureComponent<Props> {
  render() {
    const { children } = this.props;
    return <View style={styles.container}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
});
