import React from "react";
import { Field } from "redux-form";

import { Text, Grid, Column } from "components";
import { TextInput } from "components/form";

export default () => {
  return (
    <Grid>
      <Column width={3} />
      <Column vc width={9}>
        <Text>Proficiency bonus:</Text>
      </Column>
      <Column vc width={3}>
        <Field
          name="proficiency-bonus"
          component={TextInput}
          keyboardType="numeric"
        />
      </Column>
    </Grid>
  );
};
