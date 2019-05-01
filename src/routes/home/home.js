import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { reduxForm, FormSection } from "redux-form";
import { mapProps } from "recompose";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

import { LayoutWithFooter, LayoutWithHeader } from "layouts";
import { Container, Padding } from "components";
import {
  fetchAbilities,
  saveAbilities,
  abilitiesSelector
} from "state-management/abilities";
import {
  fetchSkills,
  saveSkills,
  skillsSelector
} from "state-management/skills";
import { reduxFormBugFix } from "utils";
import Abilities from "./abilities";
import Skills from "./skills";

const formName = "skills";

const iconSize = 20;
const loadIcon = <FeatherIcon name="download" color="white" size={iconSize} />;
const saveIcon = <FontAwesome5Icon name="save" color="white" size={iconSize} />;

type Props = {
  abilities: {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  },
  fetchAbilities: Function,
  saveAbilities: Function,

  fetchSkills: Function,
  saveSkills: Function
};

const Stats = ({ handleSubmit, abilities, ...props }: Props) => {
  const load = () => {
    props.fetchAbilities();
    props.fetchSkills();
  };

  useEffect(() => load(), []);

  const actions = [
    { text: "Load", callback: load, icon: loadIcon },
    { text: "Save", callback: handleSubmit, icon: saveIcon }
  ];
  return (
    <LayoutWithHeader>
      <LayoutWithFooter actions={actions}>
        <ScrollView>
          <Container>
            <FormSection name="abilities" component={Abilities} />
            <Padding big />
            <FormSection
              name="skills"
              component={Skills}
              abilities={abilities}
            />
          </Container>
        </ScrollView>
      </LayoutWithFooter>
    </LayoutWithHeader>
  );
};

const onSubmit = (values, dispatch, props) => {
  props.saveAbilities(values.abilities);
  props.saveSkills(values.skills);
};

const mapStateToProps = state => ({
  abilities: abilitiesSelector(state),
  skills: skillsSelector(state)
});

export default Stats
  |> reduxForm({ form: formName, onSubmit })
  |> reduxFormBugFix
  |> mapProps(({ abilities, skills, ...props }) => ({
    abilities,
    initialValues: { abilities, skills },
    ...props
  }))
  |> connect(
    mapStateToProps,
    { fetchAbilities, fetchSkills, saveAbilities, saveSkills }
  );
