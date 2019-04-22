import React from "react";
import { StyleSheet, View } from "react-native";

export const Grid = ({ children, style, ...props }) => (
  <View style={[styles.grid, style]} {...props}>
    {children}
  </View>
);

type RowProps = {
  width:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18,
  // vertically center content?
  vc?: boolean
};

export const Row = ({ children, style, vc, width = 1, ...props }: RowProps) => (
  <View
    style={[
      styles.row,
      { width: `${width * (100 / 18)}%` },
      vc ? { alignItems: "center" } : undefined,
      style
    ]}
    {...props}
  >
    {children}
  </View>
);

// TODO: This should perhaps be moved to better suiting file.
export const Padding = ({ big }) => (
  <View style={big ? styles.paddingBig : styles.padding} />
);

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap" },
  row: { flexDirection: "row", flexWrap: "wrap" },
  padding: {
    height: 5
  },
  paddingBig: {
    height: 30
  }
});
