import React from "react";
import { View } from "react-native";
import { Field } from "redux-form";

import { Text, H1, Grid, Column, Padding } from "components";
import { TextInput } from "components/form";
import { calcMod } from "utils";

export default () => {
  const renderTableHeader = () => (
    <View>
      <Grid style={{ opacity: 0.5 }}>
        <Column width={6} />
        <Column width={6}>
          <Text>score</Text>
        </Column>
        <Column width={6} style={{ justifyContent: "center" }}>
          <Text>mod</Text>
        </Column>
      </Grid>
      <Padding />
    </View>
  );

  const renderAbility = (ability: string) => (
    <View>
      <Grid>
        <Column width={6} style={{ alignItems: "center" }}>
          <H1>{ability.slice(0, 3).toUpperCase()}</H1>
        </Column>
        <Column width={6} style={{ alignItems: "center" }}>
          <Field name={ability} component={TextInput} keyboardType="numeric" />
        </Column>
        <Column
          width={6}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <H1 style={{ fontWeight: "normal" }}>
            <Field
              name={ability}
              component={({ input: { value } }) => calcMod(value)}
            />
          </H1>
        </Column>
      </Grid>
      <Padding />
    </View>
  );

  return (
    <Grid>
      <Column width={8}>
        {renderTableHeader()}
        {renderAbility("strength")}
        {renderAbility("dexterity")}
        {renderAbility("constitution")}
      </Column>
      <Column />
      <Column width={9}>
        {renderTableHeader()}
        {renderAbility("intelligence")}
        {renderAbility("wisdom")}
        {renderAbility("charisma")}
      </Column>
    </Grid>
  );
};
