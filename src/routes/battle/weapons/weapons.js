import React, { PureComponent } from "react";

import { B, Padding } from "components";
import Weapon from "./weapon";

type Props = { weapons: [Object], onChange: Function };

export default class extends PureComponent<Props> {
  handleWeapon0Change = (weapon: Object) =>
    this.props.onChange([weapon, this.props.weapons[1]]);

  handleWeapon1Change = (weapon: Object) =>
    this.props.onChange([this.props.weapons[0], weapon]);

  render() {
    const { weapons } = this.props;
    return (
      <>
        <B>Weapons</B>
        <Padding />
        <Weapon
          index={0}
          weapon={weapons[0]}
          onChange={this.handleWeapon0Change}
        />
        <Weapon
          index={1}
          weapon={weapons[1]}
          onChange={this.handleWeapon1Change}
        />
      </>
    );
  }
}
