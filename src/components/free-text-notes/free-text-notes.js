import React, { PureComponent } from "react";

import { B, Padding, TextArea, InnerContainer } from "components";

type Props = {};

export default class extends PureComponent<Props> {
  render() {
    return (
      <InnerContainer>
        <B>Free text/notes</B>
        <Padding />
        <TextArea />
      </InnerContainer>
    );
  }
}
