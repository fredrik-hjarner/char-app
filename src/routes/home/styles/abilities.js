import { StyleSheet } from "react-native";

export const firstColWidth = 120;
export const secondColWidth = 50;
export const thirdColWidth = 80;

export default StyleSheet.create({
  container: {
    /* justifyContent: "center",
    alignItems: "center" */
  },
  inputFieldContainer: {
    width: secondColWidth,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "red"
  },
  abilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5
  }
});
