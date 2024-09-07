import { StyleSheet } from "react-native";

export const clientReturnedStyle = StyleSheet.create({
  returnButton: {
    width: 350,
    backgroundColor: "#071356",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  returnButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  registroPrestamo: {
    flexDirection: "row",
  },
  infoContainer: {
    flex: 1,
  },
  infoText: {
    fontWeight: "semibold",
    fontSize: 15,
    color: "#333",
  },
  noLoansText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
});
