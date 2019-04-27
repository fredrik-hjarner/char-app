import React from "react";
import { TouchableOpacity } from "react-native";

export default ({ children, ...props }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      {children}
    </TouchableOpacity>
  );
};
