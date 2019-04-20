import React, { PureComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { KeyValueService } from "api";
import { Menu, ActionsBar, Text } from "components";
import Abilities from "./abilities";

const iconSize = 24;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {};

type State = {
  abilities: {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  }
};

export default class App extends PureComponent<Props, State> {
  state = {
    abilities: {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1
    }
  };

  load = () =>
    KeyValueService.getValue("bruno/abilities")
      .then(response => this.setState({ abilities: response }))
      .catch(exception => console.log("exception:", exception, ""));

  save = () => {
    if (!this.abilities) {
      return;
    }
    KeyValueService.setValue("bruno/abilities", JSON.stringify(this.abilities))
      .then(() => console.log("saved!"))
      .catch(exception => console.log("exception:", exception, ""));
  };

  handleAbilityChange = (abilities: object) => (this.abilities = abilities);

  render() {
    const { abilities } = this.state;
    const actions = [
      { text: "Load", callback: this.load, icon: loadIcon },
      { text: "Save", callback: this.save, icon: saveIcon }
    ];
    return (
      <View style={styles.container}>
        <Menu />
        <Abilities {...abilities} onChange={this.handleAbilityChange} />
        <ActionsBar actions={actions} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});
