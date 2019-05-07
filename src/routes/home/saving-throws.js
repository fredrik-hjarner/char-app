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
        <Column width={4}>
          <TextComponent>profici</TextComponent>
        </Column>
        <Column width={8}>
          <TextComponent>total</TextComponent>
        </Column>
      </Grid>
    );
  }

  function renderSkill(skill) {
    const abScore = abilities[skill];
    // TODO: take proficiency from redux state.
    const proficiency = 2;
    const abBonus = calcMod(abScore);
    return (
      <Grid>
        <Column width={3}>
          <Field name={skill} component={Checkbox} />
        </Column>
        <Column />
        <Column width={3}>
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
      </Grid>
    );
  }

  return (
    <>
      {renderHeader()}
      <Padding />
      <Grid>
        <Column width={9}>
          {renderSkill("strength")}
          {renderSkill("dexterity")}
          {renderSkill("constitution")}
        </Column>
        <Column />
        <Column width={8}>
          {renderSkill("intelligence")}
          {renderSkill("wisdom")}
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
