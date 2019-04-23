import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { P } from "components";
import {
  getToastr,
  TOASTR_SUCCESS,
  TOASTR_ERROR
} from "state-management/toastr";

type Props = {
  toastr: {
    text: string,
    type: string
  }
};

const mapStateToProps = state => ({
  toastr: getToastr(state)
});

export default connect(mapStateToProps)(
  class extends React.Component<Props> {
    getToastrStyle(type) {
      switch (type) {
        case TOASTR_ERROR:
          return styles.error;
        default:
        case TOASTR_SUCCESS:
          return styles.success;
      }
    }

    renderIcon(type) {
      switch (type) {
        case TOASTR_ERROR:
          return <MaterialIcon name="error-outline" size={30} />;
        default:
        case TOASTR_SUCCESS:
          return (
            <MaterialCommunityIcon name="check-circle-outline" size={30} />
          );
      }
    }

    render() {
      const { toastr } = this.props;

      if (!toastr) {
        return null;
      }

      const { type, text } = toastr;

      return (
        <View style={[styles.toastr, this.getToastrStyle(type)]}>
          {this.renderIcon(type)}
          <P style={styles.text}>{text}</P>
        </View>
      );
    }
  }
);

const styles = StyleSheet.create({
  toastr: {
    flexDirection: "row",
    padding: 10,
    position: "absolute",
    top: 0,
    width: "100%",
    left: 0
  },
  success: {
    backgroundColor: "rgb(80,200,80)",
    position: "absolute",
    width: "100%"
  },
  error: {
    backgroundColor: "hsl(0, 100%, 47%)",
    position: "absolute",
    width: "100%"
  },
  text: {
    marginLeft: 10,
    textAlignVertical: "center"
  }
});
