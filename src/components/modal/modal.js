import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { connect } from "react-redux";

import { getModal, closeModal } from "state-management/modal";
import DialogWrapper from "./modal-wrapper";
import Tint from "./tint";

type Props = {
  modal: Modal,
  dispatch: Function
};

const ModalActions = ({ actions, dispatch }) => (
  <View style={styles.dialogButtonWrapper}>
    {actions.map(({ text, color, actionToDispatch }) => (
      <Button
        mode="contained"
        dark
        style={styles.dialogButton}
        onPress={() => {
          actionToDispatch && dispatch(actionToDispatch);
          dispatch(closeModal());
        }}
      >
        {text}
      </Button>
    ))}
  </View>
);

const Modal = ({ modal, dispatch }: Props) => {
  if (!modal) {
    return null;
  }
  const { title, text, actions } = modal;
  return (
    <>
      <Tint />
      <DialogWrapper>
        <View style={styles.dialogContent}>
          <Text style={styles.dialogHeader}>{title}</Text>
          <Text style={styles.dialogText}>{text}</Text>
          <ModalActions actions={actions} dispatch={dispatch} />
        </View>
      </DialogWrapper>
    </>
  );
};

const mapStateToProps = state => ({
  modal: getModal(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

const styles = StyleSheet.create({
  dialogContent: {
    zIndex: 2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  dialogButtonWrapper: {
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    margin: 5
  },
  dialogButton: {
    flex: 2,
    margin: 5,
    marginBottom: 10,
    backgroundColor: "green"
  },
  dialogHeader: {
    fontSize: 20,
    margin: 20,
    textAlign: "center"
  },
  dialogText: {
    fontSize: 15,
    margin: 10,
    textAlign: "center"
  }
});
