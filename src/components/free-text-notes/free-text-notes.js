import React, { PureComponent } from "react";

import { H1, Padding, TextArea, InnerContainer } from "components";

type Props = {};

export default class extends PureComponent<Props> {
  render() {
    return (
      <InnerContainer>
        <H1>Free text/notes:</H1>
        <Padding />
        <TextArea />
      </InnerContainer>
    );
  }
}
