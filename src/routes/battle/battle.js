import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { LayoutWithHeader, LayoutWithFooter } from "layouts";
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
import { fetchHP, maxHPSelector, currentHPSelector } from "state-management/hp";
import { fetchAC, totalACSelector } from "state-management/ac";
import Weapons from "./weapons";

const iconSize = 24;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {
  maxHP: number,
  currentHP: number,
  fetchHP: Function,
  fetchAC: Function
};

const mapStateToProps = state => ({
  maxHP: maxHPSelector(state),
  currentHP: currentHPSelector(state),
  totalAC: totalACSelector(state)
});

export default connect(
  mapStateToProps,
  { fetchHP, fetchAC }
)(
  class extends PureComponent<Props> {
    componentDidMount() {
      this.props.fetchHP();
      this.props.fetchAC();
    }

    renderAC() {
      const { totalAC } = this.props;
      return (
        <InnerContainer>
          <H1>Armor class</H1>
          <Padding />
          <Grid>
            <Row vc width={9}>
              <Text>Total:</Text>
            </Row>
            <Row width={9}>
              <TextInput
                onChangeText={characterName => this.setState({ characterName })}
                value={`${totalAC}`}
              />
            </Row>
          </Grid>
        </InnerContainer>
      );
    }

    renderHP() {
      const { maxHP, currentHP } = this.props;
      return (
        <InnerContainer>
          <H1>Hit points</H1>
          <Padding />
          <Grid>
            <Row vc width={9}>
              <Text>Max:</Text>
            </Row>
            <Row width={9}>
              <TextInput
                onChangeText={characterName => this.setState({ characterName })}
                value={`${maxHP}`}
              />
            </Row>
          </Grid>
          <Padding />
          <Grid>
            <Row vc width={9}>
              <Text>Current:</Text>
            </Row>
            <Row width={9}>
              <TextInput
                onChangeText={characterName => this.setState({ characterName })}
                value={`${currentHP}`}
              />
            </Row>
          </Grid>
        </InnerContainer>
      );
    }

    render() {
      const actions = [
        { text: "Load", callback: this.load, icon: loadIcon },
        { text: "Save", callback: this.save, icon: saveIcon }
      ];
      return (
        <LayoutWithHeader>
          <LayoutWithFooter actions={actions}>
            <ScrollView>
              <Container>
                <Grid>
                  <Row width={8}>{this.renderHP()}</Row>
                  <Row />
                  <Row width={9}>{this.renderAC()}</Row>
                </Grid>
                <Weapons />
                <FreeTextNotes />
              </Container>
            </ScrollView>
          </LayoutWithFooter>
        </LayoutWithHeader>
      );
    }
  }
);
