import React from "react";
import { View, StyleSheet } from "react-native";
import { lowerCase, capitalize } from "lodash";
import { Field } from "redux-form";

import { Text as TextComponent, Grid, Column, Padding, H1 } from "components";
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
  },
  proficiencyBonus: string
};

export default ({ abilities, proficiencyBonus }: Props) => {
  function renderSkill(skill, ability: string) {
    const abScore = abilities[ability];
    const abBonus = calcMod(abScore);
    return (
      <Grid>
        <Column width={7}>
          <Text>{capitalize(lowerCase(skill))}</Text>
        </Column>
        <Column />
        <Column width={1}>
          <Field name={skill} component={Checkbox} />
        </Column>

        <Column />
        <Column width={1}>
          <View>
            <Text style={{ fontWeight: "bold" }}>
              <Field
                name={skill}
                component={({ input: { value } }) => {
                  const total = value
                    ? parseInt(abBonus, 10) + parseInt(proficiencyBonus, 10)
                    : abBonus;
                  return plusOrMinus(total);
                }}
              />
            </Text>
          </View>
        </Column>
      </Grid>
    );
  }

  return (
    <>
      <H1>Skills</H1>
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
