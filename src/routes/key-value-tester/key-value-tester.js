import React, { PureComponent } from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";

import { KeyValueService } from "api";
import { B, H1, Container, Padding } from "components";
import { LayoutWithHeader, LayoutWithFooter } from "layouts";
import { keysSelector, fetchAllPairs } from "state-management/key-value-pairs";

const iconSize = 20;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {
  keys: [string]
};

type State = {};

const mapStateToProps = state => ({
  keys: keysSelector(state)
});

@connect(
  mapStateToProps,
  { fetchAllPairs }
)
export default class extends PureComponent<Props, State> {
  componentDidMount() {
    this.props.fetchAllPairs();
  }

  deleteOneValue = () =>
    KeyValueService.deleteOneValue("bruno/abilities")
      .then(this.getAllKeys)
      .catch(exception => console.log("exception:", exception, ""));

  deleteAllValues = () =>
    KeyValueService.deleteAllValues()
      .then(this.getAllKeys)
      .catch(exception => console.log("exception:", exception, ""));

  renderKeys() {
    const { keys } = this.props;
    return keys.map(k => <B>{k}:</B>);
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
