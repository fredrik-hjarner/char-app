import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import { reduxForm, Field } from "redux-form";
import { mapProps } from "recompose";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { LayoutWithHeader, LayoutWithFooter } from "layouts";
import {
  P,
  Container,
  Grid,
  Column,
  Padding,
  InnerContainer
} from "components";
import { TextInput, TextArea } from "components/form";
import { infoSelector, fetchInfo, saveInfo } from "state-management/info";
import { reduxFormBugFix } from "utils";

const formName = "info";

const iconSize = 20;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {
  info: {
    characterName: string,
    playerName: string,
    classesAndLevels: string,
    race: string,
    alignment: string,
    xp: string,
    ideals: string,
    bonds: string,
    flaws: string,
    background: string
  },
  fetchInfo: Function,
  saveInfo: Function
};

const mapStateToProps = state => ({
  info: infoSelector(state)
});

const Info = (props: Props) => {
  const load = () => props.fetchInfo();

  useEffect(() => {
    load();
  }, []);

  function renderInfo() {
    return (
      <InnerContainer>
        <Grid>
          <Column width={11}>
            <P>Character name:</P>
            <Field
              name="characterName"
              component={TextInput}
              style={{ width: 1000 }}
            />
          </Column>
          <Column />
          <Column width={6}>
            <P>Player name:</P>
            <Field name="playerName" component={TextInput} />
          </Column>
        </Grid>
        <Padding />
        <Grid>
          <Column width={11}>
            <P>Classes {"&"} levels:</P>
            <Field
              name="classesAndLevels"
              component={TextInput}
              style={{ width: 1000 }}
            />
          </Column>
          <Column />
          <Column width={6}>
            <P>Race:</P>
            <Field name="race" component={TextInput} />
          </Column>
        </Grid>
        <Padding />
        <Grid>
          <Column width={11}>
            <P>Alignment:</P>
            <Field
              name="alignment"
              component={TextInput}
              style={{ width: 1000 }}
            />
          </Column>
          <Column />
          <Column width={6}>
            <P>XP:</P>
            <Field name="xp" component={TextInput} />
          </Column>
        </Grid>
      </InnerContainer>
    );
  }

  function renderRoleplay() {
    return (
      <InnerContainer>
        <P>Ideals:</P>
        <Field name="ideals" component={TextArea} numberOfLines={1} />
        <Padding />

        <P>Bonds:</P>
        <Field name="bonds" component={TextArea} numberOfLines={1} />
        <Padding />

        <P>Flaws:</P>
        <Field name="flaws" component={TextArea} numberOfLines={1} />
        <Padding />

        <P>Background story:</P>
        <Field name="background" component={TextArea} />
        <Padding />
      </InnerContainer>
    );
  }

  const actions = [
    { text: "Load", callback: load, icon: loadIcon },
    { text: "Save", callback: props.handleSubmit, icon: saveIcon }
  ];
  return (
    <LayoutWithHeader>
      <LayoutWithFooter actions={actions}>
        <ScrollView>
          <Container>
            {renderInfo()}
            {renderRoleplay()}
          </Container>
        </ScrollView>
      </LayoutWithFooter>
    </LayoutWithHeader>
  );
};

const onSubmit = (values, dispatch, props) => props.saveInfo(values);

export default Info
  |> reduxForm({ form: formName, onSubmit })
  |> reduxFormBugFix
  |> mapProps(({ info, ...props }) => ({
    ...props,
    initialValues: info
  }))
  |> connect(
    mapStateToProps,
    { fetchInfo, saveInfo }
  );
