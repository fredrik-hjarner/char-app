import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { KeyValueService } from "api";
import { LayoutWithFooter, LayoutWithHeader } from "layouts";
import { fetchAbilities, abilitiesSelector } from "state-management/abilities";
import Abilities from "./abilities";

const iconSize = 24;
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
  fetchAbilities: Function
};

const mapStateToProps = state => ({
  abilities: abilitiesSelector(state)
});

export default connect(
  mapStateToProps,
  { fetchAbilities }
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
        return;
      }
      KeyValueService.setValue(
        "bruno/abilities",
        JSON.stringify(this.abilities)
      )
        .then(() => console.log("saved!"))
        .catch(exception => console.log("exception:", exception, ""));
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
