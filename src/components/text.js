import React, { Component } from "react";
import { Text } from "react-native";

const minimumFontSize = 17;

type Props = {
  children: any,
  style?: object
};

/**
 * My own Text component, that will allow
 * 1) font sizes to be scaled depending on device/resolution etc.
 * 2) default props for text.
 */
export default class extends Component {
  render() {
    const { children, style, ...props } = this.props;
    let fontSize;
    if (style?.fontSize) {
      fontSize = Math.max(style?.fontSize, minimumFontSize);
    } else {
      fontSize = minimumFontSize;
    }
    return (
      <Text {...props} style={[style, { fontSize }]}>
        {children}
      </Text>
    );
  }
}
