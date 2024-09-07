import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
  containerScroll: {
    flex: 1,
  },
  containerBody: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(17, 72, 133, 0.7)",
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.85,
  },

  input: {
    width: "100%",
  },

  material: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginTop: 23,
  },

  buttonLogin: {
    backgroundColor: "#071356",
    padding: 10,
    width: 200,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonTextLoggin: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
    color: "white",
  },
});
