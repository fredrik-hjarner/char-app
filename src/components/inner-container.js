import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

type Props = { children: any };

export default class extends PureComponent<Props> {
  render() {
    const { children, style, ...props } = this.props;
    return (
      <View style={[styles.container, style]} {...props}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%"
  }
});
