import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { Text } from "components";
import {
  activeCharacterSelector,
  setActiveCharacter,
  createNewCharacter
} from "state-management/character";
import { pushRoute } from "state-management/navigation";

type Props = {
  pushRoute: Function
};

const mapStateToProps = state => ({
  activeCharacter: activeCharacterSelector(state)
});

export default connect(
  mapStateToProps,
  { setActiveCharacter, createNewCharacter, pushRoute }
)(
  class extends PureComponent<Props> {
    setActiveCharacter = () => this.props.setActiveCharacter("quinn");

    createNewCharacter = () => this.props.pushRoute("CreateNewCharacter");

    renderCharacter() {
      const { activeCharacter } = this.props;
      return (
        <View style={styles.characterContainer}>
          <Text style={styles.text}>{activeCharacter}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={this.createNewCharacter}>
              <MaterialCommunityIcon
                name="account-plus"
                color="white"
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 30 }}
              onPress={this.setActiveCharacter}
            >
              <MaterialCommunityIcon
                name="account-switch"
                color="white"
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    renderRoutes() {
      return (
        <View style={styles.routesContainer}>
          <TouchableOpacity
            onPress={() => this.props.pushRoute("KeyValueTester")}
          >
            <Text style={styles.text}>Key-value pairs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.pushRoute("Home")}>
            <Text style={styles.text}>Character sheet</Text>
          </TouchableOpacity>
        </View>
      );
    }

    render() {
      return (
        <View style={styles.container}>
          {this.renderCharacter()}
          {this.renderRoutes()}
        </View>
      );
    }
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  routesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "darkblue",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  characterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "blue",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 6,
    paddingBottom: 6
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  actions: {
    flexDirection: "row",
    alignItems: "center"
  }
});
