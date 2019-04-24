import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import {
  Home,
  KeyValueTester,
  CreateNewCharacter,
  CreateFirstCharacter,
  SwitchCharacter,
  Battle,
  Info
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

        case "CreateFirstCharacter":
          return <CreateFirstCharacter />;

        case "SwitchCharacter":
          return <SwitchCharacter />;

        case "Info":
          return <Info />;

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
