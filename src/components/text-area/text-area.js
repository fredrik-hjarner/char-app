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
        <TextInput
          multiline
          numberOfLines={5}
          style={[styles.textInput, textInputStyle]}
          {...props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputFieldContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "darkblue"
  },
  textInput: {
    textAlignVertical: "top",
    padding: 0,
    fontSize: 17 // TODO: import default fontSize
  }
});
