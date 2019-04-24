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
import { fetchHP, saveHP, HPSelector } from "state-management/hp";
import { fetchAC, totalACSelector } from "state-management/ac";
import { fetchWeapons, weaponsSelector } from "state-management/weapons";
import Weapons from "./weapons";
import HP from "./hp";

const iconSize = 24;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {
  HP: {
    maxHP: number,
    currentHP: number
  },
  fetchHP: Function,
  saveHP: Function,
  fetchAC: Function,
  fetchWeapons: Function
};

const mapStateToProps = state => ({
  HP: HPSelector(state),
  totalAC: totalACSelector(state),
  weapons: weaponsSelector(state)
});

export default connect(
  mapStateToProps,
  { fetchHP, saveHP, fetchAC, fetchWeapons }
)(
  class extends PureComponent<Props> {
    HP: ?string;

    componentDidMount() {
      this.props.fetchHP();
      this.props.fetchAC();
      this.props.fetchWeapons();
    }

    loadHP = () => {
      this.props.fetchHP();
    };

    saveHP = () => {
      if (!this.HP) {
        console.log("home: save: !this.hp. wont save.");
        return;
      }
      this.props.saveHP(this.HP);
    };

    handleHPChange = (hp: Object) => (this.HP = hp);

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

    render() {
      const { weapons } = this.props;
      const actions = [
        { text: "Load HP", callback: this.loadHP, icon: loadIcon },
        { text: "Save HP", callback: this.saveHP, icon: saveIcon }
      ];
      return (
        <LayoutWithHeader>
          <LayoutWithFooter actions={actions}>
            <ScrollView>
              <Container>
                <Grid>
                  <Row width={8}>
                    <HP HP={this.props.HP} onChange={this.handleHPChange} />
                  </Row>
                  <Row />
                  <Row width={9}>{this.renderAC()}</Row>
                </Grid>
                <Weapons weapons={weapons} />
                <FreeTextNotes />
              </Container>
            </ScrollView>
          </LayoutWithFooter>
        </LayoutWithHeader>
      );
    }
  }
);
