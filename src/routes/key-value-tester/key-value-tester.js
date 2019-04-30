import React, { PureComponent } from "react";
import { ScrollView, Text } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";

import { KeyValueService } from "api";
import { B, H1, Container, Padding } from "components";
import { LayoutWithHeader, LayoutWithFooter } from "layouts";
import {
  pairsSelector,
  fetchAllPairs,
  deleteAllPairs
} from "state-management/key-value-pairs";

const iconSize = 20;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {
  pairs: [{ key: string, value: string }]
};

type State = {};

const mapStateToProps = state => ({
  pairs: pairsSelector(state)
});

@connect(
  mapStateToProps,
  { fetchAllPairs, deleteAllPairs }
)
export default class extends PureComponent<Props, State> {
  componentDidMount() {
    this.props.fetchAllPairs();
  }

  deleteOneValue = () =>
    KeyValueService.deleteOneValue("bruno/abilities")
      .then(this.getAllKeys)
      .catch(exception => console.log("exception:", exception, ""));

  deleteAllValues = () => this.props.deleteAllPairs();

  renderKeys() {
    const { pairs } = this.props;
    return pairs.map(({ key, value }) => (
      <>
        <B>{key}:</B>
        {/*
          TODO:
          This is definitely a bug. Value SHOULD be a string, not an object
          by this point... i.e. a string should be returned by the server.
        */}
        <Text style={{ fontSize: 12 }}>{JSON.stringify(value, null, 2)}</Text>
      </>
    ));
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
          <ScrollView>
            <Container>
              <H1>List of all keys</H1>
              <Padding />
              {this.renderKeys()}
            </Container>
          </ScrollView>
        </LayoutWithFooter>
      </LayoutWithHeader>
    );
  }
}
