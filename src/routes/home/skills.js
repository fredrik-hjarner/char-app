import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { lowerCase, capitalize } from "lodash";

import {
  Text as TextComponent,
  Grid,
  Column,
  Padding,
  TouchableOpacity
} from "components";
import { calcMod } from "utils";

type Props = {
  abilities: {
    strength: number,
    dexterityterity: number,
    constitution: number,
    intelligence: number,
    wisdomdom: number,
    charisma: number
  }
};

type State = {};

export default class App extends Component<Props, State> {
  renderHeader() {
    return (
      <Grid style={{ opacity: 0.5 }}>
        <Column width={3}>
          <TextComponent>profici</TextComponent>
        </Column>
        <Column />
        <Column width={2}>
          <TextComponent>ab </TextComponent>
        </Column>
        <Column width={8}>
          <TextComponent>total</TextComponent>
        </Column>
      </Grid>
    );
  }

  renderSkill(skill, ability: string) {
    const abScore = this.props.abilities[ability];
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
          <Text>{calcMod(abScore)}</Text>
        </Column>
        <Column />
        <Column width={1}>
          <View>
            <Text style={{ fontWeight: "bold" }}>+5</Text>
          </View>
        </Column>
        <Column />
        <Column width={8}>
          <Text>{capitalize(lowerCase(skill))}</Text>
        </Column>
        <Column width={2}>
          <Text>{ability.slice(0, 3)}</Text>
        </Column>
      </Grid>
    );
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        <Padding />
        {this.renderSkill("acrobatics", "dexterity")}
        {this.renderSkill("animalHandling", "wisdom")}
        {this.renderSkill("arcana", "dexterity")}
        {this.renderSkill("athletics", "strength")}
        {this.renderSkill("deception", "charisma")}
        {this.renderSkill("history", "intelligence")}
        {this.renderSkill("insight", "wisdom")}
        {this.renderSkill("intimidation", "charisma")}
        {this.renderSkill("investigation", "intelligence")}
        {this.renderSkill("medicine", "wisdom")}
        {this.renderSkill("nature", "intelligence")}
        {this.renderSkill("perception", "wisdom")}
        {this.renderSkill("performance", "charisma")}
        {this.renderSkill("persuasion", "charisma")}
        {this.renderSkill("religion", "intelligence")}
        {this.renderSkill("sleightOfHand", "dexterity")}
        {this.renderSkill("stealth", "dexterity")}
        {this.renderSkill("survival", "wisdom")}
      </>
    );
  }
}

const Text = ({ children, style, ...props }) => (
  <TextComponent style={[s.absolute, style]} {...props}>
    {children}
  </TextComponent>
);

const s = StyleSheet.create({ absolute: { position: "absolute" } });
