import React, { PureComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { connect } from "react-redux";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { KeyValueService } from "api";
import { Menu, Text } from "components";
import { LayoutWithFooter, LayoutWithHeader } from "layouts";
import { fetchAbilities, abilitiesSelector } from "state-management/abilities";
import Abilities from "./abilities";

const iconSize = 24;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {
  abilities: object,
  fetchAbilities: Function
};

type State = {
  abilities: {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  }
};

const mapStateToProps = state => ({
  abilities: abilitiesSelector(state)
});

export default connect(
  mapStateToProps,
  { fetchAbilities }
)(
  class extends PureComponent<Props, State> {
    state = {
      abilities: {
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1
      }
    };

    componentDidMount() {
      this.props.fetchAbilities();
    }

    save = () => {
      if (!this.abilities) {
        return;
      }
      KeyValueService.setValue(
        "bruno/abilities",
        JSON.stringify(this.abilities)
      )
        .then(() => console.log("saved!"))
        .catch(exception => console.log("exception:", exception, ""));
    };

    handleAbilityChange = (abilities: object) => (this.abilities = abilities);

    render() {
      const { abilities } = this.state;
      const actions = [
        { text: "Load", callback: () => {}, icon: loadIcon },
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
