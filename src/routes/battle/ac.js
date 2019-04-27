import React, { PureComponent } from "react";

import {
  Text,
  B,
  InnerContainer,
  Grid,
  Column,
  TextInput,
  Padding
} from "components";

type Props = {
  AC: { total: string },
  onChange: Function
};

type State = {
  AC: { total: string }
};

export default class extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      AC: { total }
    } = props;
    this.state = { AC: { total } };
  }

  componentDidUpdate(prevProps, prevState) {
    // if I changed state dont overwrite them with props.
    if (this.state === prevState) {
      this.copyPropsToState();
    }
  }

  copyPropsToState() {
    const {
      AC: { total }
    } = this.props;
    this.setState({ AC: { total } });
  }

  handleTotalACChange = (total: string) => {
    this.setState(
      ({ AC }) => ({ ...AC, AC: { total } }),
      () => this.props.onChange(this.state.AC)
    );
  };

  render() {
    const { total } = this.state.AC;
    return (
      <InnerContainer>
        <B>Armor class</B>
        <Padding />
        <Grid>
          <Column vc width={9}>
            <Text>Total:</Text>
          </Column>
          <Column width={9}>
            <TextInput onChangeText={this.handleTotalACChange} value={total} />
          </Column>
        </Grid>
      </InnerContainer>
    );
  }
}
