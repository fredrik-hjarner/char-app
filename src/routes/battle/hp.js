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
  HP: { maxHP: string, currentHP: string }
};

type State = {
  HP: { maxHP: string, currentHP: string }
};

export default class extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      HP: { maxHP, currentHP }
    } = props;
    this.state = {
      HP: { maxHP, currentHP }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // if I changed state dont overwrite them with props.
    if (this.state === prevState) {
      this.copyPropsToState();
    }
  }

  copyPropsToState() {
    const {
      HP: { maxHP, currentHP }
    } = this.props;
    this.setState({
      HP: { maxHP, currentHP }
    });
  }

  handleMaxHPChange = (maxHP: string) => {
    this.setState(
      ({ HP }) => ({ HP: { ...HP, maxHP } }),
      () => this.props.onChange(this.state.HP)
    );
  };

  handleCurrentHPChange = (currentHP: string) => {
    this.setState(
      ({ HP }) => ({ HP: { ...HP, currentHP } }),
      () => this.props.onChange(this.state.HP)
    );
  };

  render() {
    console.log("HP: this.state:", this.state, "");
    const { maxHP, currentHP } = this.state.HP;
    return (
      <InnerContainer>
        <H1>Hit points</H1>
        <Padding />
        <Grid>
          <Row vc width={9}>
            <Text>Max:</Text>
          </Row>
          <Row width={9}>
            <TextInput onChangeText={this.handleMaxHPChange} value={maxHP} />
          </Row>
        </Grid>
        <Padding />
        <Grid>
          <Row vc width={9}>
            <Text>Current:</Text>
          </Row>
          <Row width={9}>
            <TextInput
              onChangeText={this.handleCurrentHPChange}
              value={currentHP}
            />
          </Row>
        </Grid>
      </InnerContainer>
    );
  }
}
