import React, { PureComponent } from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { KeyValueService } from "api";
import { Text, H1, Container, Padding } from "components";
import { LayoutWithHeader, LayoutWithFooter } from "layouts";

const iconSize = 24;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {};

type State = {
  keys: [string]
};

export default class extends PureComponent<Props, State> {
  state = { keys: [] };

  componentDidMount() {
    this.getAllKeys();
  }

  deleteOneValue = () =>
    KeyValueService.deleteOneValue("bruno/abilities")
      .then(this.getAllKeys)
      .catch(exception => console.log("exception:", exception, ""));

  deleteAllValues = () =>
    KeyValueService.deleteAllValues()
      .then(this.getAllKeys)
      .catch(exception => console.log("exception:", exception, ""));

  getAllKeys = () =>
    KeyValueService.getAllKeys()
      .then(keys => this.setState({ keys }))
      .catch(exception => console.log("exception:", exception, ""));

  renderKeys() {
    const { keys } = this.state;
    return keys.map(k => <Text>* {k}</Text>);
  }

  render() {
    const actions = [
      { text: "New value", callback: this.createValue, icon: loadIcon },
      { text: "Delete", callback: this.deleteOneValue, icon: loadIcon },
      { text: "Clear", callback: this.deleteAllValues, icon: saveIcon }
    ];
    return (
      <LayoutWithHeader>
        <LayoutWithFooter actions={actions}>
          <Container>
            <H1>List of all keys</H1>
            <Padding />
            {this.renderKeys()}
          </Container>
        </LayoutWithFooter>
      </LayoutWithHeader>
    );
  }
}
