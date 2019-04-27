import React, { Component } from "react";
import { View } from "react-native";
import { lowerCase, capitalize } from "lodash";

import { Text, TextInput, H1, Grid, Column, Padding } from "components";

type Props = {
  onChange: Function
};

type State = {};

export default class App extends Component<Props, State> {
  renderHeader() {
    return (
      <Grid>
        <Column width={3}>
          <Text>profici</Text>
        </Column>
        <Column />
        <Column width={2}>
          <Text>ab </Text>
        </Column>
        <Column width={8}>
          <Text>total</Text>
        </Column>
      </Grid>
    );
  }

  renderSkill(skill, ability: string) {
    return (
      <Grid>
        <Column width={1}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              height: 22,
              width: 18,
              marginBottom: 2,
              borderRadius: 2,
              padding: 0,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ margin: 0, padding: 0 }}>x</Text>
          </View>
        </Column>
        <Column />
        <Column width={1}>
          <Text>2</Text>
        </Column>
        <Column />
        <Column width={1}>
          <Text>3</Text>
        </Column>
        <Column />
        <Column width={1}>
          <Text>5</Text>
        </Column>
        <Column />
        <Column width={8}>
          <Text>{capitalize(lowerCase(skill))}</Text>
        </Column>
        <Column width={2}>
          <Text>{ability}</Text>
        </Column>
      </Grid>
    );
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        <Padding />
        {this.renderSkill("acrobatics", "dex")}
        {this.renderSkill("animalHandling", "wis")}
        {this.renderSkill("arcana", "dex")}
        {this.renderSkill("athletics", "str")}
        {this.renderSkill("deception", "cha")}
        {this.renderSkill("history", "int")}
        {this.renderSkill("insight", "wis")}
        {this.renderSkill("intimidation", "cha")}
        {this.renderSkill("investigation", "int")}
        {this.renderSkill("medicine", "wis")}
        {this.renderSkill("nature", "int")}
        {this.renderSkill("perception", "wis")}
        {this.renderSkill("performance", "cha")}
        {this.renderSkill("persuasion", "cha")}
        {this.renderSkill("religion", "int")}
        {this.renderSkill("sleightOfHand", "dex")}
        {this.renderSkill("stealth", "dex")}
        {this.renderSkill("survival", "wis")}
      </>
    );
  }
}
