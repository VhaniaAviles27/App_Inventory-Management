import { StyleSheet } from "react-native";

export const menuStyle = StyleSheet.create({
  backgroundContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  columnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  column: {
    flex: 1,
  },

  containerOption: {
    padding: 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
  },

  iconOptionMenu: {
    width: 120,
    height: 120,
  },

  textRol: {
    textAlign: "center",
  },

  textSelectRol: {
    opacity: 0.5,
  },
});
