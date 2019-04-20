import { StyleSheet } from "react-native";

export const firstColWidth = 120;
export const secondColWidth = 50;
export const thirdColWidth = 80;

export default StyleSheet.create({
  container: {
    /* justifyContent: "center",
    alignItems: "center" */
  },
  textInput: {
    width: secondColWidth
  },
  abilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5
  }
});
