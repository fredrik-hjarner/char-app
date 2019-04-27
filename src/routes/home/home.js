import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { LayoutWithFooter, LayoutWithHeader } from "layouts";
import {
  fetchAbilities,
  saveAbilities,
  abilitiesSelector
} from "state-management/abilities";
import Abilities from "./abilities";

const iconSize = 20;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {
  abilities: {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  },
  fetchAbilities: Function,
  saveAbilities: Function
};

const mapStateToProps = state => ({
  abilities: abilitiesSelector(state)
});

export default connect(
  mapStateToProps,
  { fetchAbilities, saveAbilities }
)(
  class extends PureComponent<Props> {
    componentDidMount() {
      this.props.fetchAbilities();
    }

    load = () => {
      this.props.fetchAbilities();
    };

    save = () => {
      if (!this.abilities) {
        console.log("home: save: !this.abilities. wont save.");
        return;
      }
      this.props.saveAbilities(this.abilities);
    };

    handleAbilityChange = (abilities: Object) => (this.abilities = abilities);

    render() {
      const { abilities } = this.props;
      const actions = [
        { text: "Load", callback: this.load, icon: loadIcon },
        { text: "Save", callback: this.save, icon: saveIcon }
      ];
      return (
        <LayoutWithHeader>
          <LayoutWithFooter actions={actions}>
            <View style={styles.container}>
              <Abilities {...abilities} onChange={this.handleAbilityChange} />
            </View>
          </LayoutWithFooter>
        </LayoutWithHeader>
      );
    }
  }
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
