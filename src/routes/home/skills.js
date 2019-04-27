import React, { Component } from "react";
import { lowerCase, capitalize } from "lodash";

import { Text, Grid, Column, Padding, TouchableOpacity } from "components";

type Props = {};

type State = {};

export default class App extends Component<Props, State> {
  renderHeader() {
    return (
      <Grid style={{ opacity: 0.5 }}>
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
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "hsl(0, 0%, 50%)",
              height: 23,
              width: 20,
              marginBottom: 3,
              borderRadius: 3,
              padding: 0,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ margin: 0, padding: 0 }}>X</Text>
          </TouchableOpacity>
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
