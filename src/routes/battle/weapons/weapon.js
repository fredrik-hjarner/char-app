import React, { PureComponent } from "react";
import { View } from "react-native";

import { P, InnerContainer, Grid, Row, TextInput, Padding } from "components";

type Props = {
  weapon: {
    attackBonus: string,
    damage: string,
    range: string,
    type: string,
    weapon: string
  },
  onChange: Function
};

type State = {
  weapon: {
    attackBonus: string,
    damage: string,
    range: string,
    type: string,
    weapon: string
  }
};

export default class extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { attackBonus, damage, range, type, weapon } = props.weapon;
    this.state = { weapon: { attackBonus, damage, range, type, weapon } };
  }

  componentDidUpdate(prevProps, prevState) {
    // if I changed state dont overwrite them with props.
    if (this.state === prevState) {
      this.copyPropsToState();
    }
  }

  copyPropsToState() {
    const {
      weapon: { attackBonus, damage, range, type, weapon }
    } = this.props;
    this.setState({
      weapon: { attackBonus, damage, range, type, weapon }
    });
  }

  handleChange = (key: string) => (value: string) => {
    this.setState(
      ({ weapon }) => ({ weapon: { ...weapon, [key]: value } }),
      () => this.props.onChange(this.state.weapon)
    );
  };

  render() {
    const { attackBonus, damage, range, type, weapon } = this.state.weapon;
    return (
      <InnerContainer>
        <Grid>
          <Row width={11}>
            <View>
              <P>Weapon name:</P>
              <TextInput
                style={{ width: 1000 }}
                onChangeText={this.handleChange("weapon")}
                value={weapon}
              />
            </View>
          </Row>
          <Row />
          <Row width={6}>
            <P>Type:</P>
            <TextInput onChangeText={this.handleChange("type")} value={type} />
          </Row>
        </Grid>
        <Padding />
        <Grid>
          <Row width={4}>
            <View>
              <P>Range:</P>
              <TextInput
                onChangeText={this.handleChange("range")}
                value={range}
              />
            </View>
          </Row>
          <Row />
          <Row width={6}>
            <View>
              <P>Attack bonus:</P>
              <TextInput
                onChangeText={this.handleChange("attackBonus")}
                value={attackBonus}
              />
            </View>
          </Row>
          <Row />
          <Row width={6}>
            <View>
              <P>Damage:</P>
              <TextInput
                onChangeText={this.handleChange("damage")}
                value={damage}
              />
            </View>
          </Row>
        </Grid>
      </InnerContainer>
    );
  }
}
