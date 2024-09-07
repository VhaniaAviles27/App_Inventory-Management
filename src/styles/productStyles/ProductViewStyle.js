import { StyleSheet } from "react-native";

export const productStyle = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },

  stock: {
    flexDirection: "row",
  },

  description: {
    marginVertical: 10,
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 30,
  },
  button: {
    backgroundColor: "#071356",
    width: "80%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
});
