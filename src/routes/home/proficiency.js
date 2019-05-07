import React from "react";
import { View, StyleSheet } from "react-native";
import { lowerCase, capitalize } from "lodash";
import { Field } from "redux-form";

import { Text, Grid, Column, Padding } from "components";
import { TextInput } from "components/form";

export default () => {
  return (
    <Grid>
      <Column vc width={9}>
        <Text>Proficiency bonus:</Text>
      </Column>
      <Column vc width={9}>
        <Field
          name="proficiency-bonus"
          component={TextInput}
          keyboardType="numeric"
        />
      </Column>
    </Grid>
  );
};
