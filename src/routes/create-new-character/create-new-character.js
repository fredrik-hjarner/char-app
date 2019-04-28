import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

import { Text } from "components";
import { TextInput } from "components/form";
import { LayoutWithFooter } from "layouts";
import { createNewCharacter } from "state-management/character";
import { goBack } from "state-management/navigation";

const formName = "create-new-character";
const selector = formValueSelector(formName);

const iconSize = 20;
const cancelIcon = (
  <SimpleLineIconsIcon name="action-undo" color="white" size={iconSize} />
);
const createIcon = (
  <MaterialCommunityIcon name="account-plus" color="white" size={iconSize} />
);

type Props = {
  characterName: string,
  createNewCharacter: Function,
  goBack: Function
};

const mapStateToProps = state => ({
  characterName: selector(state, "characterName")
});

@connect(
  mapStateToProps,
  { createNewCharacter, goBack }
)
@reduxForm({
  form: formName
})
export default class extends Component<Props> {
  cancel = () => this.props.goBack();

  create = () => this.props.createNewCharacter(this.props.characterName);

  render() {
    const actions = [
      { text: "Cancel", callback: this.cancel, icon: cancelIcon },
      { text: "Create", callback: this.create, icon: createIcon }
    ];
    return (
      <LayoutWithFooter actions={actions}>
        <View style={styles.container}>
          <Text>Create new character</Text>
          <Text>Choose a name:</Text>
          <Field name="characterName" component={TextInput} />
        </View>
      </LayoutWithFooter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
