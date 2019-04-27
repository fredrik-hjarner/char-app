import React, { memo } from "react";
import { ScrollView, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { LayoutWithFooter, LayoutWithHeader } from "layouts";
import {
  Container,
  Padding,
  Text,
  Grid,
  Column,
  TextInput,
  TextArea
} from "components";

const iconSize = 20;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {};

const Coin = ({ type, amount }) => (
  <View>
    <Text>{type}</Text>
    <TextInput value={amount} />
  </View>
);

export default memo((props: Props) => {
  const actions = [
    { text: "Load", callback: this.load, icon: loadIcon },
    { text: "Save", callback: this.save, icon: saveIcon }
  ];
  return (
    <LayoutWithHeader>
      <LayoutWithFooter actions={actions}>
        <ScrollView>
          <Container>
            <Grid>
              <Column width={5}>
                <Coin type="gold" amount={"1234"} />
              </Column>
              <Column />
              <Column width={5}>
                <Coin type="silver" amount={"1234"} />
              </Column>
              <Column />
              <Column width={6}>
                <Coin type="copper" amount={"1234"} />
              </Column>
            </Grid>
            <Padding big />
            <Text>Equipment</Text>
            <TextArea numberOfLines={10} />
          </Container>
        </ScrollView>
      </LayoutWithFooter>
    </LayoutWithHeader>
  );
});
