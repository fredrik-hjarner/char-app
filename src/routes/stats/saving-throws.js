import React from "react";
import { View, StyleSheet } from "react-native";
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
  function renderSkill(skill) {
    const abScore = abilities[skill];
    const abBonus = calcMod(abScore);
    return (
      <Grid>
        <Column width={8}>
          <Text>{skill.slice(0, 3).toUpperCase()}</Text>
        </Column>
        <Column width={5}>
          <Field name={skill} component={Checkbox} />
        </Column>
        <Column width={4}>
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
      <H1>Saving throws</H1>
      <Padding />
      <Padding />
      <Grid>
        <Column width={5}>
          {renderSkill("strength")}
          {renderSkill("intelligence")}
        </Column>
        <Column />
        <Column width={5}>
          {renderSkill("dexterity")}
          {renderSkill("wisdom")}
        </Column>
        <Column />
        <Column width={5}>
          {renderSkill("constitution")}
          {renderSkill("charisma")}
        </Column>
      </Grid>
    </>
  );
};

const Text = ({ children, style, ...props }) => (
  <TextComponent style={[s.absolute, style]} {...props}>
    {children}
  </TextComponent>
);

const s = StyleSheet.create({ absolute: { position: "absolute" } });
