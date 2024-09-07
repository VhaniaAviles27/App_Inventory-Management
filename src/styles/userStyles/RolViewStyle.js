import { StyleSheet } from "react-native";

export const rolStyle = StyleSheet.create({
  backgroundContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  containerPrincipal: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: "60%",
    height: "60%",
  },
  containerIcons: {
    padding: 10,
  },
  iconRolAdmin: {
    width: 150,
    height: 150,
  },
  iconRolUser: {
    width: 145,
    height: 100,
  },
  textRol: {
    textAlign: "center",
    padding: 10,
  },
  textSelectRol: {
    opacity: 0.5,
  },
});
