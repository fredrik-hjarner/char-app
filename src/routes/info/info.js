import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";
import { defaultProps } from "recompose";

import { LayoutWithHeader, LayoutWithFooter } from "layouts";
import {
  P,
  Container,
  Grid,
  Row,
  TextInput,
  Padding,
  InnerContainer,
  TextArea
} from "components";

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
    XP: string,
    ideals: string,
    bonds: string,
    flaws: string,
    background: string
  }
};

const mockProps = {
  info: {
    characterName: "Bruno",
    playerName: "Fredrik",
    classesAndLevels: "Fighter lvl 4",
    race: "Human",
    alignment: "Chaotic Neutral",
    XP: "3500",
    ideals: "some ideal",
    bonds: "some bond",
    flaws: "some flaw",
    background: "best background ever"
  }
};

export default defaultProps(mockProps)(
  class extends PureComponent<Props> {
    constructor(props: Props) {
      super(props);
      const { ...all } = props.info;
      this.state = {
        info: { ...all }
      };
    }

    componentDidUpdate(prevProps, prevState) {
      // if I changed state dont overwrite them with props.
      if (this.state === prevState) {
        this.copyPropsToState();
      }
    }

    copyPropsToState() {
      const {
        info: { ...all }
      } = this.props;
      this.setState({
        info: { ...all }
      });
    }

    handleChange = (key: string) => (value: string) => {
      this.setState(({ info }) => ({
        info: { ...info, [key]: value }
      }));
    };

    renderInfo() {
      const {
        characterName,
        playerName,
        classesAndLevels,
        race,
        alignment,
        XP
      } = this.state.info;

      return (
        <InnerContainer>
          <Grid>
            <Row width={11}>
              <P>Character name:</P>
              <TextInput
                style={{ width: 1000 }}
                onChangeText={this.handleChange("characterName")}
                value={characterName}
              />
            </Row>
            <Row />
            <Row width={6}>
              <P>Player name:</P>
              <TextInput
                onChangeText={this.handleChange("playerName")}
                value={playerName}
              />
            </Row>
          </Grid>
          <Padding />
          <Grid>
            <Row width={11}>
              <P>Classes {"&"} levels:</P>
              <TextInput
                style={{ width: 1000 }}
                onChangeText={this.handleChange("classesAndLevels")}
                value={classesAndLevels}
              />
            </Row>
            <Row />
            <Row width={6}>
              <P>Race:</P>
              <TextInput
                onChangeText={this.handleChange("race")}
                value={race}
              />
            </Row>
          </Grid>
          <Padding />
          <Grid>
            <Row width={11}>
              <P>Alignment:</P>
              <TextInput
                style={{ width: 1000 }}
                onChangeText={this.handleChange("alignment")}
                value={alignment}
              />
            </Row>
            <Row />
            <Row width={6}>
              <P>XP:</P>
              <TextInput onChangeText={this.handleChange("XP")} value={XP} />
            </Row>
          </Grid>
        </InnerContainer>
      );
    }

    renderRoleplay() {
      const { ideals, bonds, flaws, background } = this.state.info;
      return (
        <InnerContainer>
          <P>Ideals:</P>
          <TextArea
            numberOfLines={1}
            onChangeText={this.handleChange("ideals")}
            value={ideals}
          />
          <Padding />

          <P>Bonds:</P>
          <TextArea
            numberOfLines={1}
            onChangeText={this.handleChange("bonds")}
            value={bonds}
          />
          <Padding />

          <P>Flaws:</P>
          <TextArea
            numberOfLines={1}
            onChangeText={this.handleChange("flaws")}
            value={flaws}
          />
          <Padding />

          <P>Background story:</P>
          <TextArea
            onChangeText={this.handleChange("background")}
            value={background}
          />
          <Padding />
        </InnerContainer>
      );
    }

    render() {
      const actions = [
        { text: "Load", callback: this.load, icon: loadIcon },
        { text: "Save", callback: this.save, icon: saveIcon }
      ];
      return (
        <LayoutWithHeader>
          <LayoutWithFooter actions={actions}>
            <ScrollView>
              <Container>
                {this.renderInfo()}
                {this.renderRoleplay()}
              </Container>
            </ScrollView>
          </LayoutWithFooter>
        </LayoutWithHeader>
      );
    }
  }
);
