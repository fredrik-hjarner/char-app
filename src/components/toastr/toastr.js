import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import { getToastrs } from "state-management/toastr";
import Toastr from "./oneToastr";

type Props = {
  toastrs: [
    {
      text: string,
      type: string
    }
  ]
};

const mapStateToProps = state => ({
  toastrs: getToastrs(state)
});

export default connect(mapStateToProps)(
  class extends React.Component<Props> {
    render() {
      const { toastrs } = this.props;

      return (
        <View style={[styles.toastrContainer]}>
          {toastrs.map(props => (
            <Toastr {...props} />
          ))}
        </View>
      );
    }
  }
);

const styles = StyleSheet.create({
  toastrContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: 2
  }
});
