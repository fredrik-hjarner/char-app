import React, { memo, useState, useEffect } from "react";

import WeaponDumb from "./weapon-dumb";

type Props = {
  weapon: {
    attackBonus: string,
    damage: string,
    range: string,
    type: string,
    weapon: string
  },
  onChange: Function
};

type State = {
  weapon: {
    attackBonus: string,
    damage: string,
    range: string,
    type: string,
    weapon: string
  }
};

export default memo((props: Props) => {
  const [weapon, setWeapon] = useState({ ...props.weapon });

  useEffect(() => {
    setWeapon({ ...props.weapon });
  }, [props]);

  const handleChange = (key: string) => (value: string) => {
    const newWeapon = { ...weapon, [key]: value };
    setWeapon(newWeapon);
    props.onChange(newWeapon);
  };

  return <WeaponDumb weapon={weapon} onChange={handleChange} />;
});
