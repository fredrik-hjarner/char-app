import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";

import { closeModal } from "state-management/modal";

type Props = {
  closeModal: Function
};

const DialogWrapper = (props: Props) => (
  <TouchableWithoutFeedback onPress={props.closeModal}>
    <View style={styles.tint} />
  </TouchableWithoutFeedback>
);

export default connect(
  null,
  { closeModal }
)(DialogWrapper);

const styles = StyleSheet.create({
  tint: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});
