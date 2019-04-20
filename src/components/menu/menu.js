import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import { Text } from "components";

type Props = {
  navigation: object
};

export default withNavigation(
  class extends PureComponent<Props> {
    render() {
      const { navigation } = this.props;
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("KeyValueTester")}
          >
            <Text style={styles.text}>Key-value pairs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.text}>Character sheet</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "blue",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});
