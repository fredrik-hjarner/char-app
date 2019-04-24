import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { LayoutWithHeader, LayoutWithFooter } from "layouts";
import { Container, FreeTextNotes, Grid, Row } from "components";
import { fetchHP, saveHP, HPSelector } from "state-management/hp";
import { fetchAC, saveAC, ACSelector } from "state-management/ac";
import { fetchWeapons, weaponsSelector } from "state-management/weapons";
import Weapons from "./weapons";
import HP from "./hp";
import AC from "./ac";

const iconSize = 24;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {
  HP: {
    maxHP: string,
    currentHP: string
  },
  AC: { total: string },
  fetchHP: Function,
  saveHP: Function,
  fetchAC: Function,
  saveAC: Function,
  fetchWeapons: Function
};

const mapStateToProps = state => ({
  HP: HPSelector(state),
  AC: ACSelector(state),
  weapons: weaponsSelector(state)
});

export default connect(
  mapStateToProps,
  { fetchHP, saveHP, fetchAC, saveAC, fetchWeapons }
)(
  class extends Component<Props> {
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
        console.log("home: save: !this.HP. wont save.");
        return;
      }
      this.props.saveHP(this.HP);
    };

    handleHPChange = (hp: Object) => (this.HP = hp);

    loadAC = () => {
      this.props.fetchAC();
    };

    saveAC = () => {
      if (!this.AC) {
        console.log("home: save: !this.AC. wont save.");
        return;
      }
      this.props.saveAC(this.AC);
    };

    handleACChange = (ac: Object) => (this.AC = ac);

    render() {
      const { weapons } = this.props;
      const actions = [
        { text: "Load HP", callback: this.loadHP, icon: loadIcon },
        { text: "Save HP", callback: this.saveHP, icon: saveIcon },
        { text: "Load AC", callback: this.loadAC, icon: loadIcon },
        { text: "Save AC", callback: this.saveAC, icon: saveIcon }
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
                  <Row width={9}>
                    <AC AC={this.props.AC} onChange={this.handleACChange} />
                  </Row>
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
