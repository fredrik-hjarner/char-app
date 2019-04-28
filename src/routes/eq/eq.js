import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { mapProps } from "recompose";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { LayoutWithFooter, LayoutWithHeader } from "layouts";
import { Container, Padding, Text, Grid, Column } from "components";
import { TextInput, TextArea } from "components/form";
import { EQSelector, fetchEQ, saveEQ } from "state-management/eq";
import { reduxFormBugFix } from "utils";

const formName = "equipment";

const iconSize = 20;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

const Coin = ({ type }) => (
  <View>
    <Text>{type}</Text>
    <Field name={type} component={TextInput} />
  </View>
);

type Props = {
  eq: {
    gold: string,
    silver: string,
    copper: string,
    eq: string
  },
  fetchEQ: Function,
  saveEQ: Function
};

const mapStateToProps = state => ({
  eq: EQSelector(state)
});

const EQ = (props: Props) => {
  const load = () => props.fetchEQ();

  useEffect(() => {
    load();
  }, []);

  const actions = [
    { text: "Load", callback: load, icon: loadIcon },
    { text: "Save", callback: props.handleSubmit, icon: saveIcon }
  ];
  return (
    <LayoutWithHeader>
      <LayoutWithFooter actions={actions}>
        <ScrollView>
          <Container>
            <Grid>
              <Column width={5}>
                <Coin type="gold" />
              </Column>
              <Column />
              <Column width={5}>
                <Coin type="silver" />
              </Column>
              <Column />
              <Column width={6}>
                <Coin type="copper" />
              </Column>
            </Grid>
            <Padding big />
            <Text>Equipment</Text>
            <Field name="eq" component={TextArea} numberOfLines={10} />
          </Container>
        </ScrollView>
      </LayoutWithFooter>
    </LayoutWithHeader>
  );
};

const onSubmit = (values, dispatch, props) => props.saveEQ(values);

const log = message => Component => props => {
  /* console.log(message);
  console.log("props:", props);
  console.log("\n\n"); */
  return <Component {...props} />;
};

export default EQ
  |> reduxForm({ form: formName, onSubmit })
  |> reduxFormBugFix
  |> mapProps(({ eq, ...props }) => ({
    ...props,
    initialValues: eq
  }))
  |> connect(
    mapStateToProps,
    { fetchEQ, saveEQ }
  );
