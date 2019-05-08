import React from "react";
import { StyleSheet, View } from "react-native";
import { Portal } from "react-native-paper";

type Props = {
  children: any
};

export default ({ children }: Props) => (
  <Portal>
    <View style={styles.dialogContainer}>
      <View style={styles.dialogWrapper}>{children}</View>
    </View>
  </Portal>
);

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dialogWrapper: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    width: "90%"
  }
});
