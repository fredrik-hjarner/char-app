import React, { PureComponent } from "react";
import { View } from "react-native";

import {
  P,
  H1,
  InnerContainer,
  Grid,
  Row,
  TextInput,
  Padding
} from "components";

type Props = {};

export default class extends PureComponent<Props> {
  renderWeapon() {
    return (
      <InnerContainer>
        <Grid>
          <Row width={11}>
            <View>
              <P>Weapon name:</P>
              <TextInput style={{ width: 1000 }} />
            </View>
          </Row>
          <Row />
          <Row width={6}>
            <P>Type:</P>
            <TextInput />
          </Row>
        </Grid>
        <Padding />
        <Grid>
          <Row width={4}>
            <View>
              <P>Range:</P>
              <TextInput />
            </View>
          </Row>
          <Row />
          <Row width={6}>
            <View>
              <P>Attack bonus:</P>
              <TextInput />
            </View>
          </Row>
          <Row />
          <Row width={6}>
            <View>
              <P>Damage:</P>
              <TextInput />
            </View>
          </Row>
        </Grid>
      </InnerContainer>
    );
  }

  render() {
    return (
      <>
        <H1>Weapons</H1>
        <Padding />
        {this.renderWeapon()}
        {this.renderWeapon()}
      </>
    );
  }
}
