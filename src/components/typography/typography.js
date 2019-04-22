import React from "react";
import { StyleSheet, Text } from "react-native";

// TODO: Should remove Text and place it all here instead.
export const P = ({ children, style, ...props }) => (
  <Text style={[styles.p, style]} {...props}>
    {children}
  </Text>
);

export const B = ({ children, style, ...props }) => (
  <P style={[styles.b, style]} {...props}>
    {children}
  </P>
);

export const H1 = ({ children, style, ...props }) => (
  <B style={[styles.h1, style]} {...props}>
    {children}
  </B>
);

const styles = StyleSheet.create({
  p: { color: "black", fontSize: 17 },
  b: { fontWeight: "bold" },
  h1: { fontSize: 20 }
});
