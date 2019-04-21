import React, { PureComponent } from "react";
import { StyleSheet, View, TextInput } from "react-native";

type Props = {
  textInputStyle?: Object
};

export default class extends PureComponent<Props> {
  render() {
    const { style, textInputStyle, ...props } = this.props;
    return (
      <View style={[styles.inputFieldContainer, style]}>
        <TextInput style={textInputStyle} {...props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputFieldContainer: {
    width: 200,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "darkblue",
  },
});
