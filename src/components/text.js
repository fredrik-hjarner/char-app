import React, { Component } from "react";
import { Text } from "react-native";

type Props = {
  children: any
};

/**
 * My own Text component, that will allow
 * 1) font sizes to be scaled depending on device/resolution etc.
 * 2) default props for text.
 */
export default class extends Component {
  render() {
    const { children, ...props } = this.props;
    return <Text {...props}>{children}</Text>;
  }
}
