import React from "react";
import { View, StyleSheet } from "react-native";
import { lowerCase, capitalize } from "lodash";
import { Field } from "redux-form";

import { Text as TextComponent, Grid, Column, Padding } from "components";
import { Checkbox } from "components/form";
import { calcMod, plusOrMinus } from "utils";

type Props = {
  abilities: {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  }
};

export default ({ abilities }: Props) => {
  function renderHeader() {
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

  function renderSkill(skill, ability: string) {
    const abScore = abilities[ability];
    // TODO: take proficiency from redux state.
    const proficiency = 2;
    const abBonus = calcMod(abScore);
    return (
      <Grid>
        <Column width={1}>
          <Field name={skill} component={Checkbox} />
        </Column>
        <Column />
        <Column width={1}>
          <Text>
            <Field
              name={skill}
              component={({ input: { value } }) =>
                value ? `+${proficiency}` : ""
              }
            />
          </Text>
        </Column>
        <Column />
        <Column width={1}>
          <Text>{plusOrMinus(abBonus)}</Text>
        </Column>
        <Column />
        <Column width={1}>
          <View>
            <Text style={{ fontWeight: "bold" }}>
              <Field
                name={skill}
                component={({ input: { value } }) => {
                  const total = value
                    ? parseInt(abBonus, 10) + parseInt(proficiency, 10)
                    : abBonus;
                  return plusOrMinus(total);
                }}
              />
            </Text>
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

  return (
    <>
      {renderHeader()}
      <Padding />
      {renderSkill("acrobatics", "dexterity")}
      {renderSkill("animalHandling", "wisdom")}
      {renderSkill("arcana", "dexterity")}
      {renderSkill("athletics", "strength")}
      {renderSkill("deception", "charisma")}
      {renderSkill("history", "intelligence")}
      {renderSkill("insight", "wisdom")}
      {renderSkill("intimidation", "charisma")}
      {renderSkill("investigation", "intelligence")}
      {renderSkill("medicine", "wisdom")}
      {renderSkill("nature", "intelligence")}
      {renderSkill("perception", "wisdom")}
      {renderSkill("performance", "charisma")}
      {renderSkill("persuasion", "charisma")}
      {renderSkill("religion", "intelligence")}
      {renderSkill("sleightOfHand", "dexterity")}
      {renderSkill("stealth", "dexterity")}
      {renderSkill("survival", "wisdom")}
    </>
  );
};

const Text = ({ children, style, ...props }) => (
  <TextComponent style={[s.absolute, style]} {...props}>
    {children}
  </TextComponent>
);

const s = StyleSheet.create({ absolute: { position: "absolute" } });
