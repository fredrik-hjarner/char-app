import React from "react";

import { TextArea } from "components";

export default ({ input: { value, onChange }, ...props }) => (
  <TextArea onChangeText={onChange} value={value} {...props} />
);
