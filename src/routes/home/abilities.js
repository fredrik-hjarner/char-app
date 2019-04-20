import React, { PureComponent } from "react";
import { View, TextInput } from "react-native";
import { Button } from "react-native-paper";

import { KeyValueService } from "api";
import { Text } from "components";
import styles, {
  firstColWidth,
  secondColWidth,
  thirdColWidth
} from "./styles/abilities";

type Props = {
  strength: number,
  dexterity: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number
};

export default class App extends PureComponent<Props> {
  renderTableHeader() {
    return (
      <View style={[styles.abilityContainer, { opacity: 0.75 }]}>
        <View style={{ width: firstColWidth }} />
        <View style={{ width: secondColWidth, alignItems: "center" }}>
          <Text>score</Text>
        </View>
        <View style={{ width: thirdColWidth, alignItems: "center" }}>
          <Text>mod</Text>
        </View>
      </View>
    );
  }

  renderAbility(ability: string) {
    return (
      <View style={styles.abilityContainer}>
        <View style={{ width: firstColWidth }}>
          <Text style={{ fontSize: 19 }}>{ability}</Text>
        </View>
        <View style={styles.inputFieldContainer}>
          <TextInput
            keyboardType="numeric"
            onChangeText={text => this.setState({ text })}
            value={`${this.props[ability]}`}
          />
        </View>
        <View style={{ width: thirdColWidth, alignItems: "center" }}>
          <Text style={{ fontSize: 19 }}>+1</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTableHeader()}
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
