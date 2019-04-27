import React, { Component } from "react";
import { View } from "react-native";

import { Text, TextInput, H1, Grid, Column, Padding } from "components";

type Props = {
  strength: number,
  dexterity: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number,

  onChange: Function
};

type State = {
  strength: number,
  dexterity: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number
};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma
    } = props;
    this.state = {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma
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
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma
    } = this.props;
    this.setState({
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma
    });
  }

  changeAbility = (ability: string, value: string) => {
    this.setState({ [ability]: value }, () => this.props.onChange(this.state));
  };

  calcMod(ability) {
    const diff = parseInt(ability, 10) - 10;
    const mod = Math.round((diff - 1) / 2);
    if (mod > 0) {
      return `+${mod}`;
    }
    return `${mod}`;
  }

  renderTableHeader() {
    return (
      <>
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
      </>
    );
  }

  renderAbility(ability: string) {
    return (
      <>
        <Grid>
          <Column width={6} style={{ alignItems: "center" }}>
            <H1>{ability.slice(0, 3).toUpperCase()}</H1>
          </Column>
          <Column width={6} style={{ alignItems: "center" }}>
            <TextInput
              keyboardType="numeric"
              onChangeText={text => this.changeAbility(ability, text)}
              value={this.state[ability]}
            />
          </Column>
          <Column
            width={6}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <H1 style={{ fontWeight: "normal" }}>
              {this.calcMod(this.state[ability])}
            </H1>
          </Column>
        </Grid>
        <Padding />
      </>
    );
  }

  renderAbilities() {
    return (
      <>
        {this.renderTableHeader()}
        {this.renderAbility("strength")}
        {this.renderAbility("dexterity")}
        {this.renderAbility("constitution")}
        {this.renderAbility("intelligence")}
        {this.renderAbility("wisdom")}
        {this.renderAbility("charisma")}
      </>
    );
  }

  render() {
    return (
      <View>
        <Grid>
          <Column width={9}>{this.renderAbilities()}</Column>
        </Grid>
      </View>
    );
  }
}
