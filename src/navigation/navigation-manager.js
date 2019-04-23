import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import {
  Home,
  KeyValueTester,
  CreateNewCharacter,
  SwitchCharacter,
  Battle
} from "routes";
import { Toastr } from "components";
import { currentRouteSelector } from "state-management/navigation";

type Props = {
  currentRoute: string
};

const mapStateToProps = state => ({
  currentRoute: currentRouteSelector(state)
});

export default connect(mapStateToProps)(
  class extends PureComponent<Props> {
    renderRoute() {
      const { currentRoute } = this.props;
      switch (currentRoute) {
        case "Home":
          return <Home />;

        case "KeyValueTester":
          return <KeyValueTester />;

        case "CreateNewCharacter":
          return <CreateNewCharacter />;

        case "SwitchCharacter":
          return <SwitchCharacter />;

        case "Battle":
          return <Battle />;

        default:
          return <Home />;
      }
    }

    render() {
      return (
        <View>
          {this.renderRoute()}
          <Toastr />
        </View>
      );
    }
  }
);
