import React from "react";
import { StyleSheet, Animated } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { P } from "components";
import { TOASTR_SUCCESS, TOASTR_ERROR } from "state-management/toastr";

type Props = {
  text: string,
  type: string
};

export default class extends React.Component<Props> {
  componentWillMount() {
    this.opacity = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.opacity, {
      toValue: 1,
      duration: 500
    }).start();
  }

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
        return <MaterialCommunityIcon name="check-circle-outline" size={30} />;
    }
  }

  render() {
    const { text, type } = this.props;
    return (
      <Animated.View
        style={[
          { opacity: this.opacity },
          styles.toastr,
          this.getToastrStyle(type)
        ]}
      >
        {this.renderIcon(type)}
        <P style={styles.text}>{text}</P>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  toastr: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 6,
    marginTop: 2
  },
  success: {
    backgroundColor: "rgba(80,200,80, 0.95)"
  },
  error: {
    backgroundColor: "hsla(0, 100%, 60%, 0.95)"
  },
  text: {
    marginLeft: 10,
    textAlignVertical: "center"
  }
});
