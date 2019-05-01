import React from "react";
import { StyleSheet } from "react-native";

import { TouchableOpacity, Text } from "components";

export default ({ input: { value, onChange }, ...props }) => {
  const handlePress = () => onChange(!value);
  return (
    <TouchableOpacity style={styles.checkbox} {...props} onPress={handlePress}>
      <Text style={{ margin: 0, padding: 0 }}>{value ? "X" : ""}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 1,
    borderColor: "hsl(0, 0%, 50%)",
    height: 23,
    width: 20,
    marginBottom: 3,
    borderRadius: 3,
    padding: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
