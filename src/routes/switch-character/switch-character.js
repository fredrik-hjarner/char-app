import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

import { Text, H1, Padding } from "components";
import { LayoutWithFooter } from "layouts";
import {
  fetchCharacterIndex,
  characterIndexSelector,
  setActiveCharacter,
  activeCharacterSelector
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
  characterIndex: [string],
  activeCharacter: string | null
};

const mapStateToProps = state => ({
  characterIndex: characterIndexSelector(state),
  activeCharacter: activeCharacterSelector(state)
});

export default connect(
  mapStateToProps,
  { goBack, pushRoute, fetchCharacterIndex, setActiveCharacter }
)(
  class extends PureComponent<Props> {
    componentDidMount() {
      this.props.fetchCharacterIndex();
    }

    cancel = () => this.props.goBack();

    switchCharacter = (character: string) => {
      this.props.setActiveCharacter(character);
      this.props.pushRoute("Home");
    };

    render() {
      const { characterIndex, activeCharacter } = this.props;
      const actions = activeCharacter
        ? [{ text: "Cancel", callback: this.cancel, icon: cancelIcon }]
        : undefined;
      return (
        <LayoutWithFooter actions={actions}>
          <View style={styles.container}>
            <H1>Choose character</H1>
            <Padding />
            <Padding />
            {characterIndex.map(char => (
              <TouchableOpacity onPress={() => this.switchCharacter(char)}>
                <Text>{char}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </LayoutWithFooter>
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
