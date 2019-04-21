import React, { Component } from "react";
import { Text } from "react-native";

const minimumFontSize = 17;

type Props = {
  children: any,
  style?: Object
};

/**
 * My own Text component, that will allow
 * 1) font sizes to be scaled depending on device/resolution etc.
 * 2) default props for text.
 */
export default class extends Component<Props> {
  render() {
    const { children, style, ...props } = this.props;
    let fontSize;
    if (style?.fontSize) {
      fontSize = Math.max(style?.fontSize, minimumFontSize);
    } else {
      fontSize = minimumFontSize;
    }
    return (
      <Text {...props} style={[{ color: "black" }, style, { fontSize }]}>
        {children}
      </Text>
    );
  }
}
