import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

import { Text, TextInput } from "components";
import { LayoutWithFooter } from "layouts";
import { createNewCharacter } from "state-management/character";
import { goBack } from "state-management/navigation";

const iconSize = 20;
const cancelIcon = (
  <SimpleLineIconsIcon name="action-undo" color="white" size={iconSize} />
);
const createIcon = (
  <MaterialCommunityIcon name="account-plus" color="white" size={iconSize} />
);

type Props = {
  createNewCharacter: Function,
  goBack: Function
};

type State = { characterName: string };

export default connect(
  null,
  { createNewCharacter, goBack }
)(
  class extends PureComponent<Props, State> {
    state = { characterName: "" };

    cancel = () => this.props.goBack();

    create = () => this.props.createNewCharacter(this.state.characterName);

    render() {
      const { characterName } = this.state;
      const actions = [
        { text: "Cancel", callback: this.cancel, icon: cancelIcon },
        { text: "Create", callback: this.create, icon: createIcon }
      ];
      return (
        <LayoutWithFooter actions={actions}>
          <View style={styles.container}>
            <Text>Create new character</Text>
            <Text>Choose a name:</Text>
            <TextInput
              onChangeText={characterName => this.setState({ characterName })}
              value={characterName}
            />
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
