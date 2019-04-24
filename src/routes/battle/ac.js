import React, { PureComponent } from "react";

import {
  Text,
  H1,
  InnerContainer,
  Grid,
  Row,
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
    console.log("AC: this.state:", this.state, "");
    const { total } = this.state.AC;
    return (
      <InnerContainer>
        <H1>Armor class</H1>
        <Padding />
        <Grid>
          <Row vc width={9}>
            <Text>Total:</Text>
          </Row>
          <Row width={9}>
            <TextInput onChangeText={this.handleTotalACChange} value={total} />
          </Row>
        </Grid>
      </InnerContainer>
    );
  }
}
