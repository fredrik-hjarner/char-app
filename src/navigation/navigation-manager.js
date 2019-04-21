import React, { PureComponent } from "react";
import { connect } from "react-redux";

import {
  Home,
  KeyValueTester,
  CreateNewCharacter,
  SwitchCharacter
} from "routes";
import { currentRouteSelector } from "state-management/navigation";

type Props = {
  currentRoute: string
};

const mapStateToProps = state => ({
  currentRoute: currentRouteSelector(state)
});

export default connect(mapStateToProps)(
  class extends PureComponent<Props> {
    render() {
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

        default:
          return <Home />;
      }
    }
  }
);
