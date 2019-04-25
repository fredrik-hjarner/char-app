import React from "react";
import { View } from "react-native";

import { P, InnerContainer, Grid, Row, TextInput, Padding } from "components";

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

export default React.memo((props: Props) => {
  console.log("props:", props, "");

  const {
    weapon: { attackBonus, damage, range, type, weapon },
    onChange
  } = props;
  return (
    <InnerContainer>
      <Grid>
        <Row width={11}>
          <View>
            <P>Weapon name:</P>
            <TextInput
              style={{ width: 1000 }}
              onChangeText={onChange("weapon")}
              value={weapon}
            />
          </View>
        </Row>
        <Row />
        <Row width={6}>
          <P>Type:</P>
          <TextInput onChangeText={onChange("type")} value={type} />
        </Row>
      </Grid>
      <Padding />
      <Grid>
        <Row width={4}>
          <View>
            <P>Range:</P>
            <TextInput onChangeText={onChange("range")} value={range} />
          </View>
        </Row>
        <Row />
        <Row width={6}>
          <View>
            <P>Attack bonus:</P>
            <TextInput
              onChangeText={onChange("attackBonus")}
              value={attackBonus}
            />
          </View>
        </Row>
        <Row />
        <Row width={6}>
          <View>
            <P>Damage:</P>
            <TextInput onChangeText={onChange("damage")} value={damage} />
          </View>
        </Row>
      </Grid>
    </InnerContainer>
  );
});
