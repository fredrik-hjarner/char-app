import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";

import { KeyValueService } from "api";

type Props = {};

export default class App extends PureComponent<Props> {
  renderAbility(ability: string) {
    return (
      <View style={styles.abilityContainer}>
        <View>
          <Text>{ability}</Text>
        </View>
        <View style={styles.inputFieldContainer}>
          <TextInput
            keyboardType="numeric"
            onChangeText={text => this.setState({ text })}
            //value={this.state.text}
          />
        </View>
        <View>
          <Text>+1</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderAbility("strength")}
        {this.renderAbility("dexterity")}
        {this.renderAbility("constitution")}
        {this.renderAbility("intelligence")}
        {this.renderAbility("wisdom")}
        {this.renderAbility("charisma")}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    /* justifyContent: "center",
    alignItems: "center" */
  },
  inputFieldContainer: {
    width: 50,
    // marginTop: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "red"
  },
  abilityContainer: {
    flexDirection: "row"
  }
});
