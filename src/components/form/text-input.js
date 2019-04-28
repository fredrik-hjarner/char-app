import React from "react";

import { TextInput } from "components";

export default ({ input: { value, onChange }, ...props }) => (
  <TextInput onChangeText={onChange} value={value} {...props} />
);
