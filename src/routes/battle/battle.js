import React, { PureComponent } from "react";

import { LayoutWithHeader } from "layouts";
import {
  Text,
  H1,
  Container,
  FreeTextNotes,
  InnerContainer,
  Grid,
  Row,
  TextInput,
  Padding
} from "components";

type Props = {};

export default class extends PureComponent<Props> {
  renderAC() {
    return (
      <InnerContainer>
        <H1>Armor class</H1>
        <Padding />
        <Grid>
          <Row vc width={6}>
            <Text>Total:</Text>
          </Row>
          <Row width={6}>
            <TextInput
              onChangeText={characterName => this.setState({ characterName })}
              value={1}
            />
          </Row>
        </Grid>
      </InnerContainer>
    );
  }

  renderWeapons() {
    return (
      <InnerContainer>
        <H1>Weapons</H1>
        <Padding />
      </InnerContainer>
    );
  }

  renderHP() {
    return (
      <InnerContainer>
        <H1>Hit points:</H1>
        <Padding />
        <Grid>
          <Row vc width={6}>
            <Text>Max:</Text>
          </Row>
          <Row width={6}>
            <TextInput
              onChangeText={characterName => this.setState({ characterName })}
              value={1}
            />
          </Row>
        </Grid>
        <Padding />
        <Grid>
          <Row vc width={6}>
            <Text>Current:</Text>
          </Row>
          <Row width={6}>
            <TextInput
              onChangeText={characterName => this.setState({ characterName })}
              value={1}
            />
          </Row>
        </Grid>
      </InnerContainer>
    );
  }

  render() {
    return (
      <LayoutWithHeader>
        <Container>
          <Grid>
            <Row width={5}>{this.renderHP()}</Row>
            <Row width={2} />
            <Row width={5}>{this.renderAC()}</Row>
          </Grid>
          {this.renderWeapons()}
          <FreeTextNotes />
        </Container>
      </LayoutWithHeader>
    );
  }
}
