import React, { PureComponent } from "react";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

import { Text, TextInput } from "components";
import { LayoutWithFooter, LayoutWithHeader } from "layouts";
import {
  createNewCharacter,
  fetchCharacterIndex,
  characterIndexSelector,
  setActiveCharacter,
} from "state-management/character";
import { goBack, pushRoute } from "state-management/navigation";

const iconSize = 24;
const cancelIcon = (
  <SimpleLineIconsIcon name="action-undo" color="white" size={iconSize} />
);

type Props = {
  goBack: Function,
  pushRoute: Function,
  fetchCharacterIndex: Function,
  setActiveCharacter: Function,
  characterIndex: [string]
};

const mapStateToProps = state => ({
  characterIndex: characterIndexSelector(state),
});

export default connect(
  mapStateToProps,
  { goBack, pushRoute, fetchCharacterIndex, setActiveCharacter },
)(
  class extends PureComponent<Props, State> {
    componentDidMount() {
      this.props.fetchCharacterIndex();
    }

    cancel = () => this.props.goBack();

    switchCharacter = (character: string) => {
      this.props.setActiveCharacter(character);
      this.props.pushRoute("Home");
    };

    render() {
      const { characterIndex } = this.props;
      const actions = [
        { text: "Cancel", callback: this.cancel, icon: cancelIcon },
      ];
      return (
        <LayoutWithFooter actions={actions}>
          <View style={styles.container}>
            <Text>Switch character</Text>
            {characterIndex.map(char => (
              <TouchableOpacity onPress={() => this.switchCharacter(char)}>
                <Text>{char}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </LayoutWithFooter>
      );
    }
  },
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
