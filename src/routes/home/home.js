import React, { PureComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { KeyValueService } from "api";
import { Menu, ActionsBar, Text } from "components";
import Abilities from "./abilities";

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
      .then(response => {
        console.log("response:", response, "");
        /* const abilities = JSON.parse(response);
        console.log("abilities:", abilities, ""); */
        this.setState({ abilities: response });
      })
      .catch(exception => console.log("exception:", exception, ""));

  save = () => {
    KeyValueService.setValue(
      "bruno/abilities",
      JSON.stringify({
        strength: 18,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1
      })
    )
      .then(() => console.log("saved!"))
      .catch(exception => console.log("exception:", exception, ""));
  };

  render() {
    const { abilities } = this.state;
    const actions = [
      { text: "Load", callback: this.load },
      { text: "Save", callback: this.save }
    ];
    return (
      <View style={styles.container}>
        <Menu />
        <Abilities {...abilities} />
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
