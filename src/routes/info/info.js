import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { LayoutWithHeader, LayoutWithFooter } from "layouts";
import { P, Container, FreeTextNotes, Grid, Row } from "components";

const iconSize = 24;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {};

export default class extends Component<Props> {
  render() {
    const actions = [
      { text: "Load", callback: this.load, icon: loadIcon },
      { text: "Save", callback: this.save, icon: saveIcon }
    ];
    return (
      <LayoutWithHeader>
        <LayoutWithFooter actions={actions}>
          <ScrollView>
            <Container>
              <P>Info</P>
            </Container>
          </ScrollView>
        </LayoutWithFooter>
      </LayoutWithHeader>
    );
  }
}
