import { StyleSheet } from "react-native";

export const productCardStyle = StyleSheet.create({
  card: {
    alignContent: "center",
    borderRadius: 5,
    paddingTop: 5,
    paddingHorizontal: 5,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "#071356",
  },
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    borderRadius: 5,
    aspectRatio: 1,
    marginBottom: 5,
  },
  priceText: {
    flex: 1,
    paddingVertical: 0,
    color: "white",
    textAlign: "center",
  },
  titleText: {
    flex: 1,
    paddingVertical: 0,
    color: "white",
    fontWeight: "900",
  },
});
