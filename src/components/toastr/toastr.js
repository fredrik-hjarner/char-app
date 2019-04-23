import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Banner } from "react-native-paper";
import { connect } from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

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
      console.log("toastr!!!!");

      return (
        <View style={{ position: "absolute", top: 0, width: "100%", left: 0 }}>
          <Banner
            style={this.getToastrStyle(type)}
            visible
            actions={[]}
            image={() => this.renderIcon(type)}
          >
            <Text style={styles.text}>{text}</Text>
          </Banner>
        </View>
      );
    }
  }
);

const styles = StyleSheet.create({
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
    fontSize: 16,
    textAlignVertical: "center"
  }
});
