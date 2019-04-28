import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { Text, TextInput, H1, Padding, Container } from "components";
import { LayoutWithFooter } from "layouts";
import { createNewCharacter } from "state-management/character";
import { goBack } from "state-management/navigation";

const iconSize = 20;
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
        { text: "Create", callback: this.create, icon: createIcon }
      ];
      return (
        <LayoutWithFooter actions={actions}>
          <Container style={styles.container}>
            <H1>Create new character</H1>
            <Padding big />
            <Text>
              There are currently no characters in the App. Create a new one.
            </Text>
            <Padding big />
            <Text>Choose a name:</Text>
            <TextInput
              onChangeText={characterName => this.setState({ characterName })}
              value={characterName}
            />
          </Container>
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
