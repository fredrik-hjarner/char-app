import React from "react";
import { ScrollView, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";

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
import { EQSelector, fetchEQ } from "state-management/eq";

const iconSize = 20;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {
  eq: {
    gold: string,
    silver: string,
    copper: string,
    eq: string
  },
  fetchEQ: Function
};

const Coin = ({ type, amount }) => (
  <View>
    <Text>{type}</Text>
    <TextInput value={amount} />
  </View>
);

const mapStateToProps = state => ({
  eq: EQSelector(state)
});

export default connect(
  mapStateToProps,
  { fetchEQ } // TODO: use effect to fetch
)((props: Props) => {
  const {
    eq: { gold, silver, copper, eq }
  } = props;
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
                <Coin type="gold" amount={gold} />
              </Column>
              <Column />
              <Column width={5}>
                <Coin type="silver" amount={silver} />
              </Column>
              <Column />
              <Column width={6}>
                <Coin type="copper" amount={copper} />
              </Column>
            </Grid>
            <Padding big />
            <Text>Equipment</Text>
            <TextArea numberOfLines={10} value={eq} />
          </Container>
        </ScrollView>
      </LayoutWithFooter>
    </LayoutWithHeader>
  );
});
