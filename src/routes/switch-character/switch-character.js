import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { List } from "react-native-paper";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

import { H1, Padding, TouchableOpacity, Container } from "components";
import { LayoutWithFooter } from "layouts";
import {
  fetchCharacterIndex,
  characterIndexSelector,
  setActiveCharacter,
  activeCharacterSelector
} from "state-management/character";
import { goBack, pushRoute } from "state-management/navigation";

const iconSize = 20;
const cancelIcon = (
  <SimpleLineIconsIcon name="action-undo" color="white" size={iconSize} />
);

type Props = {
  goBack: Function,
  pushRoute: Function,
  fetchCharacterIndex: Function,
  setActiveCharacter: Function,
  characterIndex: [string],
  activeCharacter: string | null
};

const mapStateToProps = state => ({
  characterIndex: characterIndexSelector(state),
  activeCharacter: activeCharacterSelector(state)
});

export default connect(
  mapStateToProps,
  { goBack, pushRoute, fetchCharacterIndex, setActiveCharacter }
)(
  class extends PureComponent<Props> {
    componentDidMount() {
      this.props.fetchCharacterIndex();
    }

    cancel = () => this.props.goBack();

    switchCharacter = (character: string) => {
      this.props.setActiveCharacter(character);
      this.props.pushRoute("Stats");
    };

    render() {
      const { characterIndex, activeCharacter } = this.props;
      const actions = activeCharacter
        ? [{ text: "Cancel", callback: this.cancel, icon: cancelIcon }]
        : undefined;
      return (
        <LayoutWithFooter actions={actions}>
          <Container>
            <H1>Choose character</H1>
            <Padding big />
            {characterIndex.map(char => (
              <TouchableOpacity onPress={() => this.switchCharacter(char)}>
                <List.Item
                  title={char}
                  description="Item description"
                  left={({ style, ...props }) => (
                    <List.Icon
                      style={[
                        style,
                        { backgroundColor: "lightgrey", borderRadius: 50 }
                      ]}
                      {...props}
                      icon="person"
                    />
                  )}
                />
              </TouchableOpacity>
            ))}
          </Container>
        </LayoutWithFooter>
      );
    }
  }
);
